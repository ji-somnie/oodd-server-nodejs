import { PostRepository } from '../../repositories/postRepository';
import { PostRequestDto } from './dtos/postRequest.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { UserRepository } from '../../repositories/userRepository';
import { Post } from '../../entities/postEntity';
import { status } from '../../variables/httpCode';

export class PostService {
  private postRepository: PostRepository;
  private userRepository: UserRepository;

  constructor() {
    this.postRepository = new PostRepository();
    this.userRepository = new UserRepository();
  }

  // 게시물 업로드
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
    
  // 게시물 수정
  async updatePost(token: string, postId: number, postRequestDto: PostRequestDto): Promise<PostResponseDto> {
    const user = await this.userRepository.findOneByToken(token);
    if (!user) {
      throw new Error(status.USER_NOT_FOUND.message);
    }

    const post = await this.postRepository.findOneBy({ id: postId, user: { id: user.id } });
    if (!post) {
      throw new Error(status.ARTICLE_NOT_FOUND.message);
    }

    post.photoUrl = postRequestDto.photoUrl;
    post.caption = postRequestDto.caption;
    post.hashtags = postRequestDto.hashtags;
    post.clothingInfo = postRequestDto.clothingInfo;

    const updatedPost = await this.postRepository.save(post);

    const postResponseDto = new PostResponseDto();
    postResponseDto.postId = updatedPost.id;
    postResponseDto.userId = user.id;
    postResponseDto.photoUrl = updatedPost.photoUrl;
    postResponseDto.content = updatedPost.caption;
    postResponseDto.hashtags = updatedPost.hashtags;
    postResponseDto.clothingInfo = updatedPost.clothingInfo;
    postResponseDto.likes = updatedPost.likes;
    postResponseDto.comments = updatedPost.comments;

    return postResponseDto;
  }

  // 게시물 삭제
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

  // 게시물 조회
  async getPost(token: string, postId: number): Promise<PostResponseDto> {
    const user = await this.userRepository.findOneByToken(token);
    if (!user) {
      throw new Error(status.USER_NOT_FOUND.message);
    }

    const post = await this.postRepository.findOneBy({ id: postId, user: { id: user.id } });
    if (!post) {
      throw new Error(status.ARTICLE_NOT_FOUND.message);
    }

    const postResponseDto = new PostResponseDto();
    postResponseDto.postId = post.id;
    postResponseDto.userId = user.id;
    postResponseDto.photoUrl = post.photoUrl;
    postResponseDto.content = post.caption;
    postResponseDto.hashtags = post.hashtags;
    postResponseDto.clothingInfo = post.clothingInfo;
    postResponseDto.likes = post.likes;
    postResponseDto.comments = post.comments;

    return postResponseDto;
  }
}
