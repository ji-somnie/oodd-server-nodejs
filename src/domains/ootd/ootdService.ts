import myDataBase from '../../data-source';
import {Post} from '../../entities/postEntity';
import {OotdResponseDto} from './dtos/ootdResponse.dto';
import {HTTP_OK, HTTP_INTERNAL_SERVER_ERROR} from '../../variables/httpCode';
import {BaseResponse} from '../../base/baseResponse';

export class OotdService {
  private postRepository = myDataBase.getRepository(Post);

  async getOotds(): Promise<BaseResponse<OotdResponseDto[] | null>> {
    try {
      const posts = await this.postRepository.find({
        relations: ['user', 'images', 'postStyletags', 'postStyletags.styletag', 'clothings', 'comments'],
      });

      const ootdResponses: OotdResponseDto[] = posts.map(post => ({
        postId: post.id,
        userId: post.user.id,
        photoUrl: post.images?.length > 0 ? post.images[0].url : '',
        content: post.content,
        hashtags: post.postStyletags ? post.postStyletags.map(tag => tag.styletag.tag) : [],
        clothingInfo:
          post.clothings.length > 0
            ? {
                brand: post.clothings[0].brandName,
                model: post.clothings[0].modelName,
                modelNumber: post.clothings[0].modelNumber,
                url: post.clothings[0].url,
              }
            : {
                brand: '',
                model: '',
                modelNumber: '',
                url: '',
              },
        likes: post.likes?.length || 0,
        comments: post.comments
          ? post.comments.map(comment => ({
              commentId: comment.id,
              userId: comment.user.id,
              text: comment.content,
              timestamp: comment.createdAt.toISOString(),
            }))
          : [],
      }));

      return {
        isSuccess: true,
        code: HTTP_OK.code,
        message: HTTP_OK.message,
        result: ootdResponses,
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
