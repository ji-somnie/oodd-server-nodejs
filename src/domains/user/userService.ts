import {UserRequestDto} from './dtos/userRequest.dto';
import {UserResponseDto} from './dtos/userResponse.dto';
import {User} from '../../entities/userEntity';
import myDataBase from '../../data-source';
import dayjs from 'dayjs';

export class UserService {
  private userRepository = myDataBase.getRepository(User);

  async findUserByKakaoId(kakaoId: string): Promise<User | null> {
    return await this.userRepository.findOne({where: {kakaoId: kakaoId}});
  }

  async findUserByGoogleId(googleId: string): Promise<User | null> {
    return await this.userRepository.findOne({where: {googleId: googleId}});
  }

  async createUserByPayload(payload: any): Promise<User> {
    let user = myDataBase.getRepository(User).create();
    user.googleId = payload.googleId ? payload.googleId : null;
    user.kakaoId = payload.kakaoId ? payload.kakaoId : null;
    user.email = payload.email;
    user.name = payload.username;
    user.profilePictureUrl = payload.img;
    user.status = 'activated';
    user.joinedAt = dayjs().toDate();
    user.createdAt = dayjs().toDate();
    user.updatedAt = dayjs().toDate();
    return await this.userRepository.save(user);
  }
  // 메서드 정의
  async createUser(userRequestDto: UserRequestDto): Promise<UserResponseDto> {
    // newUser 객체를 클라이언트로부터 받은 데이터로 초기화
    const newUser = new User();
    newUser.id = userRequestDto.id;
    newUser.name = userRequestDto.name;
    newUser.email = userRequestDto.email;
    newUser.nickname = userRequestDto.nickname;
    newUser.phoneNumber = userRequestDto.phoneNumber;
    newUser.profilePictureUrl = userRequestDto.profilePictureUrl;
    newUser.bio = userRequestDto.bio;
    // status, joinedAt, createdAt, updatedAt, deletedAt은 서버 또는 데이터베이스에서 자동으로 설정됩니다.

    // newUser를 데이터베이스에 저장하고 savedUser를 반환받음
    const savedUser = await this.userRepository.save(newUser);

    // savedUser를 기반으로 UserResponseDto를 생성
    const userResponseDto = new UserResponseDto();
    userResponseDto.id = savedUser.id;
    userResponseDto.name = savedUser.name;
    userResponseDto.email = savedUser.email;
    userResponseDto.nickname = savedUser.nickname;
    userResponseDto.phoneNumber = savedUser.phoneNumber;
    userResponseDto.profilePictureUrl = savedUser.profilePictureUrl;
    userResponseDto.bio = savedUser.bio;
    userResponseDto.status = savedUser.status;
    userResponseDto.joinedAt = savedUser.joinedAt;
    userResponseDto.createdAt = savedUser.createdAt;
    userResponseDto.updatedAt = savedUser.updatedAt;
    userResponseDto.deletedAt = savedUser.deletedAt;

    // UserResponseDto를 반환
    return userResponseDto;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserByUserId(userId: number): Promise<User | null> {
    return await this.userRepository.findOne({where: {id: userId, status: 'activated'}});
  }
}
