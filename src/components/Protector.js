import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protector({user}) {
    if(user){
        return (
            <>
                <Outlet />
            </>
        )
    }else{
        return <Navigate to={'/login'}/>
    }
}
