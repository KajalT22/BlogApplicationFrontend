import {myAxios} from './helper';

export const signUpUsingAxios=(user)=>{
    //whenevr we use this promice in that callback we get this response.data
    return myAxios.post('/api/auth/register',user).then( (response)=>response.data);
}

export const loginUsingAxios=(loginDetail)=>{
    
    return myAxios.post('/api/auth/login',loginDetail).then( (response)=>response.data);
}