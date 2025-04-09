import { User } from "../../Domain/entities/User";
import { IAuthRepository } from "../../Domain/repositories/IAuthRepository";
import { NestBack } from "../sources/remote/api/NestBack";
import auth from "@react-native-firebase/auth"

export class AuthRepository implements IAuthRepository{

  async registrar(name: string, birthDate: Date, country: string, username: string, password: string, 
    email : string, timeBirth?: Date, city?: string): Promise<User | undefined> {
    try {
      const url = "/auth/registrar"
      const userData = {
        createAuthDto: {
          email: email,
          username: username,
          password: password
        },
        name: name,
        birthDate: birthDate.toISOString(),
        country: country,
        timeBirth: timeBirth ? timeBirth.toISOString() : undefined,
        city: city
      };
      const response = await NestBack.post<User>(url, userData)
      console.log(response.data)
      return response.data
    } catch (error : any) {
      console.log(error)
      throw new Error(error.response?.data?.message || error.message)
    }
  }

  async loginUser(username : string, password : string): Promise<string> {
    try {
      const url = "/auth/login"
      const {data} = await NestBack.post<{ email: string }>(url, { username: username.trim()})
      
      const authCred = await auth().signInWithEmailAndPassword(data.email, password);
      const idToken = await authCred.user.getIdToken()
      console.log("token: ", idToken)
      return idToken;
    } catch (error : any) {
      console.log(error)
      console.log("error en loginUser")
      throw new Error(error.response?.data?.message || error.message)
    }
  }
  
  async verifyToken(token : string, username: string): Promise<User> {
    try {
      const url = "/auth/verifyAuth"
      const inputData = {
        token : token,
        username: username
      };
      const {data} = await NestBack.post<User>(url, inputData)
      return data;
    } catch (error : any) {
      console.log("error en verificacion")
      throw new Error(error.response?.data?.message || error.message)
    }
  }

  async askGemini(prompt: string): Promise<string> {
    try {
      const url = "/auth/askGemini";
      const { data } = await NestBack.post<{ response: string }>(url, { prompt });

      if (typeof data.response === 'string') {
        return data.response;
      } else {
        console.log('Unexpected response format');
        return 'Unexpected response format';
      }
    } catch (error: any) {
      console.error('Error in Gemini API:', error);
      throw new Error(error.response?.data?.message || error.message || 'Unknown error occurred');
    }
  }

}