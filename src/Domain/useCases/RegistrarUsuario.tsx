import { AuthRepository } from "../../Data/repositories/AuthRepository"
import { User } from "../entities/User"

const {registrar} = new(AuthRepository)

export const RegistrarUsuario = async (name: string, birthDate: Date, country: string,
  username: string, password: string, email : string, timeBirth?: Date, city?: string) : Promise<User | undefined> => {
    
    return await registrar(name, birthDate, country, username, password, email, timeBirth, city)

}