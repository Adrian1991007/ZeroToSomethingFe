import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VolleyAPI } from '../../../rest/RestClient';

export const getStaffMembers = createAsyncThunk(
  'staffMembers/getStaffMembers',
  async (args, { rejectWithValue }) => {
    try {
      return await VolleyAPI.GET(`/StaffMember`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getStaffType = createAsyncThunk(
  'staffMembers/getStaffType',
  async (args, { rejectWithValue }) => {
    try {
      return await VolleyAPI.GET(`/StaffType`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getStaffPositionHistory = createAsyncThunk(
  'staffMembers/getStaffPositionHistory',
  async ({ staffID }, { rejectWithValue }) => {
    try {
      return await VolleyAPI.GET(`/StaffMember/positionHistory?id=${staffID}`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getAgeCategory = createAsyncThunk(
  'staffMembers/getAgeCategory',
  async (args, { rejectWithValue }) => {
    try {
      return await VolleyAPI.GET(`/AgeCategory`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getPositions = createAsyncThunk(
  'staffMembers/getPositions',
  async (args, { rejectWithValue }) => {
    try {
      return await VolleyAPI.GET(`/Position`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getStaffTrophies = createAsyncThunk(
  'staffMembers/getStaffTrophies',
  async (args, { rejectWithValue }) => {
    try {
      return await VolleyAPI.GET(`/StaffTrophy`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const newStaffMember = createAsyncThunk(
  'staffMembers/newStaffMember',
  async (staffRequest, { rejectWithValue }) => {
    try {
      return await VolleyAPI.POST(`/StaffMember/`, staffRequest);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const newStaffTrophy = createAsyncThunk(
  'staffMembers/newStaffTrophy',
  async (trophyRequest, { rejectWithValue }) => {
    try {
      return await VolleyAPI.POST(`/StaffTrophy/staff`, trophyRequest);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteStaffMember = createAsyncThunk(
  'staffMembers/deleteStaffMember',
  async (id, { rejectWithValue }) => {
    try {
      return await VolleyAPI.DELETE(`/StaffMember/${id}`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteLastPosition = createAsyncThunk(
  'staffMembers/deleteLastPosition',
  async (id, { rejectWithValue }) => {
    try {
      return await VolleyAPI.DELETE(`/StaffMember/lastPosition/${id}`);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteStaffTrophy = createAsyncThunk(
  'staffMembers/deleteStaffTrophy',
  async (selectedTrophy, { rejectWithValue }) => {
    try {
      return await VolleyAPI.DELETE(
        `/StaffTrophy/${selectedTrophy.staffPositionHistoryId}&${selectedTrophy.trophyId}`,
      );
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateStaffMember = createAsyncThunk(
  'staffMembers/updateStaffMember',
  async (staffRequest, { rejectWithValue }) => {
    try {
      return await VolleyAPI.PUT(`/StaffMember/${staffRequest.id}`, staffRequest);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    loading: false,
    staffError: null,

    staffMembers: null,
    selectedStaffMember: null,
    staffTypes: null,
    staffAgeCategory: null,
    staffPosition: null,
    staffPositionsHistory: null,
    staffTrophies: null,

    staff_status: null,
    new_staff_status: null,
    update_staff_status: null,
    delete_last_position_status: null,
    delete_trophy_status: null,
    staff_types_status: null,
    staff_age_Category_status: null,
    staff_position_status: null,
    staff_position_history_status: null,
    staff_trophies_status: null,
    new_trophy_status: null,
  },
  reducers: {
    setStaffError: (state, action) => {
      state.staffError = action.payload;
    },
    setStaffStatus: (state, action) => {
      state.staff_status = action.payload;
    },
    setNewStaffStatus: (state, action) => {
      state.new_staff_status = action.payload;
    },
    setStaffPositionsHistory: (state, action) => {
      state.staffPositionsHistory = action.payload;
    },
    setUpdateStaffStatus: (state, action) => {
      state.update_staff_status = action.payload;
    },
    setNewTrophyStatus: (state, action) => {
      state.new_trophy_status = action.payload;
    },
    setStaffTrophiesStatus: (state, action) => {
      state.staff_trophies_status = action.payload;
    },
    setDeleteLastPositionStatus: (state, action) => {
      state.delete_last_position_status = action.payload;
    },
    setDeleteTrophyStatus: (state, action) => {
      state.delete_trophy_status = action.payload;
    },
    setStaffPositionStatus: (state, action) => {
      state.staff_position_status = action.payload;
    },
    setStaffTypesStatus: (state, action) => {
      state.staff_types_status = action.payload;
    },
    setSelectedStaffMember: (state, action) => {
      state.selectedStaffMember = action.payload;
    },
    setStaffPositionHistoryStatus: (state, action) => {
      state.staff_position_history_status = action.payload;
    },
    setStaffAgeCategoryStatus: (state, action) => {
      state.staff_age_Category_status = action.payload;
    },
  },
  extraReducers: {
    [getStaffMembers.pending]: (state) => {
      state.staff_status = 'loading';
      state.loading = true;
      state.staffError = null;
    },
    [getStaffMembers.fulfilled]: (state, action) => {
      state.loading = false;
      state.staff_status = 'success';
      state.staffMembers = action.payload;
    },
    [getStaffMembers.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.staff_status = 'failed';
    },

    [getStaffType.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
      state.staff_types_status = 'loading';
    },
    [getStaffType.fulfilled]: (state, action) => {
      state.loading = false;
      state.staff_types_status = 'success';
      state.staffTypes = action.payload;
    },
    [getStaffType.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.staff_types_status = 'failed';
    },

    [getAgeCategory.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
      state.staff_age_Category_status = 'loading';
    },
    [getAgeCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.staff_age_Category_status = 'success';
      state.staffAgeCategory = action.payload;
    },
    [getAgeCategory.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.staff_age_Category_status = 'failed';
    },

    [getPositions.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
      state.staff_position_status = 'loading';
    },
    [getPositions.fulfilled]: (state, action) => {
      state.loading = false;
      state.staff_position_status = 'success';
      state.staffPosition = action.payload;
    },
    [getPositions.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.staff_position_status = 'failed';
    },

    [getStaffTrophies.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
      state.staff_trophies_status = 'loading';
    },
    [getStaffTrophies.fulfilled]: (state, action) => {
      state.loading = false;
      state.staff_trophies_status = 'success';
      state.staffTrophies = action.payload;
    },
    [getStaffTrophies.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.staff_trophies_status = 'failed';
    },

    [getStaffPositionHistory.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
      state.staff_position_history_status = 'loading';
    },
    [getStaffPositionHistory.fulfilled]: (state, action) => {
      state.loading = false;
      state.staff_position_history_status = 'success';
      state.staffPositionsHistory = action.payload;
    },
    [getStaffPositionHistory.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.staff_position_history_status = 'failed';
    },

    [newStaffMember.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
      state.new_staff_status = 'loading';
    },
    [newStaffMember.fulfilled]: (state, action) => {
      state.loading = false;
      state.staffMembers.push(action.payload);
      state.new_staff_status = 'success';
    },
    [newStaffMember.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.new_staff_status = 'failed';
    },

    [newStaffTrophy.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
      state.new_trophy_status = 'loading';
    },
    [newStaffTrophy.fulfilled]: (state) => {
      state.loading = false;
      state.new_trophy_status = 'success';
    },
    [newStaffTrophy.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.new_trophy_status = 'failed';
    },

    [deleteStaffMember.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
    },
    [deleteStaffMember.fulfilled]: (state, action) => {
      state.loading = false;
      state.staff_status = 'success';
      state.staffMembers = state.staffMembers.filter(
        (staffMember) => staffMember.id !== action.payload,
      );
    },
    [deleteStaffMember.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.staff_status = 'failed';
    },

    [deleteLastPosition.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
      state.delete_last_position_status = 'loading';
    },
    [deleteLastPosition.fulfilled]: (state) => {
      state.loading = false;
      state.staffError = null;
      state.delete_last_position_status = 'success';
    },
    [deleteLastPosition.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.delete_last_position_status = 'failed';
    },

    [deleteStaffTrophy.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
      state.delete_trophy_status = 'loading';
    },
    [deleteStaffTrophy.fulfilled]: (state) => {
      state.loading = false;
      state.staffError = null;
      state.delete_trophy_status = 'success';
    },
    [deleteStaffTrophy.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.delete_trophy_status = 'failed';
    },

    [updateStaffMember.pending]: (state) => {
      state.loading = true;
      state.staffError = null;
      state.update_staff_status = 'loading';
    },
    [updateStaffMember.fulfilled]: (state) => {
      state.loading = false;
      state.update_staff_status = 'success';
    },
    [updateStaffMember.rejected]: (state, action) => {
      state.loading = false;
      state.staffError = action.payload;
      state.update_staff_status = 'failed';
    },
  },
});

export const {
  setStaffError,
  setSelectedStaffMember,
  setStaffPositionHistoryStatus,
  setStaffStatus,
  setStaffAgeCategoryStatus,
  setNewStaffStatus,
  setStaffPositionStatus,
  setStaffTypesStatus,
  setDeleteLastPositionStatus,
  setDeleteTrophyStatus,
  setStaffTrophiesStatus,
  setNewTrophyStatus,
  setUpdateStaffStatus,
  setStaffPositionsHistory,
} = staffSlice.actions;

export default staffSlice.reducer;
