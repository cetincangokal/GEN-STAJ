import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import Client from 'fhir-kit-client';

const PatientDataList = () => {
  const [patients, setPatients] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [page, setPage] = useState(0);
  const [patientsPage, setPatientsPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://hapi.fhir.org/baseR5/Patient?_format=json'
        const fhirClient = new Client({
          baseUrl: url
        });

        const searchResponse = await fhirClient.search({
          resourceType: 'Patient',
          searchParams: {}
        });

        const patientsData = searchResponse.entry.map(entry => entry.resource);
        setPatients(patientsData);

        const nextLink = searchResponse.link.find(link => link.relation === 'next');
        setNextUrl(nextLink?.url || '');
      } catch (error) {
        console.error('Veri Alinamadi', error);
      }
    };
    fetchData();
  }, []);

  const fetchNewData = async () => {
    try {
      const url = 'https://hapi.fhir.org/baseR5/Patient?_format=json'
      const fhirClient = new Client({
        baseUrl: url
      });

      const response = await fhirClient.request(nextUrl);
      const newPatients = patients.concat(response.entry.map(entry => entry.resource));
      setPatients(newPatients);

      const nextLink = response.link.find(link => link.relation === 'next');
      setNextUrl(nextLink?.url || '');
      setPage(page + 1);
    } catch (error) {
      console.error('Veri Alinamadi', error);
    }
  };

  const changePage = (event, newPage) => {
    if (newPage > page && nextUrl) {
      fetchNewData();
    } else {
      setPage(newPage);
    }
  };

  const ChangePatients = (event) => {
    setPatientsPage(+event.target.value);
    setPage(0);
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
      <h1>Patients Data</h1>
      <Paper sx={{ width: '80%', overflow: 'hidden', borderRadius: '10px' }}>
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
                      backgroundColor: '#452419',
                      zIndex: 1,
                      color: 'white', // Yazı rengi beyaz
                      fontSize: '14px', // Yazı boyutu küçük
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {patients
                .slice(page * patientsPage, page * patientsPage + patientsPage)
                .map((patient) => (
                  <TableRow key={patient.id} style={{ backgroundColor: '#EDD2CA', borderRadius: '10px' }}>
                    <TableCell>{patient.id || '-'}</TableCell>
                    <TableCell>
                      {patient.name?.[0]?.given?.[0] || '-'} {patient.name?.[0]?.family || '-'}
                    </TableCell>
                    <TableCell>{patient.gender || '-'}</TableCell>
                    <TableCell>{patient.birthDate || '-'}</TableCell>
                    <TableCell>{patient.telecom?.[1]?.value || '-'}</TableCell>
                    <TableCell>
                      {patient.address?.[0]?.line?.join(', ') || '-'}, {patient.address?.[0]?.city || '-'},{' '}
                      {patient.address?.[0]?.state || '-'}, {patient.address?.[0]?.country || '-'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        sx={{background: '#452419'}}
        style={{color:'white', fontSize: '14px'}}
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={patients.length}
          rowsPerPage={patientsPage}
          page={page}
          onPageChange={changePage}
          onRowsPerPageChange={ChangePatients}
        />
      </Paper>
    </div>
  );
};

export default PatientDataList;
