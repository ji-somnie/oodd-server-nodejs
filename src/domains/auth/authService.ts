import jwt from 'jsonwebtoken';
import {User} from '../../entities/userEntity';
import {UserService} from '../user/userService';
import {JwtPayload} from './dtos/dto';

export class AuthService {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  private secretKey = 'your-secret-key'; // 실제로는 환경 변수로 관리하는 것이 좋습니다.

  // 1일 동안 유효한 토큰 생성
  makeToken({id: number, ...payload}: JwtPayload): string {
    return jwt.sign(payload, this.secretKey, {expiresIn: '1d'});
  }

  // Kakao 사용자 등록 안 되어있으면 회원가입, 있으면 기존 회원 반환
  async handleKakaoUser(kakaoId: string, payload: JwtPayload): Promise<User> {
    // 카카오 ID로 사용자 조회
    let user = await this.userService.findUserByKakaoId(kakaoId);

    // 사용자가 없으면 새로 가입 처리
    if (!user) {
      return await this.userService.createUserByPayload(payload);
    }

    return user;
  }

  // Google 사용자 등록 안 되어있으면 회원가입, 있으면 기존 회원 반환
  async handleGoogleUser(googleId: string, payload: JwtPayload): Promise<User> {
    // 구글 ID로 사용자 조회
    let user = await this.userService.findUserByGoogleId(googleId);

    // 사용자가 없으면 새로 가입 처리
    if (!user) {
      return await this.userService.createUserByPayload(payload);
    }

    return user;
  }

  // Naver 사용자 등록 안 되어있으면 회원가입, 있으면 기존 회원 반환
  async handleNaverUser(naverId: string, payload: JwtPayload): Promise<User> {
    // Naver ID로 사용자 조회
    let user = await this.userService.findUserByNaverId(naverId);

    // 사용자가 없으면 새로 가입 처리
    if (!user) {
      return await this.userService.createUserByPayload(payload);
    }
    return user;
  }
}
