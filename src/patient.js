//patient.js


import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPatientsData, setPage, setPatientsPage } from './store/feature/patient/patientSlicer';
import PatientDataListTable from './components/tableComponent';

const PatientDataList = () => {
  const dispatch = useDispatch();
  const { patients, response, nextUrl, prevUrl, totalPatient, page, patientsPage, status, error } = useSelector(state => state.patients);
  useEffect(() => {
    dispatch(fetchPatientsData(''));
  }, [dispatch]);



//#region Sayfada gösterilecek data
  const changePage = (event, newPage) => {
    if (newPage > page && nextUrl) {
      dispatch(fetchPatientsData({ type: 'next', bundle: response }))
        .catch((error) => {
          console.error("Error fetching next page data:", error);
        });
    } else if (newPage < page && prevUrl) {
      dispatch(fetchPatientsData({ type: 'prev', bundle: response }))
        .catch((error) => {
          console.error("Error fetching previous page data:", error);
        });
    } else {
      dispatch(setPage(newPage));
    }
  };

//#endregion



  const ChangePatients = (event) => {
    dispatch(setPatientsPage(+event.target.value));
    dispatch(setPage(0));
  };

  const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'gender', label: 'Gender', minWidth: 100 },
    { id: 'birthDate', label: 'Birth Date', minWidth: 150 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 150 },
    { id: 'address', label: 'Address' },
  ];

  return (
    <div>
      
    <PatientDataListTable
      patients={patients}
      columns={columns}
      totalPatient={totalPatient}
      page={page}
      patientsPage={patientsPage}
      status={status}
      error={error}
      nextUrl={nextUrl}
      prevUrl={prevUrl}
      changePage={changePage}
      ChangePatients={ChangePatients}
      
    />
  </div>
  );
};

export default PatientDataList;
