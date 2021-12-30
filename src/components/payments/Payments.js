import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateOrder, OrderInfo } from '../../store/reducers/orders/OrderSlice';
import CheckOut from '../checkout/CheckOut';
import './Payments.css';

const optionsPayment = [{ value: "Tiền mặt" }, { value: "Paypal" }]

export default function Payments() {
    const orderInfo = useSelector(OrderInfo)
    console.log(orderInfo)
    const { salePercent } = useSelector(state => state.CartReducer)
    const navigate = useNavigate()
    const btnSubmit = useRef()

    const dispatch = useDispatch()
    const submitHandler = async (e,) => {
        e.preventDefault()

        if (paymentMethod !== 'payOnline') {
            SendOrderPayLater();
            navigate('/ordersuccess')
        }


    }
    const [paymentMethod, setPaymentMethod] = useState('Tiền mặt');

    const SendOrderPayLater = async () => {
        const OrderPaid = {
            ...orderInfo,
            status: "pendding",
            paymentMethod: "payLater",
            salePercent
        };
        console.log(OrderPaid)
        await dispatch(CreateOrder(OrderPaid))

    };
    const SendOrderPaypal = async () => {
        const OrderPaid = {
            ...orderInfo,
            status: "shipping",
            salePercent,
            paymentMethod: "paypal",
        };

        await dispatch(CreateOrder(OrderPaid))
        navigate('/ordersuccess')


    };
    const [sdkReady, setSdkReady] = useState(false);
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get(
                "http://localhost:5000/api/config/paypal"
            );
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);

            addPayPalScript();
        };
    }, [sdkReady]);

    return (
        <div>
            <CheckOut step1 step2 step3 />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Xin vui lòng chọn phương thức thanh toán</h1>
                </div>
                {optionsPayment.map((v, index) => (
                    <div key={index}>
                        <div>
                            <input
                                style={{ cursor: 'pointer' }}
                                type="radio"
                                checked={v.value === paymentMethod}
                                value={v.value}
                                name="paymentMethod"
                                required
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setPaymentMethod(e.target.value)
                                }}
                            ></input>
                            <label >{v.value}</label>
                        </div>
                    </div>
                ))}

                <div>
                    <label />
                    <button className="primary" type="submit" ref={btnSubmit}>
                        Tiếp tục
                    </button>

                    <div className={paymentMethod === 'Paypal' ? '' : 'hidden'} style={{ marginTop: '20px' }}>
                        <PayPalButton
                            className="paypal-btn"
                            style={{ color: "white", marginTop: '16px' }}
                            amount={Math.floor(orderInfo?.totalPrice / 23000)}
                            onSuccess={SendOrderPaypal}
                        ></PayPalButton>
                    </div>
                </div>
            </form>

        </div>
    )
}
