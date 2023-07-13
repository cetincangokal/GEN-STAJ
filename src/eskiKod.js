import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';


const PatientDataList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = 'https://hapi.fhir.org/baseR5/Patient?_format=json';
        const response = await fetch(URL);
        const data = await response.json();
        setPatients(data.entry.map((entry) => entry.resource));
      } catch (error) {
        console.error('Veri alinamadi:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'gender', label: 'Gender', minWidth: 100 },
    { id: 'birthDate', label: 'Birth Date', minWidth: 150 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 150 },
    { id: 'address', label: 'Address' },
  ];

  const [page, setPage] = React.useState(0);
  const [patientsPerPage, setPatientsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePatientsPerPage = (event) => {
    setPatientsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    
    <div>
      <h1>Patients List</h1>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#997676',
                      zIndex: 1,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {patients?.slice(page * patientsPerPage, page * patientsPerPage + patientsPerPage)
              .map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id || '-'}</TableCell>
                  <TableCell>{patient.name?.[0]?.given?.[0] || '-'} {patient.name?.[0]?.family || '-'}</TableCell>
                  <TableCell>{patient.gender || '-'}</TableCell>
                  <TableCell>{patient.birthDate || '-'}</TableCell>
                  <TableCell>{patient.telecom?.[1]?.value || '-'}</TableCell>
                  <TableCell>
                    {patient.address?.[0]?.line?.join(', ') || '-'}, {patient.address?.[0]?.city || '-'}, {patient.address?.[0]?.state || '-'}, {patient.address?.[0]?.country || '-'}
            </TableCell>
                    </TableRow>
            ))}
            
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={patients.length}
        rowsPerPage={patientsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangePatientsPerPage}
      />
      </Paper>
    </div>
  );
};

export default PatientDataList;
