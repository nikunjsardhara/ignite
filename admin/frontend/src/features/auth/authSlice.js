import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: false,
    error: false,
    token: null,
    user: null,
    errResponse: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading : (state, action)=> {
        state.loading = action.payload;
    },
    setError : (state, action)=> {
        state.error = action.payload;
    },
    setErrResponse: (state, action)=> {
        state.errResponse = action.payload;
    },
    setToken: (state, action)=> {
        localStorage.setItem("A1_Door_Admin_token", action.payload)
        state.token = action.payload;
    },
    setUser: (state, action)=> {
        state.user = action.payload;
    },
    authReset : (state, action)=>{
        state.loading = false;
        state.error = false;
        state.token = null;
        state.user = null;
        state.errResponse = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
    setErrResponse,
    setError,
    setLoading,
    setToken,
    setUser,
    authReset,
} = authSlice.actions

export default authSlice.reducer

export function loginAction(data){
    return async (dispatch)=>{
        try {
            dispatch(setLoading(true))
            dispatch(setErrResponse(null))
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/auth/login`, data)
            if(res){
                dispatch(setLoading(false))
                dispatch(setToken(res?.data?.access_token))
            }
      
        } catch (error) {
            let errMsg = error?.response?.data?.message || error?.response?.data?.error_msg ||error?.response?.data?.error
            dispatch(setLoading(false))
            dispatch(setError(true))
            dispatch(setErrResponse(errMsg))
        }
    }
}