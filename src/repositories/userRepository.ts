import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/userEntity";

export const userRepository: Repository<User> =
  AppDataSource.getRepository(User);
