import { Repository } from "typeorm";
import myDataBase from "../data-source";
import { User } from "../entities/userEntity";

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, myDataBase.manager);
  }
}
