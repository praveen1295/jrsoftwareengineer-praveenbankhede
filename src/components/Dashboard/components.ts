import { ApiConfig, ApiState } from "./../../index.d";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";
import {
  setFulFillState,
  setPendingState,
  setRejectedState,
} from "../../utils/setStateUtils";

export interface FormFields {
  search: string;
  date?: string;
}

const API_CONFIG: ApiConfig = {
  GET_POSTS_LIST: {
    url: "/posts",
    method: "GET",
    data: {},
  },
  GET_COMMENTS: {
    url: "/comments",
    method: "GET",
    data: {},
  },
};

const initialState: ApiState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const postsListApiCall = createAsyncThunk(
  "get/posts",
  async (getProjectListParam: string, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.GET_POSTS_LIST };
      apiPayload.url += `?${getProjectListParam}`;
      const response = await apiClient(apiPayload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const postsListSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postsListApiCall.pending, (state) => {
        setPendingState(state);
      })
      .addCase(postsListApiCall.fulfilled, (state, action) => {
        setFulFillState(state, action);
      })
      .addCase(postsListApiCall.rejected, (state, action) => {
        setRejectedState(state, action);
      });
  },
});

export const CommentsApiCall = createAsyncThunk(
  "get/comments",
  async (postId: any, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.GET_COMMENTS };
      apiPayload.url += `?postId=${postId}`;
      const response = await apiClient(apiPayload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(CommentsApiCall.pending, (state) => {
        setPendingState(state);
      })
      .addCase(CommentsApiCall.fulfilled, (state, action) => {
        setFulFillState(state, action);
      })
      .addCase(CommentsApiCall.rejected, (state, action) => {
        setRejectedState(state, action);
      });
  },
});

export const postsAction = postsListSlice.actions;
export const commentsAction = commentsSlice.actions;

const projectListReducer = {
  postsData: postsListSlice.reducer,
  commentsData: commentsSlice.reducer,
};
export default projectListReducer;
