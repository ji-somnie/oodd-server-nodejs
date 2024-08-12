import jwt from 'jsonwebtoken';
import {User} from '../../entities/userEntity';
import {UserService} from '../user/userService';

export class AuthService {
  private userService;

<<<<<<< HEAD
    constructor() {
        this.userRepository = new UserRepository();
    }

    private secretKey = 'your-secret-key'; // 실제로는 환경 변수로 관리하는 것이 좋습니다.

    // 1일 동안 유효한 토큰 생성
    makeToken(payload: any): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: '1d' });
    }

    // Kakao 사용자 등록 안 되어있으면 회원가입, 있으면 기존 회원 반환
    async handleKakaoUser(payload: any): Promise<User> {

        // 카카오 ID로 사용자 조회
        let user = await this.userRepository.findOne({ where: { kakaoId: payload.kakaoId } });

        // 사용자가 없으면 새로 가입 처리
        if (!user) {
            user = new User();
            user.kakaoId = payload.kakaoId;
            user.email = payload.email;
            user.nickname = payload.nickname;
            user.profilePictureUrl = payload.img;
            await this.userRepository.save(user);
        }

        return user;
    }

    // Google 사용자 등록 안 되어있으면 회원가입, 있으면 기존 회원 반환
    async handleGoogleUser(payload: any): Promise<User> {

        // 구글 ID로 사용자 조회
        let user = await this.userRepository.findOne({ where: { googleId: payload.googleId } });

        // 사용자가 없으면 새로 가입 처리
        if (!user) {
            user = new User();
            user.googleId = payload.googleId;
            user.email = payload.email;
            user.nickname = payload.nickname;
            user.profilePictureUrl = payload.img;
            await this.userRepository.save(user);
        }

        return user;
    }

    // Naver 사용자 등록 안 되어있으면 회원가입, 있으면 기존 회원 반환
    async handleNaverUser(payload: any): Promise<User> {
        // 네이버 ID로 사용자 조회
        let user = await this.userRepository.findOne({ where: { naverId: payload.naverId } });

        // 사용자가 없으면 새로 가입 처리
        if (!user) {
            user = new User();
            user.naverId = payload.naverId;
            user.email = payload.email;
            user.nickname = payload.nickname;
            user.profilePictureUrl = payload.img;
            await this.userRepository.save(user);
        }

        return user;
    }
=======
  constructor() {
    this.userService = new UserService();
  }

  private secretKey = 'your-secret-key'; // 실제로는 환경 변수로 관리하는 것이 좋습니다.

  // 1일 동안 유효한 토큰 생성
  makeToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, {expiresIn: '1d'});
  }

  // Kakao 사용자 등록 안 되어있으면 회원가입, 있으면 기존 회원 반환
  async handleKakaoUser(payload: any): Promise<void> {
    // 카카오 ID로 사용자 조회
    let user = this.userService.findUserByKakaoId(payload.kakaoId);

    // 사용자가 없으면 새로 가입 처리
    if (!user) {
      await this.userService.createUserByPayload(payload);
    }
  }

  // Google 사용자 등록 안 되어있으면 회원가입, 있으면 기존 회원 반환
  async handleGoogleUser(payload: any): Promise<void> {
    // 구글 ID로 사용자 조회
    let user = await this.userService.findUserByGoogleId(payload.googleId);

    // 사용자가 없으면 새로 가입 처리
    if (!user) {
      await this.userService.createUserByPayload(payload);
    }
  }
>>>>>>> 3feac2956c1deb7aa8a1512c2a776c6e53f8a5ab
}
