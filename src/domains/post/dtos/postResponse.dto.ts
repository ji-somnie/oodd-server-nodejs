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