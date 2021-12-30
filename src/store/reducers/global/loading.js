import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    initialState: {
        loading: false
    },
    name: "loading",
    reducers: {
        setLoading: (state, action) => {
            return { ...state, loading: action.payload }
        }
    }
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer