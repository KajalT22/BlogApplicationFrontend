import axios from 'axios';
import {getToken} from '../services/auth'

//export const BASE_URL='http://localhost:8080';
//export const BASE_URL='http://139.59.15.236:9292';
export const BASE_URL='https://apis.swagblogs.online';
//axios provider
export const myAxios=axios.create({
    baseURL:BASE_URL
});

//as we give security user cannot directly /create anything unless he is loggedin for that we have to send token in the header with key as Authorization then only user can post

export const privateAxios=axios.create({
    baseURL:BASE_URL
})

privateAxios.interceptors.request.use(config=>{
    const token = getToken()
    
    if(token){
        config.headers.common.Authorization= `Bearer ${token}`
    }
    return config;
}, error=>Promise.reject(error))