import { Repository } from "typeorm";
import myDataBase from "../data-source";
import { User } from "../entities/userEntity";

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, myDataBase.manager);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 5c2174347355e87eab018b969e44cd925a77a734
