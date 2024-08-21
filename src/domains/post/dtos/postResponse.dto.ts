import { PostRequestDto } from "./postRequest.dto";

export class PostResponseDto extends PostRequestDto{
  postId!: number;
  userId!: number;
  isRepresentative?: boolean ;
}

export class PostDetailResponseDto extends PostResponseDto{
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
