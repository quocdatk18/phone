import React, { useEffect, useRef, useState } from 'react';
import { formatPrice } from '../../untils';
import './ShoppingCart.css'
import './Cart.css'
import ListProduct from './ListProduct'
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useNavigate
} from "react-router-dom";
import { getCartItem, setSalePercent } from '../../store/reducers/carts/CartSlice';
import Cartnone from './Cartnone';
import { Button, Modal } from 'antd';
const vouchers = [
  { name: "giam20", percent: 20 }, { name: "giam25", percent: 25 }, { name: "giam30", percent: 30 }
]
function Cart(props) {
  const [visible, setVisible] = useState(false)
  const cartItems = useSelector(getCartItem);
  const navigate = useNavigate()
  console.log(navigate.prototype)
  const [totalPrice, setTotalPrice] = useState(0)
  const oldTotalPrice = useRef(0)
  const dispatch = useDispatch()
  const totalSale = useRef(null)
  const { salePercent } = useSelector(state => state.CartReducer)

  const handleOk = () => {
    navigate('/order')
  }

  const handleCancel = () => {
    setVisible(false)
  }
  const handleOpen = (e) => {
    e.preventDefault()
    setVisible(true)
  }
  const [sale, setSale] = useState('')



  const Sale = () => {
    const voucher = vouchers.find(voucher => voucher.name === sale)
    if (voucher) {
      totalSale.current = totalPrice * voucher.percent / 100;      // alert('đã giảm')
      dispatch(setSalePercent(voucher.percent))
      setTotalPrice(totalPrice - ((totalPrice) * voucher.percent / 100));
    } else {
      alert('mã không hợp lệ')
    }

  }



  useEffect(() => {
    const prices = cartItems.reduce(
      (total, item) => total + item.qty * item.price,
      0
    )
    oldTotalPrice.current = prices
    if (salePercent === 0) {
      totalSale.current = 0;
      return setTotalPrice(prices)
    }
    totalSale.current = ((prices) * salePercent / 100)
    return setTotalPrice(prices - ((prices) * salePercent / 100))
  }, [cartItems, salePercent])



  return (
    <section id="shopping-cart">
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          <Link to="/" className="back">
            {/* <BsChevronDoubleLeft></BsChevronDoubleLeft> */}
            Tiếp tục mua hàng
          </Link>
          <h2 className="shopping-cart-title">Giỏ hàng</h2>
        </div>

        {cartItems.length === 0 ? (<Cartnone />) : (<ListProduct products={cartItems}></ListProduct>)}
        <div className={cartItems.length === 0 ? 'hidden' : ''}>
          <div className="total-price">
            <span className="left">Tổng tiền</span>
            <span className="right">{formatPrice(oldTotalPrice.current)}</span>
          </div>

          <div className="total-price">
            <input className="inputVoucher" readOnly={totalSale.current !== 0} type="text" onChange={(e) => setSale(e.target.value)} />
            <Button className="voucher" onClick={Sale}>Áp mã</Button>
            <Button className="voucher" onClick={() => dispatch(setSalePercent(0))}>Huỷ áp dụng</Button>

          </div>
          <p className="right"> giảm  {totalSale.current}</p>
          <div className="total-price">
            <span className="left">Tổng tiền phải thanh toán</span>
            <span className="right">{formatPrice(totalPrice)}</span>
          </div>
        </div>
        {totalPrice <= 0 ? (
          ""
        ) : (
          <div className="order">
            <Link to="#" onClick={handleOpen}> Đặt Hàng </Link>
          </div>
        )}
      </div>

      <Modal
        visible={visible}
        title="Payment"

        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay lại
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Thanh toán
          </Button>,

        ]}
      >
        <span style={{ marginLeft: "100px" }}>Bạn muốn chuyển đến trang thanh toán ?</span>
      </Modal>

    </section>
  );


}

export default Cart;
