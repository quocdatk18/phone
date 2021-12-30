import {
    DownOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../images/logo/logo.png';
import { getCartItem } from '../../store/reducers/carts/CartSlice';
import { Logout, UserSelector } from '../../store/reducers/users/UserSlice';
import './Header.css';

export default function Header() {
    const dispach = useDispatch()
    const [showAccount, setShowAccount] = useState(false);
    const [showAccount2, setShowAccount2] = useState(false);
    const cartItems = useSelector(getCartItem);
    const user = useSelector(UserSelector)
    const amount = cartItems.reduce((a, b) => a + b.qty, 0);
    const dropDownRef = useRef(null)


    const handleClickOutSide = (e) => {
        if (dropDownRef.current !== null && !dropDownRef.current.contains(e.target)) {
            setShowAccount2(false)
            setShowAccount(false)
        }
    }
    const handleSignout = () => {
        dispach(Logout())
        window.location.reload()
    };

    useEffect(() => {
        window.document.addEventListener("mousedown", (e) => {
            handleClickOutSide(e)
        })
        return () => {
            window.document.removeEventListener("mousedown", (e) => {
                handleClickOutSide(e)
            })
        }
    }, [setShowAccount, setShowAccount2])

    return (
        <>
            <div className="top-header">
                <div className="wrap">
                    <div className="logo">
                        <Link to="/"><img src={logo} title="logo" alt="logo" /></Link>
                    </div>
                    <div className="top-nav">
                        <ul className="menu-list" >
                            <li className="active">
                                <Link to="/"> Trang Chủ </Link>
                            </li>
                            <li>
                                <Link to="/products"> Sản Phẩm </Link>
                            </li>
                            {user ? (
                                <li onClick={() => setShowAccount2(!showAccount2)}>
                                    <Link to="#">
                                        {user.name}
                                        <DownOutlined style={{ fontSize: "14px" }} />
                                    </Link>

                                    <div ref={dropDownRef} className={`menu-drop ${showAccount2 ? "" : "hidden"}`}>
                                        {user.isAdmin ? <Link className="black" to="/admin">Admin</Link> : ""}
                                        <Link className="black" to="/myOrder">Đơn hàng</Link>
                                        <Link className="black" to="#" onClick={handleSignout}>Đăng xuất</Link>
                                    </div>


                                </li>
                            ) : (
                                <li onClick={() => setShowAccount(!showAccount)}>
                                    <Link to="#">
                                        Tài khoản
                                        <DownOutlined style={{ fontSize: "14px" }} />
                                    </Link>


                                    <div ref={dropDownRef} className={`menu-drop ${showAccount ? "" : "hidden"}`}>
                                        <Link className="black" to="/register">Đăng kí</Link>
                                        <Link className="black" to="/login">Đăng nhập</Link>
                                    </div>

                                </li>
                            )}
                            <li className="shop-cart">
                                <Link to="/cart" className="shop-cart">
                                    <ShoppingCartOutlined
                                        style={{ fontSize: "30px" }}
                                    ></ShoppingCartOutlined>
                                    <span className="count"> {amount} </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="clear"> </div>
                </div>
            </div>
        </>
    )
}
