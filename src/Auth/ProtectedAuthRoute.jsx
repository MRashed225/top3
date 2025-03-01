import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from './../Contexts/AuthContext';

export default function ProtectedAuthRoute({children}) {
    const {isLoggedIn}=useContext(authContext);
  return (
    <div>
        {!isLoggedIn ? children:<Navigate to={"/"}/>}
    </div>
  )
}
