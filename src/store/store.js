import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './feature/patient/patientSlicer';

const store = configureStore({
  reducer: {
    patients: patientReducer,
  },
});

export default store;
