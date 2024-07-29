import { PostRepository } from '../repositories/postRepository';
import { PostRequestDto } from './dtos/postRequest.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { UserRepository } from '../repositories/userRepository';
import { Post } from '../entities/postEntity';

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
      throw new Error('User not found');
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
}
