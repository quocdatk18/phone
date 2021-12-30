import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
export const getAllProducts = createAsyncThunk('products/productsFetched', async () => {
    const response = await axios.get(
        `http://localhost:5000/products/`
    )
    return response.data
});


const ProductSlice = createSlice({
    name: 'products',
    initialState: {
        allProducts: []
    },
    reducers: {},
    extraReducers: {
        // Get all products
        [getAllProducts.pending]: (state, action) => {
            console.log('Fetching products from backend ....')
        },
        [getAllProducts.fulfilled]: (state, action) => {
            console.log('Done')
            state.allProducts = action.payload
        },
        [getAllProducts.rejected]: (state, action) => {
            console.log('Failed to get products!!!')
        },


    }
})
// Reducer
const ProductsReducer = ProductSlice.reducer

// Selector
export const ProductsSelector = state => state.ProductsReducer.allProducts

// Action export
// export const {

// } = ProductSlice.actions

// Export reducer
export default ProductsReducer