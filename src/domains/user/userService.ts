import {UserRequestDto} from './dtos/userRequest.dto';
import {UserResponseDto} from './dtos/userResponse.dto';
import {User} from '../../entities/userEntity';
import myDataBase from '../../data-source';
import dayjs from 'dayjs';

import CoolsmsMessageService from 'coolsms-node-sdk';
import dotenv from 'dotenv';
import {JwtPayload} from '../auth/dtos/dto';
dotenv.config();

export class UserService {
  private userRepository = myDataBase.getRepository(User);
  private messageService = new CoolsmsMessageService(
    process.env.COOLSMS_API_KEY || '',
    process.env.COOLSMS_API_SECRET || '',
  );

  async findUserByKakaoId(kakaoId: string): Promise<User | null> {
    return await this.userRepository.findOne({where: {kakaoId: kakaoId, status: 'activated'}});
  }

  async findUserByGoogleId(googleId: string): Promise<User | null> {
    return await this.userRepository.findOne({where: {googleId: googleId, status: 'activated'}});
  }

  async findUserByNaverId(naverId: string): Promise<User | null> {
    return await this.userRepository.findOne({where: {naverId: naverId, status: 'activated'}});
  }

  async createUserByPayload(payload: JwtPayload): Promise<User> {
    let user = this.userRepository.create();
    user.googleId = payload.googleId ? payload.googleId : null;
    user.kakaoId = payload.kakaoId ? payload.kakaoId : null;
    user.naverId = payload.naverId ? payload.naverId : null;
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
    const newUser = this.userRepository.create();
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

  // 인증 코드 생성 함수
  private generateToken(length: number): string {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // SMS 전송 함수
  public async sendVerificationCode(phone: string): Promise<void> {
    const token = this.generateToken(6);
    try {
      const result = await this.messageService.sendOne({
        to: phone,
        from: process.env.COOLSMS_SENDER_PHONE as string,
        text: `안녕하세요 요청하신 인증번호는 [${token}]입니다.`,
        autoTypeDetect: true,
      });
      console.log(result);
      // 인증 코드를 DB 또는 캐시에 저장하는 로직 추가 필요
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  // 인증 코드 확인 함수
  public async verifyCode(phone: string, token: string): Promise<boolean> {
    // 실제로는 DB 또는 캐시에서 인증 코드를 조회하고 검증해야 함
    // 여기서는 간단히 true를 반환
    return true;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserByUserId(userId: number): Promise<User | null> {
    return await this.userRepository.findOne({where: {id: userId, status: 'activated'}});
  }
}
