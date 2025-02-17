import { AuthRepository } from "../../Data/repositories/AuthRepository"

const {loginUser} = new(AuthRepository)

export const LoginUseCase = async (username: string, password : string) : Promise<string> => {
    
    return await loginUser(username, password)

}