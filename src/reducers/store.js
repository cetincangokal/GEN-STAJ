import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './modal';

const store = configureStore({
  reducer: {
    patients: patientReducer,
  },
});

export default store;
