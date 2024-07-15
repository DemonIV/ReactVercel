import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';
import axios from 'axios';

export const AuthContext = createContext();


//AXIOS INTERCEPTORS
let isRefreshing=false;
let refreshQueue = [];
const processQueue = (error, token = null) => {
    refreshQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
  
    refreshQueue = [];
  };

//AXIOS INTERCEPTORS  

export function AuthProvider({ children }) {

    //States
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    const [error,setError]=useState(null);

    //Handlers: Çıkış Yap
    const handleSignOut = async () => {
        try{
          const response = await axios.post(process.env.REACT_APP_API_DOMAIN+'/token/revoke', {
            refreshToken
            }, {
                withCredentials: true  // Özel gereksinimlerinizi burada ekleyebilirsiniz
              });
              console.warn("Revoke Response:",response);
        }catch(err)
        {
          console.error(err);
        }
        setUser(null);
        setAccessToken("");
        setRefreshToken("");
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
       
    };
    const getNewAccessToken=async () => {
        try {
            if(!refreshToken) throw new Error("Refresh token is not found!");

            const response = await axios.post(process.env.REACT_APP_API_DOMAIN+'/api/token/refresh', {
            refreshToken
            }, {
                withCredentials: true  // Özel gereksinimlerinizi burada ekleyebilirsiniz
              });

            const newAccessToken = response.data.accessToken;
            console.log("NEWTOKEEEN",newAccessToken);
            localStorage.setItem('accessToken', newAccessToken);
            setAccessToken(newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error('Token refresh failed:', error);
            setError('Token refresh failed.');
            handleSignOut();
            throw error;
        }
    };
    

    //Hooks: Değerlerin depolama koruması
    useEffect(() => {

        const localUser = localStorage.getItem('user');
        const localAccessToken = localStorage.getItem('accessToken');
        const localRefreshToken = localStorage.getItem('refreshToken');

        //User: Local<->State
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else if (localUser) setUser(JSON.parse(localUser));

        //accessToken: Local<->State
        if (accessToken) localStorage.setItem('accessToken', accessToken);
        else if (localAccessToken) setAccessToken(localAccessToken);

        //refreshToken: Local<->State
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
        else if (localRefreshToken) setRefreshToken(localRefreshToken);

        
    }, [user,accessToken,refreshToken]);


    useEffect(()=>{
        const reqIn=api.interceptors.request.use(
            (config) => {
              const accessToken = localStorage.getItem('accessToken');
              console.log("req with bearer",config);
              if (accessToken) {
                config.headers.set('Authorization',`Bearer ${accessToken}`);
              }
              return config;
            },
            (error) => {
                console.warn("reqerr",error);
              return Promise.reject(error);
            }
          );
        
          const resIn=api.interceptors.response.use(
            (response) => response,
            async (error) => {
              const originalRequest = error.config;
                console.warn("reserr",error);
              if (error.response.status === 401 && !originalRequest._retry) {
                if (!isRefreshing) {
                  isRefreshing = true;
                  originalRequest._retry = true;
                  try {
                    const newAccessToken = await getNewAccessToken();
                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    processQueue(null, newAccessToken);
                    isRefreshing = false;
                    return api(originalRequest);
                  } catch (err) {
                    processQueue(err, null);
                    isRefreshing = false;
                    handleSignOut();
                    return Promise.reject(err);
                  }
                }
        
                return new Promise((resolve, reject) => {
                  refreshQueue.push((token) => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    resolve(api(originalRequest));
                  });
                });
              }
        
              return Promise.reject(error);
            }
          );
          return ()=>{
            api.interceptors.request?.eject(reqIn);
            api.interceptors.respond?.eject(resIn);
          } 
    },[api])


    return (
        <AuthContext.Provider value={{ user, accessToken, refreshToken, setAccessToken, setRefreshToken, setUser, handleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
