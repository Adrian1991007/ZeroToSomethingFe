/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Storage from 'store2';
import ZTSException from '../../../exceptions/ZTSException';
import { VolleyAPI } from '../../../rest/RestClient';
import ERROR_CODES from '../../../common/ErrorCodes';

export const login = createAsyncThunk(
  'authSlice/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      // const response = await VolleyAPI.GET(
      //   `login`,
      //   {
      //     email,
      //     password,
      //   },
      //   {
      //     isForm: true,
      //     authorization: {
      //       type: 'Basic',
      //     },
      //   }
      // );

      const admin = {
        email: 'admin@admin.com',
        password: 'Admin123',
      };

      const contentWriter = {
        email: 'writer@writer.com',
        password: 'Writer123',
      };

      if (email === admin.email && password === admin.password) {
        dispatch(
          doLogin({
            email: email,
            role: 'admin',
          }),
        );
      } else if (email === contentWriter.email && password === contentWriter.password) {
        dispatch(
          doLogin({
            email: email,
            role: 'contentWriter',
          }),
        );
      } else {
        throw new ZTSException(ERROR_CODES.ACCOUNT_NOT_FOUND, 'Account not found');
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: Storage.get('email') ?? null,
    loggedIn: Storage.get('logged_in') ?? false,
    role: Storage.get('role') ?? 'guest',
    authLoading: false,
    authError: null,

    auth_status: null,
  },
  reducers: {
    doLogin(state, action) {
      let { email, role } = action.payload;

      Storage.set('email', email, true);
      Storage.set('role', role, true);

      let loggedIn = !!role;
      Storage.set('logged_in', loggedIn, true);

      return {
        ...state,
        loggedIn: loggedIn,
        role,
        email,
      };
    },
    doLogout(state) {
      Storage.remove('email');
      Storage.remove('role');
      Storage.remove('logged_in');

      return {
        ...state,
        loggedIn: false,
        email: null,
      };
    },
    setAuthError: (state, action) => {
      state.authError = action.payload;
    },
    setAuthStatus: (state, action) => {
      state.auth_status = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.authLoading = true;
      state.authError = null;
      state.auth_status = 'loading';
    },
    [login.fulfilled]: (state) => {
      state.authLoading = false;
      state.auth_status = 'success';
    },
    [login.rejected]: (state, action) => {
      state.authLoading = false;
      state.authError = action.payload;
      state.auth_status = 'failed';
    },
  },
});

export const { doLogin, doLogout, setAuthError, setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
