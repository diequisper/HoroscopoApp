import { AuthStatus } from '../../Domain/entities/AuthState'
import { User } from '../../Domain/entities/User'
import { create } from 'zustand'
import { LoginUseCase } from '../../Domain/useCases/LoginUseCase'
import { VerifyToken } from '../../Domain/useCases/VerifyToken'
import { StorageAdapter } from '../../Data/sources/local/LocalStorage'

export interface AuthState{
  status : AuthStatus,
  token ?: string,
  user ?: User

  login : (username : string, password : string) => Promise<any>
  verify : () => Promise<User | undefined>
  logout : () => void
}

export const UseAuthStore = create<AuthState>()((set, get) => ({
  status : 'checking',
  token : undefined,
  user : undefined,

  login : async (username : string, password : string) : Promise<string> =>{
     const resp = await LoginUseCase(username, password)
     if(!resp){
      set({status : "unauthenticated", token : undefined, user : undefined})
      return resp
     }
     await StorageAdapter.setItem('token', resp)
     await StorageAdapter.setItem('username', username)
    return resp;
  },

  verify : async () : Promise<User | undefined> =>{
    const token = await StorageAdapter.getItem('token') ?? ""
    const username = await StorageAdapter.getItem('username') ?? ""

    if(token === "" || username === ""){
      set({status : "unauthenticated", token : undefined, user : undefined})
      return undefined;
    }

    const resp = await VerifyToken(token, username)
    
    if(!resp){
     set({status : "unauthenticated", token : undefined, user : undefined})
     return resp
    }
    set({status : "authenticated", token : token, user : resp})
    return resp;
  },

  logout : async () =>{
    await StorageAdapter.removeItem('token')
    await StorageAdapter.removeItem('username')
    set({status : "unauthenticated", token : undefined, user : undefined})
  }
}))
