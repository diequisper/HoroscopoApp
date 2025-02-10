import { User } from "../../Domain/entities/User";
import { BackendUser } from "../sources/remote/interface/NestBackInterface";

export class AuthMapper{
  static userToEntity(backUser : BackendUser) : User{
    return{
      id : backUser.uid,
      name : backUser.displayName,
      email : backUser.email,
      country : "",
      city : undefined,
      birthDate : new Date(),
      username : "",
      password : ""
    }
  }
}