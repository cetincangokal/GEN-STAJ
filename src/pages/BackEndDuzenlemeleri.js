import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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

  return (

    <div>
      <h1>Patients List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients?.map((patient) => (
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
    </div>
  );
};

export default PatientDataList;
