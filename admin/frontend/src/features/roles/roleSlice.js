import { createSlice } from "@reduxjs/toolkit"
import mernDashApi from "../../helpers/apiUtils"

const initialState = {
  loading: false,
  error: false,
  errResponse: null,
  roles: null,
  currentRole: null
}

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = true
      state.errResponse = action.payload
    },
    resetError: (state) => {
      state.error = false
      state.errResponse = null
    },
    setRoles: (state, action) => {
      state.roles = action.payload
    },
    setCurrentRole: (state, action) => {
      state.currentRole = action.payload
    }
  }
})

export const {
  setLoading,
  setError,
  resetError,
  setRoles,
  setCurrentRole,
} = roleSlice.actions

export default roleSlice.reducer

export function fetchRoles(data) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      dispatch(resetError())
      const res = await fetchRoleList(data)
      dispatch(setLoading(false))
      dispatch(setRoles(res?.data))
    } catch (error) {
      let errMsg = error?.response?.data?.message
      dispatch(setRoles(null))
      dispatch(setLoading(false))
      dispatch(setError(errMsg))
    }
  }
}

export function fetchSingleRole(id) {
  return async (dispatch) => {
    try {
      dispatch(setCurrentRole(null))
      dispatch(setLoading(true))
      dispatch(resetError())
      const res = await mernDashApi.get(`/api/role/${id}`)
      dispatch(setLoading(false))
      dispatch(setCurrentRole(res?.data?.result))
    } catch (error) {
      let errMsg = error?.response.data?.message
      dispatch(setCurrentRole(null))
      dispatch(setLoading(false))
      dispatch(setError(errMsg))
    }
  }
}

export function addRole(data) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      dispatch(resetError())
      await mernDashApi.post('/api/role', data)
      dispatch(fetchRoles({ items: 10 }))
    } catch (error) {
      let errMsg = error?.response.data?.message
      dispatch(setLoading(false))
      dispatch(setError(errMsg))
    }
  }
}

export function editRole({ id, ...data }) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      dispatch(resetError())
      await mernDashApi.put(`/api/role/${id}`, data)
      dispatch(setCurrentRole(null))
      dispatch(fetchRoles({ items: 10 }))
    } catch (error) {
      let errMsg = error?.response.data?.message
      dispatch(setLoading(false))
      dispatch(setError(errMsg))
    }
  }
}

export function removeRole({ id, ...data }) {
  return async (dispatch) => {
    try {
      dispatch(resetError())
      await mernDashApi.delete(`/api/role/${id}`)
      dispatch(setCurrentRole(null))
      const res = await fetchRoleList(data)
      dispatch(setRoles(res?.data))
    } catch (error) {
      let errMsg = error?.response.data?.message
      dispatch(setError(errMsg))
    }
  }
}

const fetchRoleList = (data) => mernDashApi.get('/api/role', {
  params: {
    page: data?.page || 1,
    items: data?.items || 10
  }
})
