import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


export const CreateOrder = createAsyncThunk('order/orderFetched', async (OrderPaid, { dispatch, getState }) => {
    try {

        const { userInfo } = getState().UserReducer;

        const { data } = await axios.post(
            "http://localhost:5000/order/create",
            OrderPaid,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        localStorage.removeItem("cartItems");
        localStorage.removeItem("orderInfo");
        return data
    } catch (error) {

        return null
    }
});
export const GetAllOrderserver = createAsyncThunk('getallOrder/getFetchecd', async ({ dispatch, getState }) => {

    try {
        const { userInfo } = getState().UserReducer;
        const { data } = await axios.get(`http://localhost:5000/order/`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        return null
    }
})
export const GetAllOrderUserserver = createAsyncThunk('getallOrder/getFetchecd', async (idUser, { dispatch, getState }) => {

    try {
        const { userInfo } = getState().UserReducer;
        const { data } = await axios.get(`http://localhost:5000/order/${idUser}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        return null
    }
})
export const GetAllOrderPenddingserver = createAsyncThunk('GetAllOrderPendding/getOrderPenddingFetchecd', async (idUser, { dispatch, getState }) => {
    try {
        const { userInfo } = getState().UserReducer;
        const { data } = await axios.get(`http://localhost:5000/order/orderPendding/${idUser}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        return null
    }
})
export const GetAllOrderPaidserver = createAsyncThunk('GetAllOrderPaid/getOrderPaidFetchecd', async (idUser, { dispatch, getState }) => {
    try {
        const { userInfo } = getState().UserReducer;
        const { data } = await axios.get(`http://localhost:5000/order/orderPaid/${idUser}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        return null
    }
})

export const GetAllOrderShippingserver = createAsyncThunk('GetAllOrderShipping/getOrderShippingFetchecd', async (idUser, { dispatch, getState }) => {
    console.log(idUser)
    try {
        const { userInfo } = getState().UserReducer;
        const { data } = await axios.get(`http://localhost:5000/order/orderShipping/${idUser}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });

        return data;

    } catch (error) {
        console.log(error);
        return null
    }
})
export const CancelOrder = createAsyncThunk('CancelOrder/CancelOrderFetchecd', async (idUser, { dispatch, getState }) => {
    console.log(idUser)
    try {

        const { data } = await axios.post(`http://localhost:5000/order/cancel/${idUser}`, {

        });

        return data;

    } catch (error) {
        console.log(error);
        return null
    }
})


const OrderSlice = createSlice({
    name: 'address',
    initialState: {
        orderInfo1:
            localStorage.getItem("orderInfo")
                ? JSON.parse(localStorage.getItem("orderInfo"))
                : [],
        myOrdersShipping: {},
        myOrders: {},
        myOrdersPendding: {},
        myOrdersPaid: {},
        myOrderUser: {}

    }

    ,
    reducers: {
        orderInfo: (state, action) => {
            const data = action.payload

            localStorage.setItem('orderInfo', JSON.stringify(data))
            return {
                ...state,
                data
            }

        },
        createOrder: (state, action) => {

            return { ...state, order: action.payload };
        },
        // GetAllOrder: (state = {}, action) => {
        //     return { ...state, myOrders: action.payload };
        // },
        // GetAllOrderPendding: (state = {}, action) => {
        //     return { ...state, myOrdersPendding: action.payload };
        // },
        // GetAllOrderShipping: (state = {}, action) => {
        //     console.log(action.payload)
        //     return { ...state, myOrdersShipping: action.payload };
        // },
        // GetAllOrderPaid: (state = {}, action) => {
        //     return { ...state, myOrdersPaid: action.payload };
        // }
    },
    extraReducers: {
        [GetAllOrderserver.fulfilled]: (state, action) => {
            console.log(action)
            return { ...state, myOrders: action.payload };
        },
        [GetAllOrderShippingserver.fulfilled]: (state, action) => {
            console.log(action)
            return { ...state, myOrdersShipping: action.payload };
        },
        [GetAllOrderPenddingserver.fulfilled]: (state, action) => {
            // console.log(action)
            return { ...state, myOrdersPendding: action.payload };
        },
        [GetAllOrderPaidserver.fulfilled]: (state, action) => {
            console.log(action)
            return { ...state, myOrdersPaid: action.payload };
        },
        [GetAllOrderUserserver.fulfilled]: (state, action) => {
            console.log(action)
            return { ...state, myOrderUser: action.payload };
        },
        [CancelOrder.fulfilled]: (state, action) => {
            console.log(action)
            return { ...state, myOrdersPaid: action.payload };
        },
    }
})
// Reducer
const OrderReducer = OrderSlice.reducer

export const OrderInfo = state => state.OrderReducer.orderInfo1

export const myOrders = state => state.OrderReducer.myOrders
export const myOrderShipping = state => state.OrderReducer.myOrdersShipping
export const myOrdersPendding = state => state.OrderReducer.myOrdersPendding
export const myOrdersPaid = state => state.OrderReducer.myOrdersPaid
// Selector
export const OrderSelector = state => {
    console.log(state.OrderReducer)
    return state.OrderReducer

}


// Action export
export const {
    orderInfo,
    createOrder,
    GetAllOrderPaid,
    GetAllOrderPendding,
    GetAllOrderShipping,
    GetAllOrder
} = OrderSlice.actions

// Export reducer
export default OrderReducer
