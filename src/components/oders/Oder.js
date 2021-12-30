import { Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getCartItem } from '../../store/reducers/carts/CartSlice';
import { orderInfo } from '../../store/reducers/orders/OrderSlice';
import { UserSelector } from '../../store/reducers/users/UserSlice';
import CheckOut from '../checkout/CheckOut';
import './Order.css';


export default function Oder(props) {

    const [fullname, setFullname] = useState('')
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])
    const [villages, setVillages] = useState([])
    const [town, setTown] = useState('')
    const city = useRef("")
    const district = useRef("")
    const village = useRef("")
    const dispatch = useDispatch()
    const user = useSelector(UserSelector)

    async function handleChange(e) {

        const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${e.target.value}`)
        setDistricts(res.data.results)
        setVillages([])
    }
    const handleOnchangeDis = async (e) => {

        const res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${e.target.value}`)
        setVillages(res.data.results)
    }
    useEffect(() => {
        const getCitys = async () => {
            const res = await axios.get("https://vapi.vnappmob.com/api/province/")

            setCities(res.data.results)
        }
        getCitys()
    }, [])
    const cartItems = useSelector(getCartItem)

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.qty * item.salePrice,
        0
    );
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (!user) {
            return navigate('/login')
        } else {
            navigate('/payment')
        }
        if (!city.current.value || !district.current.value || !village.current.value) return alert("loi")
        const cityCurr = cities.find(c => c.province_id === city.current.value)
        const districtCurr = districts.find(d => d.district_id === district.current.value)
        const wardCurr = villages.find(w => w.ward_id === village.current.value)
        const Order = {
            fullname,
            shippingAddress: {
                city: cityCurr.province_name,
                district: districtCurr.district_name,
                town, village: wardCurr.ward_name,
            },
            totalPrice,
            orderItems: [...cartItems],
            user: user,
            name: user.name
        }


        dispatch(orderInfo(Order))


    }


    return (
        <div>
            <CheckOut step1 step2 ></CheckOut>
            <form onSubmit={submitHandler}>

                <div className="w-50 center">
                    <div className="group">
                        <label>Họ và tên</label>
                        <Input required onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className="group">
                        <label>Tỉnh / Thành Phố</label>
                        <select className="custom-select" style={{ cursor: "pointer", height: '30px' }} onChange={handleChange} defaultValue="" ref={city} required>
                            <option value="" disabled>Vui lòng chọn city</option>
                            {
                                cities.map((city, index) => (

                                    <option key={index} value={city.province_id}>{city.province_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="group">
                        <label>Quận / Huyện</label>
                        <select className="custom-select" style={{ cursor: "pointer", height: '30px' }} onChange={handleOnchangeDis} defaultValue="" ref={district} required>
                            <option value="" disabled>Vui lòng chọn quận</option>

                            {
                                districts && districts.map((dis, index) => (

                                    <option key={index} value={dis.district_id}>{dis.district_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="group">
                        <label>Phường/Xã</label>
                        <select className="custom-select" style={{ cursor: "pointer", height: '30px' }} ref={village} defaultValue="" required >
                            <option value="" disabled>Vui lòng chọn phường</option>
                            {
                                villages.map((vil, index) => (

                                    <option key={index} value={vil.ward_id}>{vil.ward_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="group">

                        <label>Số nhà/Tên đường</label>
                        <Input required onChange={(e) => setTown(e.target.value)} />

                    </div>
                </div>
                <button className="btn btn-info" style={{ marginTop: "100px", fontSize: '30px', borderRadius: '10px' }} type="submit">Giao hàng</button>
            </form >
            <div className="input-group mb-3">

            </div>

        </div >
    );
}