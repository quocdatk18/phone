import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrderserver, GetAllOrderUserserver, myOrders } from "../../../../store/reducers/orders/OrderSlice";
import { UserSelector } from "../../../../store/reducers/users/UserSlice";
import { formatPrice } from '../../../../untils/index'
import "./AllOrder.css";

const orderItem = (item) => (
  <div key={item._id} className="all-myorder-item">
    <div className="all-myorder-item-img">
      <img src={item.image}></img>
    </div>
    <div className="all-myorder-item-name">
      <p>{item.name}</p>
      <span>x{item.qty}</span>
    </div>
    <div className="all-myorder-item-price">{formatPrice(item.salePrice)}</div>
  </div>
);

export const orderParent = (item) => (
  <div key={item._id} className="all-myorder-parent-item">
    <div className="all-myorder-list">
      {item.orderItems.map((item) => orderItem(item))}
    </div>
    <div className="all-myorder-item-totalprice">
      <div>
        <span>Tổng số tiền : </span> <strong>{formatPrice(item.totalPrice)}đ</strong>
      </div>
    </div>
  </div>
);

function AllOrder(props) {
  const dispatch = useDispatch();
  const myOrders = useSelector(state => state.OrderReducer.myOrderUser);
  console.log(myOrders)

  const user = useSelector(UserSelector)
  console.log(user)
  useEffect(() => {
    dispatch(GetAllOrderUserserver(user?._id));
  }, [dispatch, user]);

  return (
    <div className="all-myorder">
      {myOrders && myOrders.length > 0 ? myOrders.map((item) => orderParent(item)) : "Bạn không có đơn hàng nào"}
    </div>
  );
}

export default AllOrder;
