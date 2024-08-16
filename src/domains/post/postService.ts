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

  // 게시물 상세 조회
  async getPostDetail(userId: number, postId: number): Promise<BaseResponse<PostDetailResponseDto | null>> {
    try {
      const post = await this.getPostById(postId);
      if (!post) {
        return {
          isSuccess: false,
          code: HTTP_NOT_FOUND.code,
          message: HTTP_NOT_FOUND.message,
          result: null,
        };
      }

      const likes = await this.likeRepository.count({where: {post}});

      // 스타일 태그 정보
      const styletagInfo = await this.postStyletagRepository
        .createQueryBuilder('postStyletag')
        .leftJoinAndSelect('postStyletag.styletag', 'styletag')
        .where('postStyletag.postId = :postId', {postId})
        .select('styletag.tag')
        .getRawMany();

      const styletags = styletagInfo.map(tag => tag.styletag_tag);

      // 옷 정보
      const clothingInfo = await this.postClothingRepository
        .createQueryBuilder('postClothing')
        .leftJoinAndSelect('postClothing.clothing', 'clothing')
        .where('postClothing.postId = :postId', {postId})
        .select(['clothing.imageUrl','clothing.brandName', 'clothing.modelName', 'clothing.modelNumber', 'clothing.url'])
        .getRawMany();

      const clothingDetails = clothingInfo.map(info => ({
        imageUrl: info.clothing_imageUrl,
        brand: info.clothing_brandName,
        model: info.clothing_modelName,
        modelNumber: info.clothing_modelNumber,
        url: info.clothing_url,
      }));

      // 댓글 - 내 게시물 때만
      let comments = [];
      if (post.user.id === userId) {
        comments = await this.commentRepository
          .createQueryBuilder('comment')
          .leftJoinAndSelect('comment.user', 'user')
          .where('comment.postId = :postId', {postId})
          .select([
            'comment.id AS commentId',
            'user.id AS userId',
            'comment.content AS text',
            'comment.createdAt AS timestamp',
          ])
          .getRawMany();
      }

      const postResponseDto: PostDetailResponseDto = {
        postId: post.id,
        userId: post.user.id,
        likes: likes > 0 ? likes : null,
        comments: post.user.id === userId && comments.length > 0 ? comments : null,
        photoUrls: post.images.length > 0 ? post.images.map(image => image.url) : null,
        content: post.content || null,
        styletags: styletags.length > 0 ? styletags : null,
        clothingInfo: clothingDetails.length > 0 ? clothingDetails : null,
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

  async getRepresentativePost(user: User): Promise<Post | null> {
    return this.postRepository.findOne({
      where: {user, isRepresentative: true, status: 'activated'},
      relations: ['images', 'postStyletags', 'postClothings'],
      order: {createdAt: 'DESC'},
    });
  }

  async getLastestPost(user: User): Promise<Post | null> {
    return this.postRepository.findOne({
      where: {user, status: 'activated'},
      relations: ['images', 'postStyletags', 'postClothings'],
      order: {createdAt: 'DESC'},
    });
  }
}