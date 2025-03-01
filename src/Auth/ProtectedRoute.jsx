import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../Contexts/AuthContext'
import Login from '../Pages/Login/Login'

export default function ProtectedRoute({children}) {
const {isLoggedIn}=useContext(authContext)
    return (
        <div>
   
    {isLoggedIn?children:<Login/>}
    </div>
    
  )
}
