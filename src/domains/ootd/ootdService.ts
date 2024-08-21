import myDataBase from '../../data-source';
import {Post} from '../../entities/postEntity';
import {BaseResponse} from '../../base/baseResponse';
import {HTTP_OK, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR, NOT_FOUND_USER} from '../../variables/httpCode';
import {User} from '../../entities/userEntity';
import {PostStyletag} from '../../entities/postStyletagEntity';
import { Like } from '../../entities/likeEntity';
import { BaseOotdResponseDto, OotdResponseDto } from './dtos/ootdResponse.dto';

export class OOTDService {
  // 생성자 사용 안 하고 DB에서 바로 가져옴
  private postRepository = myDataBase.getRepository(Post);
  private userRepository = myDataBase.getRepository(User);
  private postStyletagRepository = myDataBase.getRepository(PostStyletag);
  private likeRepository = myDataBase.getRepository(Like);

// OOTD 조회
async getOOTD(styletagArray: string[]): Promise<BaseResponse<OotdResponseDto>> {
    try {
      // 스타일태그에 해당하는 게시물들 조회
      const posts = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .leftJoinAndSelect('post.images', 'image')
        .leftJoinAndSelect('post.postStyletags', 'postStyletag')
        .leftJoinAndSelect('postStyletag.styletag', 'styletag')
        .where('styletag.tag IN (:...styletagArray)', { styletagArray })
        .andWhere('post.status = :status', { status: 'activated' })
        .orderBy('post.createdAt', 'DESC')
        .getMany();
  
        console.log('posts: ', posts);

      // 각 게시물
      const postDtos: BaseOotdResponseDto[] = [];
  
      for (const post of posts) {
        // 해당 게시물의 좋아요 수
        const likes = await this.likeRepository
          .createQueryBuilder('like')
          .where('like.postId = :postId', { postId: post.id })
          .getCount();
  
        // 해당 게시물의 모든 스타일 태그
        const styletags = await this.postStyletagRepository
          .createQueryBuilder('postStyletag')
          .leftJoinAndSelect('postStyletag.styletag', 'styletag')
          .where('postStyletag.postId = :postId', { postId: post.id })
          .select('styletag.tag')
          .getRawMany();

        const styletagArray = styletags.map(tag => tag.styletag_tag);

        // 해당 게시물의 모든 이미지
        const photoUrls = post.images.map(image => image.url);
  
        const postDto: BaseOotdResponseDto = {
          postId: post.id,
          userId: post.user.id,
          likes: likes > 0 ? likes : 0,
          photoUrls: photoUrls,
          content: post.content || '',
          styletags: styletagArray,
        };
  
        postDtos.push(postDto);
      }
  
      const ootdResponseDto: OotdResponseDto = {
        posts: postDtos,
      };
  
      return new BaseResponse<OotdResponseDto>(true, HTTP_OK.code, HTTP_OK.message, ootdResponseDto);
    } catch (error) {
      console.error(error);
      return new BaseResponse<OotdResponseDto>(false, HTTP_INTERNAL_SERVER_ERROR.code, HTTP_INTERNAL_SERVER_ERROR.message);
    }
  }
}