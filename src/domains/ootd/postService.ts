import { myDataBase } from '../../data-source';
import { Post } from '../../entities/postEntity';
import { PostRequestDto } from './dtos/postRequest.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { BaseResponse } from '../../base/baseResponse';
import { HTTP_OK, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR } from '../../variables/httpCode';
import { User } from '../../entities/userEntity';
import { validatedUser } from '../../validationTest/validateUser';
import { validatePost } from '../../validationTest/validatePost';

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

  // 게시물 삭제
  async deletePost(userId: number, postId: number): Promise<BaseResponse<null>> {
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

  // 게시물 수정
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

      const postResponseDto: PostResponseDto = {
        postId: updatedPost.id,
        userId: user.id,
        photoUrl: updatedPost.images?.length > 0 ? updatedPost.images[0].url : '',
        content: updatedPost.content,
        hashtags: updatedPost.postStyletags ? updatedPost.postStyletags.map(tag => tag.styletag.tag) : [],
        clothingInfo: updatedPost.clothings.length > 0 ? {
          brand: updatedPost.clothings[0].brandName,
          model: updatedPost.clothings[0].modelName,
          modelNumber: updatedPost.clothings[0].modelNumber,
          url: updatedPost.clothings[0].url,
        } : {
          brand: '',
          model: '',
          modelNumber: '',
          url: '',
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

  // 게시물 조회
  async getPostById(userId: number, postId: number): Promise<BaseResponse<PostResponseDto | null>> {
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
  
      const postResponseDto: PostResponseDto = {
        postId: post.id,
        userId: post.user.id,
        photoUrl: post.images?.length > 0 ? post.images[0].url : '',
        content: post.content,
        hashtags: post.postStyletags ? post.postStyletags.map(tag => tag.styletag.tag) : [],
        clothingInfo: post.clothings.length > 0 ? {
          brand: post.clothings[0].brandName,
          model: post.clothings[0].modelName,
          modelNumber: post.clothings[0].modelNumber,
          url: post.clothings[0].url,
        } : {
          brand: '',
          model: '',
          modelNumber: '',
          url: '',
        },
        likes: post.likes?.length || 0,
        comments: post.comments || [],
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

  // 스타일태그 검색 결과 조회
  async getPostsByTag(userId: number, tag: string): Promise<BaseResponse<PostResponseDto[] | null>> {
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
      
      // 해당 스타일태그와 관련된 정보들 추출
      const posts = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .leftJoinAndSelect('post.images', 'images')
        .leftJoinAndSelect('post.postStyletags', 'postStyletags')
        .leftJoinAndSelect('postStyletags.styletag', 'styletag')
        .leftJoinAndSelect('post.clothings', 'clothings')
        .leftJoinAndSelect('post.comments', 'comments')
        .where('styletag.tag = :tag', { tag })
        .getMany();
  
      const postResponseDtos: PostResponseDto[] = posts.map(post => ({
        postId: post.id,
        userId: post.user.id,
        photoUrl: post.images?.length > 0 ? post.images[0].url : '',
        content: post.content,
        hashtags: post.postStyletags ? post.postStyletags.map(tag => tag.styletag.tag) : [],
        clothingInfo: post.clothings.length > 0 ? {
          brand: post.clothings[0].brandName,
          model: post.clothings[0].modelName,
          modelNumber: post.clothings[0].modelNumber,
          url: post.clothings[0].url,
        } : {
          brand: '',
          model: '',
          modelNumber: '',
          url: '',
        },
        likes: post.likes?.length || 0,
        comments: post.comments || [],
      }));
  
      return {
        isSuccess: true,
        code: HTTP_OK.code,
        message: HTTP_OK.message,
        result: postResponseDtos,
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