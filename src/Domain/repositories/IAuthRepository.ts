import { User } from "../entities/User"
export interface IAuthRepository{

  registrar(name : string, birthDate : Date, country : string, username : string, password : string, email : string,
    timeBirth ?: Date, city ?: string) : Promise<User | undefined>

  loginCheck(username : string, token : string) : Promise<User>

  login(username : string, password : string) : Promise<string> //returns token

}