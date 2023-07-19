import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPatientsData, setPage, setPatientsPage } from './reducers/modal';
import PatientDataListTable from './pages/table';

const PatientDataList = () => {
  const dispatch = useDispatch();
  const { data: patients, nextUrl, prevUrl, page, patientsPage, status, error } = useSelector(state => state.patients);

  //#region UseEffect Hook
  useEffect(() => {
    dispatch(fetchPatientsData());
  }, [dispatch]);
  //#endregion

  //#region Sayfada hangi data gösterilecek
  const changePage = async (event, newPage) => {
    if (newPage > page && nextUrl) {
      dispatch(fetchPatientsData('next'));
    } else if (newPage < page && prevUrl) {
      dispatch(fetchPatientsData('prev'));
    } else {
      dispatch(setPage(newPage));
    }
  };
  //#endregion

  //#region Update Patient
  const ChangePatients = (event) => {
    dispatch(setPatientsPage(+event.target.value));
    dispatch(setPage(0));
  };
  //#endregion

  const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'gender', label: 'Gender', minWidth: 100 },
    { id: 'birthDate', label: 'Birth Date', minWidth: 150 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 150 },
    { id: 'address', label: 'Address' },
  ];

  return (
    <PatientDataListTable
      patients={patients}
      columns={columns}
      page={page}
      patientsPage={patientsPage}
      status={status}
      error={error}
      nextUrl={nextUrl}
      prevUrl={prevUrl}
      changePage={changePage}
      ChangePatients={ChangePatients}
    />
  );
};

export default PatientDataList;





