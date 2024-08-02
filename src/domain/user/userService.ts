import { getRepository } from 'typeorm';
import { User } from './entities/userEntity';
import { Post } from './entities/postEntity';

export class UserService {
  private userRepository = getRepository(User);
  private postRepository = getRepository(Post);

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async createUser(name: string, email: string) {
    const user = new User();
    user.username = name;
    user.email = email;
    return await this.userRepository.save(user);
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id }, relations: ['posts'] });
  }

  async getUserPosts(userId: number) {
    return await this.postRepository.find({ where: { user: { id: userId } } });
  }

  async createUserPost(userId: number, title: string, content: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;
    return await this.postRepository.save(post);
  }

  async getPostById(postId: number) {
    return await this.postRepository.findOne({ where: { id: postId } });
  }

  async updateUser(userId: number, updateData: { username?: string; email?: string; nickname?: string; }) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    if (updateData.username) user.username = updateData.username;
    if (updateData.email) user.email = updateData.email;
    if (updateData.nickname) user.nickname = updateData.nickname;

    return await this.userRepository.save(user);
  }
}
