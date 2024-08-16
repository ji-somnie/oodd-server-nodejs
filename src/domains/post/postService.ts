import myDataBase from '../../data-source';
import {Post} from '../../entities/postEntity';
import {PostRequestDto} from './dtos/postRequest.dto';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR, NOT_FOUND_USER, NOT_FOUND_STYLETAGS} from '../../variables/httpCode';
import {User} from '../../entities/userEntity';
import {validatedUser} from '../../validationTest/validateUser';
import {validatePost} from '../../validationTest/validatePost';
import {Image} from '../../entities/imageEntity';
import {PostStyletag} from '../../entities/postStyletagEntity';
import {Clothing} from '../../entities/clothingEntity';
import {Styletag} from '../../entities/styletagEntity';
import {PostClothing} from '../../entities/postClothingEntity';

import {
  BasePostListResponseDto,
  PostDetailResponseDto,
  PostListResponseDto,
  PostResponseDto,
} from './dtos/postResponse.dto';
import {Like} from '../../entities/likeEntity';
import {Comment} from '../../entities/commentEntity';
import dayjs from 'dayjs';

export class PostService {
  // 생성자 사용 안 하고 DB에서 바로 가져옴
  private postRepository = myDataBase.getRepository(Post);
  private userRepository = myDataBase.getRepository(User);
  private imageRepository = myDataBase.getRepository(Image);
  private postStyletagRepository = myDataBase.getRepository(PostStyletag);
  private clothingRepository = myDataBase.getRepository(Clothing);
  private styletagRepository = myDataBase.getRepository(Styletag);
  private postClothingRepository = myDataBase.getRepository(PostClothing);
  private likeRepository = myDataBase.getRepository(Like);
  private commentRepository = myDataBase.getRepository(Comment);

  // 게시물 업로드
  async createPost(userId: number, postRequestDto: PostRequestDto): Promise<BaseResponse<PostResponseDto | null>> {
    const queryRunner = this.postRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const user = await validatedUser(userId); // 나중에 빼자
      if (!user) {
        return {
          isSuccess: false,
          code: NOT_FOUND_USER.code,
          message: HTTP_NOT_FOUND.message,
          result: null,
        };
      }

      const now = dayjs().toDate();

      const newPost = new Post();
      newPost.user = user;
      newPost.content = postRequestDto.content ?? '';
      newPost.isRepresentative = postRequestDto.isRepresentative ?? false; // 대표 OOTD 지정
      newPost.status = 'activated';
      newPost.createdAt = now;
      newPost.updatedAt = now;

      const savedPost = await queryRunner.manager.save(newPost);

      // image 저장
      const photoUrls = postRequestDto.photoUrls ?? [];

      // 사진 순서대로 저장 (최대 10개)
      const savedImages = [];
      for (let i = 0; i < photoUrls.length && i < 10; i++) {
        const newImage = new Image();
        newImage.url = photoUrls[i] ?? '';
        newImage.order = i + 1; // 1부터 최대 10개까지 사진 저장
        newImage.postId = savedPost.id;
        newImage.createdAt = now;
        newImage.updatedAt = now;

        const savedImage = await queryRunner.manager.save(newImage);
        savedImages.push(savedImage);
      }

      // 스타일 태그 목록
      const allowedStyletags = [
        "#street", "#casual", "#sporty", "#feminine", "#hip",
        "#classic", "#minimal", "#formal", "#luxury", "#outdoor"
      ];

      // 스타일 태그 저장
      const savedStyletags: string[] = [];
      const hashtags = postRequestDto.styletags ?? []; 

      for (const tag of hashtags) {
        if (!allowedStyletags.includes(tag)) {
          await queryRunner.rollbackTransaction();
          return new BaseResponse(false, NOT_FOUND_STYLETAGS.code, NOT_FOUND_STYLETAGS.message, null);
        }
        const styletag = await queryRunner.manager.findOne(Styletag, { where: { tag } });
        if (styletag) {
          const postStyletag = new PostStyletag();
          postStyletag.post = savedPost;
          postStyletag.styletag = styletag;
          postStyletag.status = 'activated';
          postStyletag.createdAt = now;
          postStyletag.updatedAt = now;
          await queryRunner.manager.save(postStyletag);
          savedStyletags.push(tag);
        }
      }

      // 옷 저장
      const clothingInfo = postRequestDto.clothingInfo ?? []; 
      const savedClothingInfo = [];
      console.log('clothingInfo is ', clothingInfo);

      if (clothingInfo.length > 0) {
        for (const clothingItem of clothingInfo) {
          let clothing = await queryRunner.manager.findOne(Clothing, {
            where: {
              imageUrl: clothingItem.imageUrl ?? '',
              brandName: clothingItem.brand ?? '',
              modelName: clothingItem.model ?? '',
              modelNumber: clothingItem.modelNumber ?? '',
              url: clothingItem.url ?? '',
            },
          });

          if (!clothing) {
            clothing = new Clothing();
            clothing.imageUrl = clothingItem.imageUrl ?? '',
            clothing.brandName = clothingItem.brand ?? '';
            clothing.modelName = clothingItem.model ?? '';
            clothing.modelNumber = clothingItem.modelNumber ?? '';
            clothing.url = clothingItem.url ?? '';
            clothing.status = 'activated';
            clothing.createdAt = now;
            clothing.updatedAt = now;
            clothing = await queryRunner.manager.save(clothing);
            // console.log('Saved clothing:', clothing); 
          }

          // postClothing 저장
          const postClothing = new PostClothing();
          postClothing.post = savedPost;
          postClothing.clothing = clothing;
          postClothing.status = 'activated';
          postClothing.createdAt = now;
          postClothing.updatedAt = now;
          await queryRunner.manager.save(postClothing);
          // console.log('Saved postClothing:', postClothing);

          savedClothingInfo.push({
            imageUrl: clothing.imageUrl,
            brand: clothing.brandName,
            model: clothing.modelName,
            modelNumber: clothing.modelNumber,
            url: clothing.url,
          });
        }
      }
      await queryRunner.commitTransaction();

      const postResponseDto: PostResponseDto = {
        postId: savedPost.id,
        userId: user.id,
        photoUrls: savedImages.map(image => image.url),
        content: savedPost.content,
        styletags: savedStyletags,
        clothingInfo: savedClothingInfo,
      };

      return {
        isSuccess: true,
        code: HTTP_OK.code,
        message: HTTP_OK.message,
        result: postResponseDto, // result에 실 데이터가 담김
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
       if (error instanceof Error) {
        console.error('Transaction rolled back due to an error:', error.message);
        console.error('Error stack:', error.stack);
      } else {
        console.error('Transaction rolled back due to an unknown error:', JSON.stringify(error));
      }
  
      return {
        isSuccess: false,
        code: HTTP_INTERNAL_SERVER_ERROR.code,
        message: HTTP_INTERNAL_SERVER_ERROR.message,
        result: null,
      };
    } finally {
      await queryRunner.release();
    }
  }

  // 게시물 삭제
  async deletePost(userId: number, postId: number): Promise<BaseResponse<null>> {
    const queryRunner = this.postRepository.manager.connection.createQueryRunner();
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      const user = await validatedUser(userId); // 토큰 제대로 확인되면 나중에 빼자
      if (!user) {
        return {
          isSuccess: false,
          code: HTTP_NOT_FOUND.code,
          message: HTTP_NOT_FOUND.message,
          result: null,
        };
      }
  
      const post = await validatePost(userId, postId);
      if (!post) {
        return {
          isSuccess: false,
          code: HTTP_NOT_FOUND.code,
          message: HTTP_NOT_FOUND.message,
          result: null,
        };
      }
  
      await queryRunner.manager.delete(PostStyletag, { post: { id: postId } });
      await queryRunner.manager.delete(PostClothing, { post: { id: postId } });
      await queryRunner.manager.delete(Image, { post: { id: postId } });
  
      await queryRunner.manager.remove(post);

      await queryRunner.commitTransaction();
  
      return {
        isSuccess: true,
        code: HTTP_OK.code,
        message: 'Post deleted successfully',
        result: null,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      return {
        isSuccess: false,
        code: HTTP_INTERNAL_SERVER_ERROR.code,
        message: HTTP_INTERNAL_SERVER_ERROR.message,
        result: null,
      };
    } finally {
      await queryRunner.release();
    }
  }
  
// 게시물 수정
async updatePost(
  userId: number,
  postId: number,
  postRequestDto: PostRequestDto,
): Promise<BaseResponse<PostResponseDto | null>> {
  try {
    const user = await validatedUser(userId);
    if (!user) {
      return {
        isSuccess: false,
        code: HTTP_NOT_FOUND.code,
        message: HTTP_NOT_FOUND.message,
        result: null,
      };
    }

    const post = await validatePost(userId, postId);
    if (!post) {
      return {
        isSuccess: false,
        code: HTTP_NOT_FOUND.code,
        message: HTTP_NOT_FOUND.message,
        result: null,
      };
    }
    const now = dayjs().toDate();

    post.content = postRequestDto.content ?? '';

    const updatedPost = await this.postRepository.save(post);


    // 대표 ootd 설정 
    const isRepresentative = postRequestDto.isRepresentative ?? false;
    if (post.isRepresentative !== isRepresentative) {
      post.isRepresentative = isRepresentative;

      if (post.isRepresentative) {
        await this.updatePostIsRepresentative(post);
      } else {
        await this.postRepository.save(post);
      }
    }

    // 이미지 업데이트 (완전 대체 방식)
    const existingImages = await this.imageRepository
      .createQueryBuilder('image')
      .where('image.postId = :postId', {postId})
      .getMany();

    const existingImageUrls = existingImages.map(image => image.url);
    const newImageUrls = postRequestDto.photoUrls || [];

    // 삭제해야 할 이미지
    const imagesToDelete = existingImages.filter(image => !newImageUrls.includes(image.url));
    for (const image of imagesToDelete) {
      await this.imageRepository.remove(image);
    }

    // 새로 추가해야 할 이미지
    const urlsToAdd = newImageUrls.filter(url => !existingImageUrls.includes(url));
    for (const url of urlsToAdd) {
      const newImage = this.imageRepository.create({url, post: updatedPost});
      await this.imageRepository.save(newImage);
    }

    // order 값 업데이트
    const orderedImages = await this.imageRepository
      .createQueryBuilder('image')
      .where('image.postId = :postId', {postId})
      .orderBy('image.id', 'ASC')
      .getMany();

    for (let i = 0; i < orderedImages.length; i++) {
      orderedImages[i].order = i + 1;
      await this.imageRepository.save(orderedImages[i]);
    }

    // 스타일 태그 업데이트 (완전 대체 방식)
    const allowedStyletags = [
      "#street", "#casual", "#sporty", "#feminine", "#hip",
      "#classic", "#minimal", "#formal", "#luxury", "#outdoor"
    ];

  // 스타일 태그 업데이트 (완전 대체 방식)
  await this.postStyletagRepository.createQueryBuilder().delete().where('postId = :postId', { postId: updatedPost.id }).execute();

  const updatedStyletags: string[] = [];
  for (const tag of postRequestDto.styletags || []) {
    if (!allowedStyletags.includes(tag)) {
      return {
        isSuccess: false,
        code: NOT_FOUND_STYLETAGS.code,
        message: NOT_FOUND_STYLETAGS.message,
        result: null,
      };
    }

    const styletag = await this.styletagRepository.findOne({ where: { tag } });
    if (styletag) {
      const postStyletag = this.postStyletagRepository.create({ post: updatedPost, styletag });
      postStyletag.status = 'activated';
      postStyletag.updatedAt = now;
      await this.postStyletagRepository.save(postStyletag);
      updatedStyletags.push(tag);
    }
  }

    // 옷 정보 업데이트 (완전 대체 방식)
    await this.postClothingRepository
      .createQueryBuilder()
      .delete()
      .where('postId = :postId', {postId: updatedPost.id})
      .execute();

    const updatedClothingInfos = [];

    for (const clothingItem of postRequestDto.clothingInfo || []) {
      let clothing = await this.clothingRepository
        .createQueryBuilder('clothing')
        .where('clothing.imageUrl = :imageUrl', {imageUrl: clothingItem.imageUrl})
        .andWhere('clothing.brandName = :brandName', {brandName: clothingItem.brand})
        .andWhere('clothing.modelName = :modelName', {modelName: clothingItem.model})
        .andWhere('clothing.modelNumber = :modelNumber', {modelNumber: clothingItem.modelNumber})
        .andWhere('clothing.url = :url', {url: clothingItem.url})
        .getOne();

      if (!clothing) {
        clothing = this.clothingRepository.create() as Clothing;
        clothing.imageUrl = clothingItem.imageUrl ?? '';
        clothing.brandName = clothingItem.brand ?? '';
        clothing.modelName = clothingItem.model ?? '';
        clothing.modelNumber = clothingItem.modelNumber ?? '';
        clothing.url = clothingItem.url ?? '';
        clothing.status = 'activated';
        clothing.createdAt = now;
        clothing.updatedAt = now;
        clothing = await this.clothingRepository.save(clothing);
      }

      const postClothing = this.postClothingRepository.create({
        post: updatedPost,
        clothing: clothing,
      });
      postClothing.status = 'activated';
      postClothing.updatedAt = now;
      await this.postClothingRepository.save(postClothing);
      updatedClothingInfos.push(clothing);
    }

    const postResponseDto: PostResponseDto = {
      postId: updatedPost.id,
      userId: user.id,
      photoUrls: newImageUrls,
      content: updatedPost.content,
      styletags: updatedStyletags,
      clothingInfo: updatedClothingInfos.map(clothing => ({
        imageUrl: clothing.imageUrl,
        brand: clothing.brandName,
        model: clothing.modelName,
        modelNumber: clothing.modelNumber,
        url: clothing.url,
      })),
      isRepresentative: updatedPost.isRepresentative,
    };

    return {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: postResponseDto,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      code: HTTP_INTERNAL_SERVER_ERROR.code,
      message: HTTP_INTERNAL_SERVER_ERROR.message,
      result: null,
    };
  }
}


  async getPostById(postId: number): Promise<Post | null> {
    return this.postRepository.findOne({
      where: {id: postId, status: 'activated'},
      relations: ['user', 'images', 'postStyletags', 'postClothings'],
    });
  }

  async updatePostIsRepresentative(post: Post): Promise<void> {
    post.isRepresentative = true;
    await this.postRepository.save(post);
  }
}