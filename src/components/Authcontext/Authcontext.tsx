import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, type PropsWithChildren } from "react";

interface UserData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  age: number;
}

interface AuthContextType {
  loginData: UserData | null;
  saveLoginData: () => void;
}

export let AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider(props:PropsWithChildren){
    let [loginData,setLoginData] =useState<UserData | null>(null);
    const saveLoginData = ()=>{
     let encodedToken = localStorage.getItem('token');
     let decodedToken = jwtDecode(encodedToken);
     setLoginData(decodedToken)
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            saveLoginData()
        }
            
    },[])
    return <AuthContext.Provider value={{saveLoginData,loginData}}>
     {props.children}
    </AuthContext.Provider>
}
