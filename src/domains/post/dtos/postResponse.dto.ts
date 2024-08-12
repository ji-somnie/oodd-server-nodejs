import { BasePostDto } from "./basePost.dto";

export class PostResponseDto extends BasePostDto{
  postId!: number;
  userId!: number;
  
  likes!: number | null;
  comments!: {
      commentId: number | null;
      userId: number | null;
      text: string | null;
      timestamp: string | null;
  }[] | null;
}

export class PostListResponseDto {
  totalPosts!: number;
  totalLikes!: number;
  posts!: BasePostListResponseDto[];
}

export class BasePostListResponseDto {
  postId!: number;
  userId!: number;
  likes!: number;
  firstPhoto!: string;
  isRepresentative!: boolean;
  commentsCount?: number; // 내 게시물일 때만
}
