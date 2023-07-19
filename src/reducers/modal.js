// modal.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Client from 'fhir-kit-client';



export const fetchPatientsData = createAsyncThunk(
  'patients/fetchData',
  async (fetchDirection, { getState }) => {
    try {
      let url;

      if (fetchDirection === 'next') {
        url = getState().patients.nextUrl;
      } else if (fetchDirection === 'prev') {
        url = getState().patients.prevUrl;
      } else {
        // If fetchDirection is not provided or invalid, perform the initial fetch
        url = 'https://hapi.fhir.org/baseR5/Patient?_format=json';
      }

      const fhirClient = new Client({ baseUrl: url });
      const searchResponse = await fhirClient.search({
        resourceType: 'Patient',
        searchParams: {},
      });

      const patientsData = searchResponse.entry.map(entry => entry.resource);
      const nextUrl = searchResponse.link.find(link => link.relation === 'next')?.url || '';
      const prevUrl = searchResponse.link.find(link => link.relation === 'prev')?.url || '';

      return { patientsData, nextUrl, prevUrl };
    } catch (error) {
      throw new Error('Veri Alinamadi', error);
    }
  }
);

const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    data: [],
    nextUrl: '',
    prevUrl: '',
    page: 0,
    patientsPage: 10,
    status: 'idle',
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPatientsPage(state, action) {
      state.patientsPage = action.payload;
      state.page = 0;
    },

  },
  extraReducers: builder => {
    builder
      .addCase(fetchPatientsData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPatientsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.patientsData;
        state.nextUrl = action.payload.nextUrl;
        state.prevUrl = action.payload.prevUrl;
      })
      .addCase(fetchPatientsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage, setPatientsPage } = patientSlice.actions;

export default patientSlice.reducer;
