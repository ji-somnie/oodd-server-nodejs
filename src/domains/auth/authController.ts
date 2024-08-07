import { Router, Request, Response } from 'express';
import { AuthService } from './authService';
import { AuthRequestDto } from './dtos/authRequest.dto';
import { status } from '../../variables/httpCode';

import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
const authService = new AuthService();

const kakaoOpt = {
    clientId: process.env.KAKAO_CLIENT_ID || '',
    clientSecret: process.env.KAKAO_CLIENT_SECRET || '', 
    redirectUri: 'http://localhost:3000/auth/kakao/callback',
};


//카카오 소셜 로그인
router.post("/kakao/signin", async (req: Request, res: Response) => {

    //1. 카카오 로그인 요청 (프론트) : kakao 로그인 버튼 클릭 -> kakao 로그인 페이지로 리디렉션
    //2. 카카오 인증 코드 수신 (프론트) : kakao로부터 받은 인증 코드를 프론트에서 서버로 전달

    let token;
    try {
        //3. 액세스 토큰 요청: 서버는 인증 코드를 사용하여 Kakao에 액세스 토큰을 요청.
        const url = 'https://kauth.kakao.com/oauth/token';
        const body = qs.stringify({
            grant_type: 'authorization_code',
            client_id: kakaoOpt.clientId,
            client_secret: kakaoOpt.clientSecret,
            redirect_uri: kakaoOpt.redirectUri,
            code: req.body.code, // 요청 본문에서 인가 코드를 가져옴
        });
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const response = await axios.post(url, body, { headers });
        token = response.data.access_token;  // Kakao로부터 받은 액세스 토큰
    } catch (err) {
        console.error('Error getting Kakao token:', err);
        return res.status(status.KAKAO_TOKEN_FAIL.status).json({ message: status.KAKAO_TOKEN_FAIL.message, err_code: status.KAKAO_TOKEN_FAIL.err_code });
    }

    try {
        //4. 사용자 정보 요청: 액세스 토큰을 사용하여 Kakao API로부터 사용자 정보를 요청.
        const url = 'https://kapi.kakao.com/v2/user/me';
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, { headers });
        const { nickname, profile_image: img } = response.data.properties;
        const { email } = response.data.kakao_account;
        const kakaoId = response.data.id;

        if (!nickname || !kakaoId || !img || !email) {
            return res.status(status.KAKAO_USER_NOT_FOUND.status).json({ message: status.KAKAO_USER_NOT_FOUND.message, err_code: status.KAKAO_USER_NOT_FOUND.err_code });
          }

        //5. JWT 토큰 생성: 사용자 정보를 바탕으로 JWT 토큰을 생성하여 클라이언트에 응답.
        //5-1. 사용자 정보가 담긴 페이로드 생성
        const payload = { nickname, kakaoId, img, email };

        //5-2. 유저 확인하고 없으면 회원가입 처리
        const user = await authService.handleKakaoUser(payload);

        //5-3. JWT 토큰 생성
        const accessToken = authService.makeToken(payload);

        // 쿠키 옵션 설정
        const cookieOpt = { maxAge: 1000 * 60 * 60 * 24 }; // 1일 동안 유효
        res.cookie('accessToken', accessToken, cookieOpt);
        res.status(200).json({ message: `${nickname}님 로그인 되었습니다`, accessToken });

    } catch (err) {
        console.error('Error getting user info from Kakao:', err);
        res.status(status.KAKAO_USER_NOT_FOUND.status).json({ message: status.KAKAO_USER_NOT_FOUND.message, err_code: status.KAKAO_USER_NOT_FOUND.err_code });
    }
});

export default router;