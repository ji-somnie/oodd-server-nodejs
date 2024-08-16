export interface JwtPayload {
  id?: number;
  kakaoId?: string;
  googleId?: string;
  naverId?: string;
  email: string;
  username: string;
  img: string;
}
