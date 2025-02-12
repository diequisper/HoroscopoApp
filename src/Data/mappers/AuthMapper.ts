import { User } from "../../Domain/entities/User";
import { BackendUser } from "../sources/remote/interface/NestBackInterface";

export class AuthMapper{
  static userToEntity(backUser : BackendUser) : User{
    return{
      id : backUser.id,
      name : backUser.name,
      country : backUser.country,
      city : backUser.city,
      birthDate : new Date(backUser.birthDate),
      timeBirth: new Date(backUser.timeBirth),
      username : backUser.username,
      email : backUser.email,
      password : backUser.password
    }
  }
}