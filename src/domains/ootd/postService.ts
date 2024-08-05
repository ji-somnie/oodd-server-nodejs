import { myDataBase } from '../../data-source';
import { Post } from '../../entities/postEntity';
import { PostRequestDto } from './dtos/postRequest.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { BaseResponse } from '../../base/baseResponse';
import { HTTP_OK, HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR } from '../../variables/httpCode';
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
      newPost.photoUrl = postRequestDto.photoUrl;
      newPost.caption = postRequestDto.caption;
      newPost.hashtags = postRequestDto.hashtags;
      newPost.clothingInfo = postRequestDto.clothingInfo;

      const savedPost = await this.postRepository.save(newPost);

      const postResponseDto: PostResponseDto = {
        postId: savedPost.id,
        userId: user.id,
        photoUrl: savedPost.photoUrl,
        content: savedPost.caption,
        hashtags: savedPost.hashtags,
        clothingInfo: savedPost.clothingInfo,
        likes: savedPost.likes,
        comments: savedPost.comments,
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
