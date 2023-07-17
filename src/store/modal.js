import { createSlice } from '@reduxjs/toolkit';

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    patients: [],
    nextUrl: '',
    prevUrl: '',
    page: 0,
    patientsPage: 10,
  },
  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload;
    },
    setNextUrl: (state, action) => {
      state.nextUrl = action.payload;
    },
    setPrevUrl: (state, action) => {
      state.prevUrl = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPatientsPage: (state, action) => {
      state.patientsPage = action.payload;
    },
  },
});

export const {
  setPatients,
  setNextUrl,
  setPrevUrl,
  setPage,
  setPatientsPage,
} = patientSlice.actions;

export default patientSlice.reducer;
