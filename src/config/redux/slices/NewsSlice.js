import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VolleyAPI } from '../../../rest/RestClient';

export const getNews = createAsyncThunk('news/getNews', async (args, { rejectWithValue }) => {
  try {
    return await VolleyAPI.GET(`/News`);
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const newNews = createAsyncThunk(
  'news/newNews',
  async (newsRequest, { rejectWithValue }) => {
    try {
      return await VolleyAPI.POST(`/News/`, newsRequest);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteNews = createAsyncThunk(
  'matches/deleteNews',
  async (id, { rejectWithValue }) => {
    try {
      return await VolleyAPI.DELETE(`/News/${id}`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateNews = createAsyncThunk(
  'staffMembers/updateNews',
  async (staffRequest, { rejectWithValue }) => {
    try {
      return await VolleyAPI.PUT(`/News/${staffRequest.id}`, staffRequest);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    loading: false,
    newsError: null,

    news: null,

    get_news_status: null,
    selectedNews: null,
    new_news_status: null,
    delete_news_status: null,
    update_news_status: null,
  },
  reducers: {
    setNewsError: (state, action) => {
      state.newsError = action.payload;
    },
    setNewNewsStatus: (state, action) => {
      state.new_news_status = action.payload;
    },
    setGetNewsStatus: (state, action) => {
      state.get_news_status = action.payload;
    },
    setSelectedNews: (state, action) => {
      state.selectedNews = action.payload;
    },
    setDeleteNewsStatus: (state, action) => {
      state.delete_news_status = action.payload;
    },
    setUpdateNewsStatus: (state, action) => {
      state.update_news_status = action.payload;
    },
  },
  extraReducers: {
    [getNews.pending]: (state) => {
      state.loading = true;
      state.newsError = null;
      state.get_news_status = 'loading';
    },
    [getNews.fulfilled]: (state, action) => {
      state.loading = false;
      state.news = action.payload;
      state.get_news_status = 'success';
    },
    [getNews.rejected]: (state, action) => {
      state.loading = false;
      state.newsError = action.payload;
      state.get_news_status = 'failed';
    },

    [newNews.pending]: (state) => {
      state.loading = true;
      state.newsError = null;
      state.new_news_status = 'loading';
    },
    [newNews.fulfilled]: (state) => {
      state.loading = false;
      state.new_news_status = 'success';
    },
    [newNews.rejected]: (state, action) => {
      state.loading = false;
      state.newsError = action.payload;
      state.new_news_status = 'failed';
    },

    [deleteNews.pending]: (state) => {
      state.loading = true;
      state.newsError = null;
      state.delete_news_status = 'loading';
    },
    [deleteNews.fulfilled]: (state) => {
      state.loading = false;
      state.delete_news_status = 'success';
    },
    [deleteNews.rejected]: (state, action) => {
      state.loading = false;
      state.newsError = action.payload;
      state.delete_news_status = 'failed';
    },

    [updateNews.pending]: (state) => {
      state.loading = true;
      state.newsError = null;
      state.update_news_status = 'loading';
    },
    [updateNews.fulfilled]: (state) => {
      state.loading = false;
      state.update_news_status = 'success';
    },
    [updateNews.rejected]: (state, action) => {
      state.loading = false;
      state.newsError = action.payload;
      state.update_news_status = 'failed';
    },
  },
});

export const {
  setNewsError,
  setSelectedNews,
  setNewNewsStatus,
  setGetNewsStatus,
  setDeleteNewsStatus,
  setUpdateNewsStatus,
} = newsSlice.actions;

export default newsSlice.reducer;
