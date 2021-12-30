import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import { GetAllOrderPenddingserver, GetAllOrderShippingserver, myOrderShipping, myOrdersPendding, } from '../../store/reducers/orders/OrderSlice';
import { UserSelector } from '../../store/reducers/users/UserSlice';
export default function MenuOrder() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(UserSelector)
  const myOrdersShipping = useSelector(myOrderShipping)
  const myOrdersPendding = useSelector(state => state.OrderReducer.myOrdersPendding)
  useEffect(() => {
    const getAllOrderPenddingAndShippingByUser = () => {
      dispatch(GetAllOrderPenddingserver(user._id));
      dispatch(GetAllOrderShippingserver(user._id));

    };

    user && getAllOrderPenddingAndShippingByUser();
  }, [dispatch, user]);
  return (
    <div className="myorder-menu">
      <div className={window.location.pathname === '/myOrder' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to={'/myOrder'}>Tất cả</Link>
      </div>
      <div className={window.location.pathname === '/myOrder/pendding' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to="/myOrder/pendding">Chờ xử lí</Link>
        {myOrdersPendding ? (
          <div className="myorder-menu-item-newPendding">
            {myOrdersPendding.length}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={window.location.pathname === '/myOrder/shipping' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to="/myOrder/shipping">Đang giao</Link>
        {myOrdersShipping ? (
          <div className="myorder-menu-item-newShipping">
            {myOrdersShipping.length}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={window.location.pathname === '/myOrder/paid' ? 'myorder-menu-item active' : 'myorder-menu-item'}>
        <Link to="/myOrder/paid">Đã giao</Link>
      </div>
    </div>
  );
}
