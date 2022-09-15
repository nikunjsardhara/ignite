import { createSlice } from '@reduxjs/toolkit'
import mernDashApi from '../../helpers/apiUtils';

const initialState = {
    loading: false,
    error: false,
    errResponse: null,
    users: null,
    currentUser: null,
    loggedInUser : null
}

export const userSlice = createSlice({
  name: 'users',
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
    setUsers : (state, action) => {
        state.users = action.payload
    },
    setCurrentUser: (state, action) => {
        state.currentUser = action.payload
    },
    setLoggedInUser: (state, action) => {
        state.loggedInUser = action.payload
    },
    resetUsers: (state, action) => {
        state.loading = false;
        state.error = false;
        state.errResponse = null;
        state.users = {};
        state.currentUser = null;
    },
    updateUserList: (state, action) => {
        let updatedUsers = state.users.result.map(u => {
            if(u._id === action.payload._id) {
                u.enabled = action.payload.enabled
            }
            return u
        })
        state.users.result = updatedUsers
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
    setErrResponse,
    setError,
    setLoading,
    setUsers,
    setCurrentUser,
    resetUsers,
    setLoggedInUser,
    updateUserList,
} = userSlice.actions

export default userSlice.reducer

export function fetchUsers(data){
    return async (dispatch)=>{
        try {
            dispatch(setLoading(true))
            dispatch(setErrResponse(null))
            const res = await fetchUserList(data)
            if(res){
                dispatch(setLoading(false))
                dispatch(setUsers(res?.data))
            }
      
        } catch (error) {
            let errMsg = error?.response?.data?.message || error?.response?.data?.error_msg ||error?.response?.data?.error
            dispatch(setLoading(false))
            dispatch(setError(true))
            dispatch(setErrResponse(errMsg))
        }
    }
}
export function disableUser(id){
    return async (dispatch)=>{
        try {
            dispatch(setErrResponse(null))
            const res = await mernDashApi.post(`/api/admin/delete/${id}`)
            if(res){
                dispatch(updateUserList(res?.data?.result))
            }
        } catch (error) {
            let errMsg = error?.response?.data?.message || error?.response?.data?.error_msg ||error?.response?.data?.error
            dispatch(setError(true))
            dispatch(setErrResponse(errMsg))
        }
    }
}
export function deleteUser({ id, ...data }){
    return async (dispatch)=>{
        try {
            dispatch(setErrResponse(null))
           const res = await mernDashApi.post(`/api/admin/delete/${id}`, { isDelete: true })
            if(res){
                const updatedUsersList = await fetchUserList(data)
                dispatch(setUsers(updatedUsersList?.data))
            }
        } catch (error) {
            let errMsg = error?.response?.data?.message || error?.response?.data?.error_msg ||error?.response?.data?.error
            dispatch(setError(true))
            dispatch(setErrResponse(errMsg))
        }
    }
}
export function addUser(data){
    return async (dispatch)=>{
        try {
            dispatch(setLoading(true))
            dispatch(setErrResponse(null))
            const res = await mernDashApi.post("/api/admin/register", data)
            if(res){
                dispatch(setLoading(false))
                dispatch(fetchUsers({ items: 10 }))
            }
            return true;
        } catch (error) {
            let errMsg = error?.response?.data?.message || error?.response?.data?.error_msg ||error?.response?.data?.error
            dispatch(setLoading(false))
            dispatch(setError(true))
            dispatch(setErrResponse(errMsg))
            return errMsg
        }
    }
}
export function updateUser({ _id, ...data }){
    return async (dispatch)=>{
        try {
            dispatch(setLoading(true))
            dispatch(setErrResponse(null))
            const res = await mernDashApi.post(`/api/admin/update/${_id}`, data)
            if(res){
                dispatch(setLoading(false))
                dispatch(fetchUsers({ items: 10 }))
            }
            return true;
        } catch (error) {
            let errMsg = error?.response?.data?.message || error?.response?.data?.error_msg ||error?.response?.data?.error
            dispatch(setLoading(false))
            dispatch(setError(true))
            dispatch(setErrResponse(errMsg))
        }
    }
}
export function fetchSingleUser(id){
    return async (dispatch)=>{
        try {
            dispatch(setLoading(true))
            dispatch(setErrResponse(null))
            const res = await mernDashApi.get(`/api/admin/single/${id}`)
            if(res){
                dispatch(setLoading(false))
                dispatch(setCurrentUser(res?.data?.data))
            }
            return true;
        } catch (error) {
            let errMsg = error?.response?.data?.message || error?.response?.data?.error_msg ||error?.response?.data?.error
            dispatch(setLoading(false))
            dispatch(setError(true))
            dispatch(setErrResponse(errMsg))
        }
    }
}
export function fetchLoggedInUser(){
    return async (dispatch)=>{
        try {
            dispatch(setLoading(true))
            dispatch(setErrResponse(null))
            const res = await mernDashApi.get("/api/admin/me")
            if(res){
                dispatch(setLoading(false))
                dispatch(setLoggedInUser(res?.data?.data))
            }
        } catch (error) {
            let errMsg = error?.response?.data?.message || error?.response?.data?.error_msg ||error?.response?.data?.error
            dispatch(setLoading(false))
            dispatch(setError(true))
            dispatch(setErrResponse(errMsg))
        }
    }
}

const fetchUserList = (data) => mernDashApi.get(`/api/admin/list`, {
    params: {
        page: data?.page || 1,
        items: data?.items || 10
    }
})