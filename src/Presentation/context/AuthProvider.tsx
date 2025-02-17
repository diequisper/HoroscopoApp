
import { PropsWithChildren, useEffect } from "react"
import { RootStackParams } from "../routes/StackNavigation"
import { UseAuthStore } from "../hooks/UseAuthStore"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"


export const AuthProvider = ({children} : PropsWithChildren) => {
  
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const {verify, status} = UseAuthStore()

  useEffect(() => {
      verify();
  }, [])

  useEffect(() => {
    if(status !== 'checking'){
      if(status === "authenticated"){
        navigation.reset({
          index : 0,
          routes : [{name : "Home"}]
        })
      }
    }else{
      navigation.reset({
        index : 0,
        routes : [{name : 'Login'}]
      })
    }
  }, [status])

  return (
    <>{children}</>
  )
}
