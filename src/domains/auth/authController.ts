import {Router, Request, Response} from 'express';
import {AuthService} from './authService';
import {AuthRequestDto} from './dtos/authRequest.dto';
import {status} from '../../variables/httpCode';

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

const googleOpt = {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    redirectUri: 'http://localhost:3000/auth/google/callback',
}

<<<<<<< HEAD
const naverOpt = {
    clientId: process.env.NAVER_CLIENT_ID || '',
    clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    redirectUri: 'http://localhost:3000/auth/naver/callback',
};


// 카카오 소셜 로그인 요청 시작
router.get("/login/kakao", (req: Request, res: Response) => {
    const kakaoAuthUrl = 'https://kauth.kakao.com/oauth/authorize';
    const params = qs.stringify({
        response_type: 'code',
        client_id: kakaoOpt.clientId,
        redirect_uri: kakaoOpt.redirectUri,
        scope: 'profile_nickname,profile_image,account_email',
    });

    res.redirect(`${kakaoAuthUrl}?${params}`);
});

// 카카오 소셜 로그인 콜백
router.get("/kakao/callback", async (req: Request, res: Response) => {
    const code = req.query.code as string;
=======
// 카카오 소셜 로그인 콜백
router.get('/login/kakao', async (req: Request, res: Response) => {
  const code = req.query.code as string;
>>>>>>> 3feac2956c1deb7aa8a1512c2a776c6e53f8a5ab

  if (!code) {
    return res
      .status(status.KAKAO_AUTH_FAIL.status)
      .json({message: status.KAKAO_AUTH_FAIL.message, err_code: status.KAKAO_AUTH_FAIL.err_code});
  }

  let token;
  try {
    // 액세스 토큰 요청
    const url = 'https://kauth.kakao.com/oauth/token';
    const body = qs.stringify({
      grant_type: 'authorization_code',
      client_id: kakaoOpt.clientId,
      client_secret: kakaoOpt.clientSecret,
      redirect_uri: kakaoOpt.redirectUri,
      code,
    });
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const response = await axios.post(url, body, {headers});
    token = response.data.access_token;
  } catch (err) {
    console.error('Error getting Kakao token:', err);
    return res
      .status(status.KAKAO_TOKEN_FAIL.status)
      .json({message: status.KAKAO_TOKEN_FAIL.message, err_code: status.KAKAO_TOKEN_FAIL.err_code});
  }

  try {
    // 사용자 정보 요청
    const url = 'https://kapi.kakao.com/v2/user/me';
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, {headers});
    const {nickname: username, profile_image: img} = response.data.properties;
    const {email} = response.data.kakao_account;
    const kakaoId = response.data.id;

    if (!username || !kakaoId || !img || !email) {
      return res
        .status(status.KAKAO_USER_NOT_FOUND.status)
        .json({message: status.KAKAO_USER_NOT_FOUND.message, err_code: status.KAKAO_USER_NOT_FOUND.err_code});
    }

    // JWT 토큰 생성: 사용자 정보를 바탕으로 JWT 토큰을 생성하여 클라이언트에 응답.
    const payload = {username, kakaoId, img, email};

    // 유저 확인하고 없으면 회원가입 처리
    await authService.handleKakaoUser(payload);

    // JWT 토큰 생성
    const accessToken = authService.makeToken(payload);

    // 쿠키 옵션 설정
    const cookieOpt = {maxAge: 1000 * 60 * 60 * 24}; // 1일 동안 유효
    res.cookie('accessToken', accessToken, cookieOpt);
    res.status(200).json({message: `${username}님 로그인 되었습니다`, accessToken});
  } catch (err) {
    console.error('Error getting user info from Kakao:', err);
    res
      .status(status.KAKAO_USER_NOT_FOUND.status)
      .json({message: status.KAKAO_USER_NOT_FOUND.message, err_code: status.KAKAO_USER_NOT_FOUND.err_code});
  }
});

<<<<<<< HEAD
// 구글 소셜 로그인 콜백
router.get("/google/callback", async (req: Request, res: Response) => {
    const code = req.query.code as string;
=======
>>>>>>> 3feac2956c1deb7aa8a1512c2a776c6e53f8a5ab

router.get('/login/google', async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    return res
      .status(status.GOOGLE_AUTH_FAIL.status)
      .json({message: status.GOOGLE_AUTH_FAIL.message, err_code: status.GOOGLE_AUTH_FAIL.err_code});
  }

  let token;
  try {
    // 액세스 토큰 요청
    const url = 'https://oauth2.googleapis.com/token';
    const body = {
      code,
      client_id: googleOpt.clientId,
      client_secret: googleOpt.clientSecret,
      redirect_uri: googleOpt.redirectUri,
      grant_type: 'authorization_code',
    };
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const response = await axios.post(url, qs.stringify(body), {headers});
    console.log('Google token response:', response.data);
    token = response.data.access_token;
  } catch (err) {
    console.error('Error getting Google token:', err);
    return res
      .status(status.GOOGLE_TOKEN_FAIL.status)
      .json({message: status.GOOGLE_TOKEN_FAIL.message, err_code: status.GOOGLE_TOKEN_FAIL.err_code});
  }

  try {
    // 사용자 정보 요청
    const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, {headers});
    console.log('Google user info response:', response.data);
    const {name: username, picture: img, email, id: googleId} = response.data;

    if (!username || !googleId || !img || !email) {
      return res
        .status(status.GOOGLE_USER_NOT_FOUND.status)
        .json({message: status.GOOGLE_USER_NOT_FOUND.message, err_code: status.GOOGLE_USER_NOT_FOUND.err_code});
    }

    // JWT 토큰 생성
    const payload = {username, googleId, img, email};

    // 유저 확인하고 없으면 회원가입 처리
    await authService.handleGoogleUser(payload);

    // JWT 토큰 생성
    const accessToken = authService.makeToken(payload);

    // 쿠키 옵션 설정
    const cookieOpt = {maxAge: 1000 * 60 * 60 * 24}; // 1일 동안 유효
    res.cookie('accessToken', accessToken, cookieOpt);
    res.status(200).json({message: `${username}님 로그인 되었습니다`, accessToken});
  } catch (err) {
    console.error('Error getting user info from Google:', err);
    res
      .status(status.GOOGLE_USER_NOT_FOUND.status)
      .json({message: status.GOOGLE_USER_NOT_FOUND.message, err_code: status.GOOGLE_USER_NOT_FOUND.err_code});
  }
});

<<<<<<< HEAD
// 네이버 소셜 로그인 요청 시작
router.get("/login/naver", (req: Request, res: Response) => {
    const naverAuthUrl = 'https://nid.naver.com/oauth2.0/authorize';
    const state = Math.random().toString(36).substring(2, 12); // CSRF 방지를 위한 상태 토큰 생성
    const params = qs.stringify({
        response_type: 'code',
        client_id: naverOpt.clientId,
        redirect_uri: naverOpt.redirectUri,
        state: state,
    });

    res.redirect(`${naverAuthUrl}?${params}`);
});

// 네이버 소셜 로그인 콜백
router.get("/naver/callback", async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const state = req.query.state as string;

    if (!code || !state) {
        return res.status(status.NAVER_AUTH_FAIL.status).json({ message: status.NAVER_AUTH_FAIL.message, err_code: status.NAVER_AUTH_FAIL.err_code });
    }

    let token;
    try {
        // 액세스 토큰 요청
        const url = 'https://nid.naver.com/oauth2.0/token';
        const body = qs.stringify({
            grant_type: 'authorization_code',
            client_id: naverOpt.clientId,
            client_secret: naverOpt.clientSecret,
            redirect_uri: naverOpt.redirectUri,
            code,
            state,
        });
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const response = await axios.post(url, body, { headers });
        console.log('Naver token response:', response.data);
        token = response.data.access_token;
    } catch (err) {
        console.error('Error getting Naver token:', err);
        return res.status(status.NAVER_TOKEN_FAIL.status).json({ message: status.NAVER_TOKEN_FAIL.message, err_code: status.NAVER_TOKEN_FAIL.err_code });
    }

    try {
        // 사용자 정보 요청
        const url = 'https://openapi.naver.com/v1/nid/me';
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, { headers });
        console.log('Naver user info response:', response.data);
        const { nickname, profile_image: img, email, id: naverId } = response.data.response;

        if (!nickname || !naverId || !img || !email) {
            return res.status(status.NAVER_USER_NOT_FOUND.status).json({ message: status.NAVER_USER_NOT_FOUND.message, err_code: status.NAVER_USER_NOT_FOUND.err_code });
        }

        // JWT 토큰 생성: 사용자 정보를 바탕으로 JWT 토큰을 생성하여 클라이언트에 응답
        const payload = { nickname, naverId, img, email };

        // 유저 확인하고 없으면 회원가입 처리
        const user = await authService.handleNaverUser(payload);

        // JWT 토큰 생성
        const accessToken = authService.makeToken(payload);

        // 쿠키 옵션 설정
        const cookieOpt = { maxAge: 1000 * 60 * 60 * 24 }; // 1일 동안 유효
        res.cookie('accessToken', accessToken, cookieOpt);
        res.status(200).json({ message: `${nickname}님 로그인 되었습니다`, accessToken });

    } catch (err) {
        console.error('Error getting user info from Naver:', err);
        res.status(status.NAVER_USER_NOT_FOUND.status).json({ message: status.NAVER_USER_NOT_FOUND.message, err_code: status.NAVER_USER_NOT_FOUND.err_code });
    }
});

export default router;
=======
export default router;
>>>>>>> 3feac2956c1deb7aa8a1512c2a776c6e53f8a5ab
