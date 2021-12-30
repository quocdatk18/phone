import React, { useEffect } from 'react'
import Login from '../components/login/Login'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserSelector } from '../store/reducers/users/UserSlice'

export default function LoginPage() {
    const navigate = useNavigate()
    const user = useSelector(UserSelector)


    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <>
            <Login />
        </>
    )
}
