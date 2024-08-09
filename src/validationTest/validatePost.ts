import myDataBase from '../data-source';
import {Post} from '../entities/postEntity';

export async function validatePost(userId: number, postId: number): Promise<Post | null> {
  const postRepository = myDataBase.getRepository(Post);
  const post = await postRepository.findOne({where: {id: postId, user: {id: userId}}});
  return post || null;
}
