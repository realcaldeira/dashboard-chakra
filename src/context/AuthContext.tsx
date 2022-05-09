import { createContext, ReactNode } from 'react';
import { apiAuth } from '../services/api';

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
  const isAuthenticated = false;

  async function signIn({ email, password }){
    try {
      const response = await apiAuth.post('',{
        email,
        password,
      })
  
      console.log(response.data)
    } catch(err){
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, isAuthenticated }}
    >
      { children }
    </AuthContext.Provider>
  )
}