import { Repository } from "typeorm";
import { myDataBase } from "../data-source";
import { User } from "../entities/userEntity";

<<<<<<< HEAD
export const userRepository: Repository<User> =
=======
export const UserRepository: Repository<User> =
>>>>>>> feat/oodd-11
  myDataBase.getRepository(User);
