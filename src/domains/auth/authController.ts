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
};

// 카카오 소셜 로그인 콜백
router.get('/login/kakao', async (req: Request, res: Response) => {
  const code = req.query.code as string;

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
    const user = await authService.handleKakaoUser(payload);

    // JWT 토큰 생성
    const accessToken = authService.makeToken({id: user.id, ...payload});

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
    const user = await authService.handleGoogleUser(payload);

    // JWT 토큰 생성
    const accessToken = authService.makeToken({id: user.id, ...payload});

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

export default router;
