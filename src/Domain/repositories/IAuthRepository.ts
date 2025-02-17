import { User } from "../entities/User"
export interface IAuthRepository{

  registrar(name : string, birthDate : Date, country : string, username : string, password : string, email : string,
    timeBirth ?: Date, city ?: string) : Promise<User | undefined>

  loginUser(email : string, password : string) : Promise<string>

  verifyToken(token : string, username : string) : Promise<User>

  askGemini(prompt : string) : Promise<string>

}