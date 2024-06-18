import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VolleyAPI } from '../../../rest/RestClient';

export const getClubTrophies = createAsyncThunk(
  'trophies/getTrophies',
  async (args, { rejectWithValue }) => {
    try {
      return await VolleyAPI.GET(`/ClubTrophy`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const newClubTrophy = createAsyncThunk(
  'trophies/newClubTrophy',
  async (clubTrophyRequest, { rejectWithValue }) => {
    try {
      return await VolleyAPI.POST(`/ClubTrophy/`, clubTrophyRequest);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteClubTrophy = createAsyncThunk(
  'trophies/deleteClubTrophy',
  async (id, { rejectWithValue }) => {
    try {
      return await VolleyAPI.DELETE(`/ClubTrophy/${id}`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const clubTrophySlice = createSlice({
  name: 'clubTrophy',
  initialState: {
    loading: false,
    clubTrophyError: null,

    clubTrophy: null,

    clubTrophyStatus: null,
    new_club_trophy_status: null,
  },
  reducers: {
    setClubTrophyError: (state, action) => {
      state.clubTrophyError = action.payload;
    },
    setClubTrophyStatus: (state, action) => {
      state.clubTrophyStatus = action.payload;
    },
    setNewClubTrophyStatus: (state, action) => {
      state.new_club_trophy_status = action.payload;
    },
  },
  extraReducers: {
    [getClubTrophies.pending]: (state) => {
      state.clubTrophyStatus = 'loading';
      state.clubTrophyError = null;
    },
    [getClubTrophies.fulfilled]: (state, action) => {
      state.clubTrophyStatus = 'success';
      state.clubTrophy = action.payload;
    },
    [getClubTrophies.rejected]: (state, action) => {
      state.clubTrophyStatus = 'failed';
      state.clubTrophyError = action;
    },

    [newClubTrophy.pending]: (state) => {
      state.loading = true;
      state.clubTrophyError = null;
      state.new_club_trophy_status = 'loading';
    },
    [newClubTrophy.fulfilled]: (state, action) => {
      state.loading = false;
      state.clubTrophy.push(action.payload);
      state.new_club_trophy_status = 'success';
    },
    [newClubTrophy.rejected]: (state, action) => {
      state.loading = false;
      state.clubTrophyError = action.payload;
      state.new_club_trophy_status = 'failed';
    },

    [deleteClubTrophy.pending]: (state) => {
      state.loading = true;
      state.clubTrophyError = null;
    },
    [deleteClubTrophy.fulfilled]: (state, action) => {
      state.loading = false;
      state.clubTrophyStatus = 'success';
      state.clubTrophy = state.clubTrophy.filter((clubTrophy) => clubTrophy.id !== action.payload);
    },
    [deleteClubTrophy.rejected]: (state, action) => {
      state.loading = false;
      state.clubTrophyError = action.payload;
      state.clubTrophyStatus = 'failed';
    },
  },
});

export const { setClubTrophyError, setClubTrophyStatus } = clubTrophySlice.actions;

export default clubTrophySlice.reducer;
