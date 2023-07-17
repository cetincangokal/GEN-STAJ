import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './modal';

const store = configureStore({
  reducer: {
    patient: patientReducer,
  },
});

export default store;
