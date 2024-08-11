import myDataBase from '../../data-source';
import { Post } from '../../entities/postEntity';
import { PostRequestDto } from './dtos/postRequest.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { BaseResponse } from '../../base/baseResponse';
import { HTTP_OK, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR } from '../../variables/httpCode';
import { User } from '../../entities/userEntity';
import { validatedUser } from '../../validationTest/validateUser';
import { validatePost } from '../../validationTest/validatePost';
import { Image } from '../../entities/imageEntity';
import { PostStyletag } from '../../entities/postStyletagEntity';
import { Clothing } from '../../entities/clothingEntity';
import { Styletag } from '../../entities/styletagEntity';
import { PostClothing } from '../../entities/postClothingEntity';

export class PostService {
  // 생성자 사용 안 하고 DB에서 바로 가져옴
  private postRepository = myDataBase.getRepository(Post);
  private userRepository = myDataBase.getRepository(User);
  private imageRepository = myDataBase.getRepository(Image);
  private postStyletagRepository = myDataBase.getRepository(PostStyletag);
  private clothingRepository = myDataBase.getRepository(Clothing);
  private styletagRepository = myDataBase.getRepository(Styletag);
  private postClothingRepository = myDataBase.getRepository(PostClothing);

  // 게시물 업로드
  async createPost(userId: number, postRequestDto: PostRequestDto): Promise<BaseResponse<PostResponseDto | null>> {

    try {
      const user = await validatedUser(userId);
      if (!user) {
        // await queryRunner.rollbackTransaction();
        return {
          isSuccess: false,
          code: HTTP_NOT_FOUND.code,
          message: HTTP_NOT_FOUND.message,
          result: null,
        };
      }

      const newPost = new Post();
      newPost.user = user;
      newPost.content = postRequestDto.caption;
      newPost.isRepresentative = false;
      // newPost.status = 'activated';

      const savedPost = await this.postRepository.save(newPost);
      
      // 이미지 저장
      const newImage = new Image();
      newImage.url = postRequestDto.photoUrl;
      newImage.order = 1; // 일단 첫번째로 설정함
      newImage.post = savedPost;
      await this.imageRepository.save(newImage);

      // 스타일 태그 저장
      const savedStyletags: string[] = [];
      for (const tag of postRequestDto.hashtags) {        
        let styletag = await this.styletagRepository.findOne({ where: { tag } });
        if (!styletag) { // db에 해당 스타일 태그 없을 때만 새로 생성
          styletag = new Styletag();
          styletag.tag = tag;
          styletag = await this.styletagRepository.save(styletag);
        }
        const postStyletag = new PostStyletag();
        postStyletag.post = savedPost;
        postStyletag.styletag = styletag;
        await this.postStyletagRepository.save(postStyletag);
        savedStyletags.push(tag);
      }

      // 옷 정보 저장    
      let clothing = await this.clothingRepository.findOne({
        where: {
          brandName: postRequestDto.clothingInfo.brand,
          modelName: postRequestDto.clothingInfo.model,
          modelNumber: postRequestDto.clothingInfo.modelNumber,
          url: postRequestDto.clothingInfo.url,
        }
      });

      if (!clothing) { // 옷 정보를 못 찾았으면 DB에 새롭게 저장
        clothing = new Clothing();
        clothing.brandName = postRequestDto.clothingInfo.brand;
        clothing.modelName = postRequestDto.clothingInfo.model;
        clothing.modelNumber = postRequestDto.clothingInfo.modelNumber;
        clothing.url = postRequestDto.clothingInfo.url;
        await this.clothingRepository.save(clothing);
      }

      // 게시물과 옷 정보도 저장
      const postClothing = new PostClothing();
      postClothing.post = savedPost;
      postClothing.clothing = clothing;
      await this.postClothingRepository.save(postClothing);

      const postResponseDto: PostResponseDto = {
        postId: savedPost.id,
        userId: user.id,
        photoUrl: newImage.url,
        content: savedPost.content,
        hashtags: savedStyletags,
        clothingInfo: {
          brand: clothing.brandName,
          model: clothing.modelName,
          modelNumber: clothing.modelNumber,
          url: clothing.url,
        },
        likes: savedPost.likes?.length || 0,
        comments: savedPost.comments || [],
      };

      return {
        isSuccess: true,
        code: HTTP_OK.code,
        message: HTTP_OK.message,
        result: postResponseDto, // result에 실 데이터가 담김
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

  // 게시물 삭제
  async deletePost(userId: number, postId: number): Promise<BaseResponse<null>> {
    const queryRunner = myDataBase.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {
      const user = await validatedUser(userId);
      if (!user) {
        await queryRunner.rollbackTransaction();
        return {
          isSuccess: false,
          code: HTTP_NOT_FOUND.code,
          message: HTTP_NOT_FOUND.message,
          result: null,
        };
      }

      const post = await validatePost(userId, postId);
      if (!post) {
        await queryRunner.rollbackTransaction();
        return {
          isSuccess: false,
          code: HTTP_NOT_FOUND.code,
          message: HTTP_NOT_FOUND.message,
          result: null,
        };
      }
      // cascade 작동이 안 돼서 직접 연관된 엔티티 삭제
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

  async updatePost(userId: number, postId: number, postRequestDto: PostRequestDto): Promise<BaseResponse<PostResponseDto | null>> {
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

      post.content = postRequestDto.caption;
      const updatedPost = await this.postRepository.save(post);

      // 이미지 업데이트
      let image = await this.imageRepository.findOne({ where: { post: updatedPost, order: 1 } }); // order 나중에 수정하기
      if (!image) {
        image = new Image();
        image.order = 1;
        image.post = updatedPost;
      }
      image.url = postRequestDto.photoUrl;
      await this.imageRepository.save(image);

      // 스타일 태그 업데이트
      await this.postStyletagRepository.delete({ post: updatedPost });
      const updatedStyletags: string[] = [];
      for (const tag of postRequestDto.hashtags) {
        let styletag = await this.styletagRepository.findOne({ where: { tag } });
        if (!styletag) {
          styletag = new Styletag();
          styletag.tag = tag;
          styletag = await this.styletagRepository.save(styletag);
        }
        const postStyletag = new PostStyletag();
        postStyletag.post = updatedPost;
        postStyletag.styletag = styletag;
        await this.postStyletagRepository.save(postStyletag);
        updatedStyletags.push(tag);
      }

      // 옷 정보 업데이트
      let clothing = await this.clothingRepository.findOne({
        where: {
          brandName: postRequestDto.clothingInfo.brand,
          modelName: postRequestDto.clothingInfo.model,
          modelNumber: postRequestDto.clothingInfo.modelNumber,
          url: postRequestDto.clothingInfo.url,
        },
      });
      if (!clothing) {
        clothing = new Clothing();
        clothing.brandName = postRequestDto.clothingInfo.brand;
        clothing.modelName = postRequestDto.clothingInfo.model;
        clothing.modelNumber = postRequestDto.clothingInfo.modelNumber;
        clothing.url = postRequestDto.clothingInfo.url;
        await this.clothingRepository.save(clothing);
      }

      // 게시물의 옷 정보 업데이트
      await this.postClothingRepository.delete({ post: updatedPost });
      const postClothing = new PostClothing();
      postClothing.post = updatedPost;
      postClothing.clothing = clothing;
      await this.postClothingRepository.save(postClothing);

      const postResponseDto: PostResponseDto = {
        postId: updatedPost.id,
        userId: user.id,
        photoUrl: image.url,
        content: updatedPost.content,
        hashtags: updatedStyletags,
        clothingInfo: {
          brand: clothing.brandName,
          model: clothing.modelName,
          modelNumber: clothing.modelNumber,
          url: clothing.url,
        },
        likes: updatedPost.likes?.length || 0,
        comments: updatedPost.comments || [],
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
}