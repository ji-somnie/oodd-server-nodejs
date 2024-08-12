import {Request} from 'express';
import jwt from 'jsonwebtoken';

export class JwtService {
  static extractToken(req: Request): string | null {
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
    return token || null;
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    } catch {
      return null;
    }
  }
}
