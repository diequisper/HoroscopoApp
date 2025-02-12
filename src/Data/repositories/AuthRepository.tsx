import { User } from "../../Domain/entities/User";
import { IAuthRepository } from "../../Domain/repositories/IAuthRepository";
import { AuthMapper } from "../mappers/AuthMapper";
import { NestBack } from "../sources/remote/api/NestBack";
import { BackendUser } from "../sources/remote/interface/NestBackInterface";

export class AuthRepository implements IAuthRepository{

  async registrar(name: string, birthDate: Date, country: string, username: string, password: string, email : string, timeBirth?: Date, city?: string): Promise<User | undefined> {
    try {
      const url = "/auth/registrar"
      const userData = {
        "name": name,
        "birthDate": birthDate,
        "timeBirth": timeBirth,
        "country": country,
        "city": city,
        "email" : email,
        "username": username, 
        "password": password, 
      }
      const response = await NestBack.post<BackendUser>(url, userData)
      console.log(response.data)
      return AuthMapper.userToEntity(response.data);
    } catch (error : any) {
      console.log(error)
      throw new Error(error.response?.data?.message || error.message)
    }
  }

  loginCheck(username: string, token: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  login(username: string, password: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  
}