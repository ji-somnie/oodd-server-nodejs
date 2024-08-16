import {Request, Response, NextFunction} from 'express';
import {JwtService} from '../domains/auth/JwtService';
import {UserService} from '../domains/user/userService';
const userService = new UserService();

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = JwtService.extractToken(req);

  console.log('token', token);

  if (!token) {
    return res.status(401).json({message: 'Access Token is missing or invalid'});
  }

  const decoded = JwtService.verifyToken(token);
  if (!decoded) {
    return res.status(403).json({message: 'Token is not valid'});
  }
  console.log('decoded', decoded);

  const user = await userService.getUserByUserId((decoded as any).id);
  console.log('user', user);

  if (!user) {
    return res.status(404).json({message: 'User not found'});
  }

  req.user = user;
  next();
};
