import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../context/AuthContext';


let isRefreshing = false;
let failedRequestQueue = [];

export function setupAPIClient(ctx = undefined){
  let cookies = parseCookies(ctx)

   const api = axios.create({
    baseURL: 'http://localhost:3000/api'
  })
  
   const apiAuth = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['dashgo.token']}`
    }
  })
  
  apiAuth.interceptors.response.use(response => {
    return response;
    
  }, (error: AxiosError) => {
    console.log(error)
    if (error.response.status === 401){
      if(error.response.data?.code === 'token.expired'){
        // renova token
        cookies = parseCookies(ctx);
  
        const { 'dashgo.refreshToken' : refreshToken } = cookies;
        const originalConfig = error.config;
  
        
        console.log('refreshToken', refreshToken)
  
        if(!isRefreshing){
          isRefreshing = true
          
          apiAuth.post('/refresh', {
            refreshToken,
          }).then(response => {
            const {token} = response.data;
    
            setCookie(ctx, 'dashgo.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            })
            setCookie(ctx, 'dashgo.refreshToken', response?.data.refrashToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            })
    
            apiAuth.defaults.headers['Authorization'] = `Bearer ${token}`; 
  
            failedRequestQueue.forEach(request => request.onSuccess(token));
            failedRequestQueue = [];
          }).catch(err => {
            if(process.browser){
              signOut()
            }
          }).finally(() => {
            isRefreshing = false;
          });
        }
  
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`
  
              resolve(apiAuth(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      }else {
        // desloga o usuário
        if(process.browser){
          signOut()
        }
      }
    }
  
    return Promise.reject(error)
  });

  return apiAuth;
}