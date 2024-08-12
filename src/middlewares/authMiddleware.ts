import {Request, Response, NextFunction} from 'express';
import {JwtService} from '../domains/auth/JwtService';
import {User} from '../entities/userEntity';
import dataSource from '../data-source';

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = JwtService.extractToken(req);

  if (!token) {
    return res.status(401).json({message: 'Access Token is missing or invalid'});
  }

  const decoded = JwtService.verifyToken(token);
  if (!decoded) {
    return res.status(403).json({message: 'Token is not valid'});
  }

  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({where: {id: (decoded as any).id, status: 'activated'}});

  if (!user) {
    return res.status(404).json({message: 'User not found'});
  }

  req.user = user;
  next();
};
