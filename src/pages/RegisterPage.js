import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Register from '../components/register/Register'
import { useSelector } from 'react-redux'
import { UserSelector } from '../store/reducers/users/UserSlice'

export default function RegisterPage() {
    const navigate = useNavigate()
    const user = useSelector(UserSelector)


    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])
    return (
        <div>
            <Register />
        </div>
    )
}
