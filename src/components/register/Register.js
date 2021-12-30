import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RegisterAcc } from '../../store/reducers/users/UserSlice';
import './Register.css';


export default function Register() {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { register, handleSubmit, } = useForm()
    const onSubmit = data => {
        if (password === confirmPassword) {
            dispatch(RegisterAcc(data))

        } else {
            alert("mật khẩu không trùng khớp")
        }
    }
    return (
        <div className="body">
            <div className="login">
                <h2> Đăng kí </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form-login">
                    <input
                        {...register("name")}

                        type="text"
                        required
                        placeholder="vui lòng nhập tên"
                    ></input>
                    <input {...register("email")} type="email" placeholder="vui lòng nhập email" required></input>


                    <input
                        {...register("password")}

                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="vui lòng nhập password"
                    ></input>
                    <input
                        {...register("comfirm password")}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        required
                        placeholder="vui lòng nhập lại password"
                    ></input>



                    <input type="submit" value="Đăng Kí"></input>
                    {/* {error ? <h2>{error}</h2> : <>1</>} */}
                    <Link to="/login">Đã có tài khoản?</Link>
                </form>
            </div>
        </div>
    )
}
