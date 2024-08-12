import myDataBase from '../../data-source';
import {Post} from '../../entities/postEntity';
import {PostRequestDto} from './dtos/postRequest.dto';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR, NOT_FOUND_USER} from '../../variables/httpCode';
import {User} from '../../entities/userEntity';
import {validatedUser} from '../../validationTest/validateUser';
import {validatePost} from '../../validationTest/validatePost';
import {Image} from '../../entities/imageEntity';
import {PostStyletag} from '../../entities/postStyletagEntity';
import {Clothing} from '../../entities/clothingEntity';
import {Styletag} from '../../entities/styletagEntity';
import {PostClothing} from '../../entities/postClothingEntity';

import {PostResponseDto} from './dtos/postResponse.dto';

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
      const user = await validatedUser(userId); // 나중에 빼자 
      if (!user) {
        return {
          isSuccess: false,
          code: NOT_FOUND_USER.code,
          message: HTTP_NOT_FOUND.message,
          result: null,
        };
      }

      const newPost = new Post();
      newPost.user = user;
      newPost.content = postRequestDto.content ?? ''; 
      newPost.isRepresentative = false;
      newPost.status = 'activated';

      const savedPost = await this.postRepository.save(newPost);

      // image 저장     
      const photoUrls = postRequestDto.photoUrls ?? []; 

      // 사진 순서대로 저장 (최대 10개)
      const savedImages = [];
      for (let i = 0; i < photoUrls.length && i < 10; i++) {
        const newImage = new Image();
        newImage.url = photoUrls[i] ?? ''; 
        newImage.order = i + 1;  // 1부터 시작하는 순서
        newImage.postId = savedPost.id;
        const savedImage = await this.imageRepository.save(newImage);
        savedImages.push(savedImage);
      }

      // 스타일 태그 저장
      const savedStyletags: string[] = [];
      const hashtags = postRequestDto.styletags ?? []; // 빈 배열을 기본값으로 설정
      for (const tag of hashtags) {
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
     
      // 옷 저장
      const clothingInfo = postRequestDto.clothingInfo ?? []; // 빈 배열을 기본값으로 설정
      const savedClothingInfo = [];
      console.log('clothingInfo is ', clothingInfo);

      if (clothingInfo.length > 0) {
        for (const clothingItem of clothingInfo) {
          let clothing = await this.clothingRepository.findOne({
            where: {
              brandName: clothingItem.brand ?? '',
              modelName: clothingItem.model ?? '',
              modelNumber: clothingItem.modelNumber ?? '',
              url: clothingItem.url ?? '',
            }
          });

          if (!clothing) {
            clothing = new Clothing();
            clothing.brandName = clothingItem.brand ?? '';
            clothing.modelName = clothingItem.model ?? '';
            clothing.modelNumber = clothingItem.modelNumber ?? '';
            clothing.url = clothingItem.url ?? '';
            clothing = await this.clothingRepository.save(clothing);
            console.log('Saved clothing:', clothing); // 저장된 옷 정보 확인
          }

          // postClothing 저장
          const postClothing = new PostClothing();
          postClothing.post = savedPost;
          postClothing.clothing = clothing;
          await this.postClothingRepository.save(postClothing);
          console.log('Saved postClothing:', postClothing); // 저장된 게시물-옷 정보 확인

          savedClothingInfo.push({
            brand: clothing.brandName,
            model: clothing.modelName,
            modelNumber: clothing.modelNumber,
            url: clothing.url,
          });
        }
      }



    const postResponseDto: PostResponseDto = {
      postId: savedPost.id,
      userId: user.id,
      photoUrls: savedImages.map(image => image.url), 
      content: savedPost.content,
      styletags: savedStyletags,
      clothingInfo: savedClothingInfo, 
      likes: 0, 
      comments: [],
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
  
      // 연관된 엔티티 직접 삭제
      await this.postStyletagRepository.delete({ post: { id: postId } });
      await this.postClothingRepository.delete({ post: { id: postId } });
      await this.imageRepository.delete({ post: { id: postId } });
  
      await this.postRepository.remove(post);
  
      return {
        isSuccess: true,
        code: HTTP_OK.code,
        message: 'Post deleted successfully',
        result: null,
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
