import { createSlice } from "@reduxjs/toolkit";
import mernDashApi from "../../helpers/apiUtils";

const initialState = {
  loading: false,
  error: false,
  errResponse: null,
  doors: null,
  designedDoors: null,
  isSubmit : false
};

export const doorSlice = createSlice({
  name: "doors",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = true;
      state.errResponse = action.payload;
    },
    resetError: (state, action) => {
      state.error = false;
      state.errResponse = null;
    },
    setErrResponse: (state, action) => {
      state.errResponse = action.payload;
    },
    setDoors: (state, action) => {
      state.doors = action.payload;
    },
    setDesignedDoors: (state, action) => {
      state.designedDoors = action.payload;
    },
    setApprovers: (state, action) => {
      for (let i = 0; i < state.doors.result.length; i++) {
        let bool = action.payload.isApproved === "true" ? true : false;
        if (state.doors.result[i]._id === action.payload._id) {
          state.doors.result[i].isApproved = bool;
          break;
        }
      }
    },
    setAttributeDoors: (state, action) => {
      for (let i = 0; i < state.doors.result.length; i++) {
        if (state.doors.result[i]._id === action.payload._id) {
          state.doors.result[i].attributes = action.payload.attributes;
          break;
        }
      }
    },
    setIsSubmit: (state, action) => {
      state.isSubmit = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setErrResponse,
  setError,
  resetError,
  setLoading,
  setDoors,
  setDesignedDoors,
  setApprovers,
  setAttributeDoors,
  setIsSubmit
} = doorSlice.actions;

export default doorSlice.reducer;

export function fetchDoors(data) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(resetError());
      const res = await fetchDoorList(data)
      if (res) {
        dispatch(setLoading(false));
        dispatch(setDoors(res?.data));
      }
    } catch (error) {
      let errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error_msg ||
        error?.response?.data?.error;
      dispatch(setLoading(false));
      dispatch(setError(errMsg));
    }
  };
}
export function removeDoor(data) {
  return async (dispatch) => {
    try {
      dispatch(resetError());
      const res = await mernDashApi.delete(
        `api/doorData/removeDoorData/${data._id}`
      );
      if (res) {
        const updatedDoorsList = await fetchDoorList(data)
        dispatch(setDoors(updatedDoorsList?.data))
      }
    } catch (error) {
      let errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error_msg ||
        error?.response?.data?.error;
      dispatch(setError(errMsg));
    }
  };
}
export function approveDoor(data) {
  return async (dispatch) => {
    try {
      dispatch(resetError());
      const res = await mernDashApi.post("/api/doorData/approvedDoor", data);
      if (res) {
        dispatch(setApprovers(data));
      }
    } catch (error) {
      let errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error_msg ||
        error?.response?.data?.error;
      dispatch(setError(errMsg));
    }
  };
}
export function updateDoor(data) {
  console.log("ROw => ", data);
  return async (dispatch) => {
    try {
      dispatch(resetError());
      const res = await mernDashApi.post("/api/doorData/updateDoorData", data);
      if (res) {
        dispatch(setAttributeDoors(data));
      }
      return res;
    } catch (error) {
      let errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error_msg ||
        error?.response?.data?.error;
      dispatch(setError(errMsg));
    }
  };
}

export function fetchDesignedDoors(data) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(resetError());
      const res = await fetchDesignedDoorList(data)
      dispatch(setLoading(false));
      dispatch(
        setDesignedDoors({
          result: res?.data?.result,
          pagination: res?.data?.pagination
        })
      );
    } catch (error) {
      let errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error_msg ||
        error?.response?.data?.error;
      dispatch(setLoading(false));
      dispatch(setError(errMsg));
    }
  };
}

export function removeDoorDesign({ id, ...data }) {
  return async (dispatch) => {
    try {
      dispatch(resetError());
      const res = await mernDashApi.delete(`/api/doorData/design/${id}`);
      if (res) {
        const res = await fetchDesignedDoorList(data)
        dispatch(setDesignedDoors(res?.data));
      }
    } catch (error) {
      let errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error_msg ||
        error?.response?.data?.error;
      dispatch(setError(errMsg));
    }
  };
}

export function submitDoorData(data) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(resetError());
      const res = await mernDashApi.post("/api/doorData/setDoorData", data)
      if (res) {
        dispatch(setLoading(false));
        dispatch(setIsSubmit(true))
      }
      return res
    } catch (error) {
      let errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error_msg ||
        error?.response?.data?.error;
      dispatch(setLoading(false));
      dispatch(setError(errMsg));
      dispatch(setIsSubmit(false))
    }
  };
}

const fetchDoorList = (data) => mernDashApi.get('/api/doorData/getDoorData', {
  params: {
    page: data?.page || 1,
    items: data?.items || 10
  }
})

const fetchDesignedDoorList = (data) => mernDashApi.get('/api/doorData/design', {
  params: {
    items: data?.items || 10,
    page: data?.item || 1
  }
})