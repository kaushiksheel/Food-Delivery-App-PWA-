import React, { ComponentType, FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/Firebase';

export const ProtectedRoute:FC<{component:ComponentType}> = ({component:Component}) => {
    const navigate=useNavigate();
    useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(!user){
        navigate('/')
      }
    })
  },[]);
  return (
    <Component/>
  )
}
