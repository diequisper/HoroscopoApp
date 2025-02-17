import { User } from "../../Domain/entities/User";
import { BackendUser } from "../sources/remote/interface/NestBackInterface";

export class AuthMapper{
  static userToEntity(backUser : BackendUser) : User{
    return{
      id : "",
      name : "",
      country : "",
      city : "",
      birthDate : new Date(),
      timeBirth: new Date(),
      username : "",
      email : "",
      password : ""
    }
  }
}