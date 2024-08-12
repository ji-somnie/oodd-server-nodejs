import { User } from '../entities/UserEntity';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
