import Router from 'next/router';
import { setCookie } from 'nookies';
import { createContext, ReactNode, useState } from 'react';
import { apiAuth } from '../services/api';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;

  async function signIn({ email, password }){
    try {
      const response = await apiAuth.post('',{
        email,
        password,
      })

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, 'dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
  
      setUser({
        email,
        permissions,
        roles
      });

      Router.push('/dashboard')

      console.log(response.data)
    } catch(err){
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, isAuthenticated, user }}
    >
      { children }
    </AuthContext.Provider>
  )
}