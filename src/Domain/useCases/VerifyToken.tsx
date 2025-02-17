import { AuthRepository } from "../../Data/repositories/AuthRepository"
import { User } from "../entities/User"

const {verifyToken} = new(AuthRepository)

export const VerifyToken = async (token : string, username : string) : Promise<any> => {
    
    return await verifyToken(token, username)
}
