import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VolleyAPI } from '../../../rest/RestClient';

export const getMatches = createAsyncThunk(
  'matches/getMatches',
  async (args, { rejectWithValue }) => {
    try {
      return await VolleyAPI.GET(`/Match`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getMatchTypes = createAsyncThunk(
  'matches/getMatchTypes',
  async (args, { rejectWithValue }) => {
    try {
      return await VolleyAPI.GET(`/MatchType`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const newMatch = createAsyncThunk(
  'matches/newMatch',
  async (matchRequest, { rejectWithValue }) => {
    try {
      return await VolleyAPI.POST(`/Match/`, matchRequest);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateMatch = createAsyncThunk(
  'matches/updateMatch',
  async (matchRequest, { rejectWithValue }) => {
    try {
      return await VolleyAPI.PUT(`/Match/${matchRequest.id}`, matchRequest);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteMatch = createAsyncThunk(
  'matches/deleteMatch',
  async (id, { rejectWithValue }) => {
    try {
      return await VolleyAPI.DELETE(`/Match/${id}`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    loading: false,
    matchError: null,

    matches: null,
    matchTypes: null,
    selectedMatch: null,

    match_Status: null,
    new_match_status: null,
    match_type_status: null,
    update_match_status: null,
    delete_match_status: null,
  },
  reducers: {
    setMatchError: (state, action) => {
      state.matchError = action.payload;
    },
    setMatchStatus: (state, action) => {
      state.match_Status = action.payload;
    },
    setMatchTypeStatus: (state, action) => {
      state.match_type_status = action.payload;
    },
    setNewMatchStatus: (state, action) => {
      state.new_match_status = action.payload;
    },
    setSelectedMatch: (state, action) => {
      state.selectedMatch = action.payload;
    },
    setUpdateMatchStatus: (state, action) => {
      state.update_match_status = action.payload;
    },
    setDeleteMatchStatus: (state, action) => {
      state.delete_match_status = action.payload;
    },
  },
  extraReducers: {
    [getMatches.pending]: (state) => {
      state.match_Status = 'loading';
      state.matchError = null;
      state.loading = true;
    },
    [getMatches.fulfilled]: (state, action) => {
      state.match_Status = 'success';
      state.matches = action.payload;
      state.loading = false;
    },
    [getMatches.rejected]: (state, action) => {
      state.match_Status = 'failed';
      state.matchError = action;
      state.loading = false;
    },

    [getMatchTypes.pending]: (state) => {
      state.loading = true;
      state.matchError = null;
      state.match_type_status = 'loading';
    },
    [getMatchTypes.fulfilled]: (state, action) => {
      state.loading = false;
      state.match_type_status = 'success';
      state.matchTypes = action.payload;
    },
    [getMatchTypes.rejected]: (state, action) => {
      state.loading = false;
      state.matchError = action.payload;
      state.match_type_status = 'failed';
    },

    [newMatch.pending]: (state) => {
      state.loading = true;
      state.matchError = null;
      state.new_match_status = 'loading';
    },
    [newMatch.fulfilled]: (state, action) => {
      state.loading = false;
      state.matches.push(action.payload);
      state.new_match_status = 'success';
    },
    [newMatch.rejected]: (state, action) => {
      state.loading = false;
      state.matchError = action.payload;
      state.new_match_status = 'failed';
    },

    [deleteMatch.pending]: (state) => {
      state.loading = true;
      state.matchError = null;
      state.delete_match_status = 'loading';
    },
    [deleteMatch.fulfilled]: (state, action) => {
      state.loading = false;
      state.delete_match_status = 'success';
      state.matches = state.matches.filter((match) => match.id !== action.payload);
    },
    [deleteMatch.rejected]: (state, action) => {
      state.loading = false;
      state.matchError = action.payload;
      state.delete_match_status = 'failed';
    },

    [updateMatch.pending]: (state) => {
      state.loading = true;
      state.matchError = null;
      state.update_match_status = 'loading';
    },
    [updateMatch.fulfilled]: (state) => {
      state.loading = false;
      state.update_match_status = 'success';
    },
    [updateMatch.rejected]: (state, action) => {
      state.loading = false;
      state.matchError = action.payload;
      state.update_match_status = 'failed';
    },
  },
});

export const {
  setMatchError,
  setMatchStatus,
  setMatchTypeStatus,
  setNewMatchStatus,
  setSelectedMatch,
  setUpdateMatchStatus,
  setDeleteMatchStatus,
} = matchesSlice.actions;

export default matchesSlice.reducer;
