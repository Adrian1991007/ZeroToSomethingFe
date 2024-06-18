import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import auth from './slices/AuthSlice';
import sponsors from './slices/SponsorsSlice';
import staff from './slices/StaffSlice';
import clubTrophy from './slices/ClubTrophySlice';
import news from './slices/NewsSlice';
import matches from './slices/MatchesSlice';

const reducers = combineReducers({
  auth,
  sponsors,
  staff,
  news,
  clubTrophy,
  matches,
});

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export default store;
