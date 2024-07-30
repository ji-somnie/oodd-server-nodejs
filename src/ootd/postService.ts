import { PostRepository } from '../repositories/postRepository';
import { PostRequestDto } from './dtos/postRequest.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { UserRepository } from '../repositories/userRepository';
import { Post } from '../entities/postEntity';
import { status } from '../variables/httpCode';

export class PostService {
  private postRepository: PostRepository;
  private userRepository: UserRepository;

  constructor() {
    this.postRepository = new PostRepository();
    this.userRepository = new UserRepository();
  }

  async createPost(token: string, postRequestDto: PostRequestDto): Promise<PostResponseDto> {
    const user = await this.userRepository.findOneByToken(token);
    if (!user) {
      throw new Error(status.USER_NOT_FOUND.message);
    }

    const newPost = new Post();
    newPost.user = user;
    newPost.photoUrl = postRequestDto.photoUrl;
    newPost.caption = postRequestDto.caption;
    newPost.hashtags = postRequestDto.hashtags;
    newPost.clothingInfo = postRequestDto.clothingInfo;

    const savedPost = await this.postRepository.save(newPost);

    const postResponseDto = new PostResponseDto();
    postResponseDto.postId = savedPost.id;
    postResponseDto.userId = user.id;
    postResponseDto.photoUrl = savedPost.photoUrl;
    postResponseDto.content = savedPost.caption;
    postResponseDto.hashtags = savedPost.hashtags;
    postResponseDto.clothingInfo = savedPost.clothingInfo;
    postResponseDto.likes = savedPost.likes;
    postResponseDto.comments = savedPost.comments;

    return postResponseDto;
  }
    
    async deletePost(token: string, postId: number): Promise<void> {
      const user = await this.userRepository.findOneByToken(token);
      if (!user) {
        throw new Error(status.USER_NOT_FOUND.message);
      }
  
      const post = await this.postRepository.findOneBy({ id: postId, user: { id: user.id } });
      if (!post) {
        throw new Error(status.ARTICLE_NOT_FOUND.message);
      }
  
      await this.postRepository.remove(post);
    }
}