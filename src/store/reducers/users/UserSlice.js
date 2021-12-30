import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { notify } from '../../../untils';



export const getAllUsers = createAsyncThunk('users/usersFetched', async () => {
    try {
        const response = await axios.get(
            `http://localhost:5000/user/`
        )
        return response.data
    } catch (error) {
        console.log(error.message)
    }
});
export const loadUser = createAsyncThunk('user/loadUser', async () => {
    try {
        const token = localStorage.getItem('accessToken')
        if (!token) return null
        const response = await axios.get("http://localhost:5000/user/load-user", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        return response.data.user
    } catch (error) {
        return null
            ;
    }
})
export const LoginAcc = createAsyncThunk('login/loginFetched', async (user) => {
    try {
        const { data } = await axios.post(
            `http://localhost:5000/user/login/`, user
        )
        localStorage.setItem('accessToken', data.token);
        // localStorage.setItem('userInfo', JSON.stringify(data));
        notify({
            message: "Success !",
            description: "Login successfully !",
            type: "success"
        })
        return data
    } catch (error) {
        localStorage.removeItem('accessToken');

        notify({
            message: "Error !",
            description: error.response.data.message,
            type: "error"
        })
        return null

    }
});
export const RegisterAcc = createAsyncThunk('register/registerFetched', async (user) => {
    try {
        const { data } = await axios.post(
            `http://localhost:5000/user/register/`, user
        )
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data))
        return data.user
    } catch (error) {
        localStorage.removeItem('accessToken');

        notify({
            message: "Error !",
            description: "Email trùng lặp,xin vui lòng nhập email khác",
            type: "error"
        })
        return null

    }
});

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: localStorage.getItem("acessToken")
            ? JSON.parse(localStorage.getItem("acessToken"))
            : null

    },
    reducers: {
        Logout: (state, action) => {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("cartItems")
            localStorage.removeItem("userInfo")
            return { userInfo: null }
        }
    }, extraReducers: {
        // Get all todos
        [getAllUsers.pending]: (state, action) => {
            console.log('Fetching users from backend ....')
        },
        [getAllUsers.fulfilled]: (state, action) => {
            console.log(action)
            return {
                ...state,
                userInfo: action.payload,
                error: action.payload
            }
        },
        [getAllUsers.rejected]: (state, action) => {
            console.log('Failed to get users!!!')
        },
        [LoginAcc.fulfilled]: (state, action) => {

            return { ...state, userInfo: action.payload };
        },
        [LoginAcc.rejected]: (state, action) => {
            return {
                ...state,
                userInfo: null,
                error: action.payload
            }
        },
        [RegisterAcc.fulfilled]: (state, action) => {
            return { ...state, userInfo: action.payload }
        },
        [RegisterAcc.rejected]: (state, action) => {
            return {
                ...state,
                userInfo: null,
                error: action.payload
            }
        },
        [loadUser.fulfilled]: (state, action) => {
            return { ...state, userInfo: action.payload };
        },
        [loadUser.rejected]: (state, action) => {
            return { ...state, userInfo: null };
        }
    }
})
// Reducer
const UserReducer = UserSlice.reducer

// Selector
export const UserSelector = state => {

    return state.UserReducer.userInfo
}

// Action export
export const {
    Logout
} = UserSlice.actions

// Export reducer
export default UserReducer