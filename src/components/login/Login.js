
import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoading } from '../../store/reducers/global/loading';
import { LoginAcc } from '../../store/reducers/users/UserSlice';
import './Login.css';

export default function Login() {
    const dispatch = useDispatch()


    const {
        register,
        handleSubmit,
    } = useForm();
    // const navigate = useNavigate();
    const onSubmit = async (data, e) => {
        e.preventDefault();
        dispatch(setLoading(true))

        await dispatch(LoginAcc(data));

        dispatch(setLoading(false))

    };


    return (
        <div className="body">
            <div className="login">
                <h2> ĐĂNG NHẬP</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form-login">

                    <input {...register("email")} placeholder="vui lòng nhập email" type="email" required></input>


                    <input
                        {...register("password")}

                        type="password"
                        required
                        placeholder="vui lòng nhập password"
                    ></input>

                    <input type="submit" value="Đăng Nhập"></input>
                    {/* {error ? <h2>{error}</h2> : <>1</>} */}
                    <Link to="/register">Tạo tài khoản?</Link>
                </form>
            </div>
        </div>
    )
}
