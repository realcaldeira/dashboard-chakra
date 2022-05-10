import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

let cookies = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export const apiAuth = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['dashgo.token']}`
  }
})

api.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  if (error.response.status === 401){
    if(error.response.data?.code === 'token.expired'){
      // renova token
      cookies = parseCookies();

      const { 'dashgo.refrashToken' : refreshToken } = cookies;

      api.post('/refresh', {
        refreshToken,
      }).then(response => {
        const { token } = response.data;

        setCookie(undefined, 'dashgo.token', token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        })
        setCookie(undefined, 'dashgo.refreshToken', response.data.refrashToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`; 
      })
    }else {
      // desloga o usuário
    }
  }
})