import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelOrder, GetAllOrderPenddingserver } from "../../../../store/reducers/orders/OrderSlice";
import { UserSelector } from "../../../../store/reducers/users/UserSlice";
import { formatPrice } from "../../../../untils/index";


function PenddingOrder(props) {
    const dispatch = useDispatch();
    const myOrdersPendding = useSelector((state) => state.OrderReducer.myOrdersPendding);
    console.log(myOrdersPendding)
    const user = useSelector(UserSelector);

    const orderParent = (item) => (
        <div key={item._id} className="all-myorder-parent-item">
            <div className="all-myorder-list">
                {item.orderItems.map((item) => orderItem(item))}
            </div>
            <div className="all-myorder-item-totalprice">
                {item.paymentMethod === "payOnline" ? (
                    <span>Đã thanh toán : </span>
                ) : (
                    <span>Tổng số tiền : </span>
                )}{" "}

                <strong>{formatPrice(item.totalSalePrice || item.totalPrice)}đ</strong>
                <div className="myorder-cancel">
                    {
                        item.cancelOrder ? (<span>Đang yêu cầu hủy đơn</span>) : (<span onClick={() => handleCancelOrder(item)}>Hủy đơn hàng</span>)
                    }
                </div>
            </div>
        </div>
    );
    const orderItem = (item) => (
        <div key={item._id} className="all-myorder-item">
            <div className="all-myorder-item-img">
                <img src={item.image}></img>
            </div>
            <div className="all-myorder-item-name">
                <p>{item.name}</p>
                <span>x{item.qty}</span>
            </div>
            <div className="all-myorder-item-price">
                {formatPrice(item.salePrice)}
            </div>
        </div>
    );

    const handleCancelOrder = async (item) => {
        console.log(item);
        await dispatch(CancelOrder(item._id));
        dispatch(GetAllOrderPenddingserver(user?._id));
    };

    useEffect(() => {
        dispatch(GetAllOrderPenddingserver(user?._id));
    }, [dispatch]);

    return (
        <div className="all-myorder">
            {myOrdersPendding && myOrdersPendding.length > 0
                ? myOrdersPendding.map((item) => orderParent(item))
                : "Bạn không có đơn hàng nào"}
        </div>
    );
}

export default PenddingOrder;
