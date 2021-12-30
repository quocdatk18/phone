import React from 'react'
import "./CheckOut.css"
export default function CheckOut(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Đăng nhập</div>
            <div className={props.step2 ? 'active' : ''}>Nhập thông tin giao hàng</div>
            <div className={props.step3 ? 'active' : ''}>Chọn phương thức thanh toán</div>
            <div className={props.step4 ? 'active' : ''}>Đặt hàng</div>

        </div>
    )
}
