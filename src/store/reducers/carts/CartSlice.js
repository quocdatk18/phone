import { createSlice } from '@reduxjs/toolkit';


const CartSlice = createSlice({
    name: 'cart',
    initialState: {

        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        totalSale: localStorage.getItem("totalSale")
            ? JSON.parse(localStorage.getItem("totalSale"))
            : 0,
        salePercent: 0

    },
    reducers: {
        addtoCart: (state, action) => {
            let newList = [...state.cartItems]

            const exists = newList.find(item => item._id === action.payload._id)

            if (exists) {
                newList = newList.map((item) => item._id === action.payload._id ? { ...exists, qty: exists.qty + 1 } : item)
            } else {
                const product = {
                    ...action.payload,
                    qty: 1,
                }
                newList.push(product);
            }

            localStorage.setItem('cartItems', JSON.stringify(newList))
            return {
                ...state,
                cartItems: newList
            };
        },
        deleteQtyProduct: (state, action) => {
            let newList = [...state.cartItems]

            const exists = newList.find(item => item._id === action.payload._id)
            if (exists.qty === 1) {
                newList = newList.filter((item) => item._id !== exists._id)
            } else {
                newList = newList.map((item) => item._id === action.payload._id ? { ...exists, qty: exists.qty - 1 } : item)
            }

            localStorage.setItem('cartItems', JSON.stringify(newList))
            return {
                ...state,
                cartItems: newList
            };
        },
        deleteToCart: (state, action) => {
            let newList = [...state.cartItems]

            newList = newList.filter((item) => item._id !== action.payload._id)

            localStorage.setItem('cartItems', JSON.stringify(newList))
            return {
                ...state,
                cartItems: newList
            };
        },
        setSalePercent(state, action) {
            return {
                ...state,
                salePercent: action.payload
            }
        }
    },
    extraReducers: {

    }
})
const CartReducer = CartSlice.reducer

// Selector
export const CartSelector = state => state.CartReducer.cartItems

// Action export
export const {
    addtoCart,
    deleteToCart,
    deleteQtyProduct,
    setSalePercent
} = CartSlice.actions
export const getCartItem = state => state.CartReducer.cartItems
export const getTotalSale = state => state.CartReducer.totalSale

// Export reducer
export default CartReducer;