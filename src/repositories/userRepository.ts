import { Repository } from "typeorm";
import { myDataBase } from "../data-source";
import { User } from "../entities/userEntity";

export const userRepository: Repository<User> =
  myDataBase.getRepository(User);

  declare namespace Express {
    export interface Request {
      user?: {
        id: number;
      };
    }
  }
  