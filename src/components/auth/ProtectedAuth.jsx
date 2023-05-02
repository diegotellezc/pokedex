import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedAuth = () => {

    const nameTrainer = useSelector((store) => store.nameTrainer)

    if(nameTrainer) {
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }

    return (
        <div>
        
        </div>
    )
}

export default ProtectedAuth
