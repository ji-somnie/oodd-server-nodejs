import { myDataBase } from '../../data-source';
import { Post } from '../../entities/postEntity';
import { PostRequestDto } from './dtos/postRequest.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { BaseResponse } from '../../base/baseResponse';
import { HTTP_OK, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR } from '../../variables/httpCode';
import { User } from '../../entities/userEntity';
import { validatedUser } from '../../validationTest/userValidation';

export class PostService {
  // 생성자 사용 안 하고 DB에서 바로 가져옴
  private postRepository = myDataBase.getRepository(Post);
  private userRepository = myDataBase.getRepository(User);

  // 게시물 업로드
  async createPost(userId: number, postRequestDto: PostRequestDto): Promise<BaseResponse<PostResponseDto | null>> {
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

      const newPost = new Post();
      newPost.user = user;
      newPost.content = postRequestDto.caption;
      newPost.isRepresentative = false;
      // newPost.status = 'activated';

      const savedPost = await this.postRepository.save(newPost);
      const postResponseDto: PostResponseDto = {
        postId: savedPost.id,
        userId: user.id,
        photoUrl: savedPost.images?.length > 0 ? savedPost.images[0].url : '',
        content: savedPost.content,
        hashtags: savedPost.postStyletags ? savedPost.postStyletags.map(tag => tag.styletag.tag) : [],
        clothingInfo: savedPost.clothings.length > 0 ? {
          brand: savedPost.clothings[0].brandName,
          model: savedPost.clothings[0].modelName,
          modelNumber: savedPost.clothings[0].modelNumber,
          url: savedPost.clothings[0].url,
        } : {
          brand: '',
          model: '',
          modelNumber: '',
          url: '',
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
}
