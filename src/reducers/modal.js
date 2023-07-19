import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Client from 'fhir-kit-client';


//#region fhir kit client ile fetch işlemi ve next, prev url sorgusu
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

//#endregion

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
    //#region Loading Reducer
      .addCase(fetchPatientsData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
    //#endregion  
      
    //#region Fulfilled Reducer
      .addCase(fetchPatientsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.patientsData;
        state.nextUrl = action.payload.nextUrl;
        state.prevUrl = action.payload.prevUrl;
      })
    //#endregion

    //#region Rejected Reducer  
      .addCase(fetchPatientsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    //#endregion  
  },
});

export const { setPage, setPatientsPage } = patientSlice.actions;

export default patientSlice.reducer;
