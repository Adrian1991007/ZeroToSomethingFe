import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VolleyAPI } from '../../../rest/RestClient';

export const getSponsors = createAsyncThunk(
  'sponsors/getSponsors',
  async (args, { rejectWithValue }) => {
    try {
      return await VolleyAPI.GET(`/Sponsor`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const newSponsor = createAsyncThunk(
  'sponsors/newSponsor',
  async ({ sponsor }, { rejectWithValue }) => {
    try {
      return await VolleyAPI.POST(`/Sponsor/`, sponsor);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteSponsor = createAsyncThunk(
  'sponsors/deleteSponsor',
  async (id, { rejectWithValue }) => {
    try {
      return await VolleyAPI.DELETE(`/Sponsor/${id}`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateSponsor = createAsyncThunk(
  'sponsors/updateSponsor',
  async ({ sponsor }, { rejectWithValue }) => {
    try {
      return await VolleyAPI.PUT(`/Sponsor/${sponsor.id}`, sponsor);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const sponsorsSlice = createSlice({
  name: 'sponsors',
  initialState: {
    loading: false,
    sponsorError: null,

    sponsors: null,
    image: null,

    sponsor_status: null,
  },
  reducers: {
    setSponsorError: (state, action) => {
      state.sponsorError = action.payload;
    },
    setSponsorImage: (state, action) => {
      state.image = action.payload;
    },
  },
  extraReducers: {
    [getSponsors.pending]: (state) => {
      state.loading = true;
      state.sponsorError = null;
      state.sponsor_status = 'loading';
    },
    [getSponsors.fulfilled]: (state, action) => {
      state.loading = false;
      state.sponsor_status = 'success';
      state.sponsors = action.payload;
    },
    [getSponsors.rejected]: (state, action) => {
      state.loading = false;
      state.sponsorError = action.payload;
      state.sponsor_status = 'failed';
    },

    [deleteSponsor.pending]: (state) => {
      state.loading = true;
      state.sponsorError = null;
    },
    [deleteSponsor.fulfilled]: (state, action) => {
      state.loading = false;
      state.sponsor_status = 'success';
      state.sponsors = state.sponsors.filter((sponsor) => sponsor.id !== action.payload);
    },
    [deleteSponsor.rejected]: (state, action) => {
      state.loading = false;
      state.sponsorError = action.payload;
      state.sponsor_status = 'failed';
    },

    [updateSponsor.pending]: (state) => {
      state.loading = true;
      state.sponsorError = null;
    },
    [updateSponsor.fulfilled]: (state, action) => {
      state.loading = false;
      state.sponsor_status = 'success';
      state.sponsors[state.sponsors.findIndex((obj) => obj.id === action.payload.id)] =
        action.payload;
    },
    [updateSponsor.rejected]: (state, action) => {
      state.loading = false;
      state.sponsorError = action.payload;
      state.sponsor_status = 'failed';
    },

    [newSponsor.pending]: (state) => {
      state.loading = true;
      state.sponsorError = null;
    },
    [newSponsor.fulfilled]: (state, action) => {
      state.loading = false;
      state.sponsors.push(action.payload);
      state.newSucces = action.payload;
    },
    [newSponsor.rejected]: (state, action) => {
      state.loading = false;
      state.sponsorError = action.payload;
      state.sponsor_status = 'failed';
    },
  },
});

export const { setSponsorError, setSponsorImage } = sponsorsSlice.actions;

export default sponsorsSlice.reducer;
