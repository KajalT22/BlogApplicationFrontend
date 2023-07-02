import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import {isLoggedIn } from '../services/auth';

const PrivateRoute= ()=> {
   /* user-dashboard content visible bcoz of outlet */
   //if user is loggin then only display user-dashboard content else navigate to login page
    if(isLoggedIn()){
        return <Outlet/>
    }else{
        return <Navigate to={"/login"} />
    }
}

export default PrivateRoute
