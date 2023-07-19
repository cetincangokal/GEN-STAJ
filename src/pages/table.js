import { Table } from '@mui/material';
import React from 'react';
import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from '@mui/material';

const PatientDataListTable = ({ patients, columns, page, patientsPage, status, error, nextUrl, prevUrl, changePage, ChangePatients }) => {
  return (
    <div>
      <h1>Patients Data</h1>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
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
                        color: 'white',
                        fontSize: '14px',
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
                        {`${patient.name?.[0]?.given?.[0] || '-'} ${patient.name?.[0]?.family || '-'}`}
                      </TableCell>
                      <TableCell>{patient.gender || '-'}</TableCell>
                      <TableCell>{patient.birthDate || '-'}</TableCell>
                      <TableCell>{patient.telecom?.[1]?.value || '-'}</TableCell>
                      <TableCell>
                        {`${patient.address?.[0]?.line?.join(', ') || '-'},
                         ${patient.address?.[0]?.city || '-'},
                         ${patient.address?.[0]?.state || '-'},
                         ${patient.address?.[0]?.country || '-'}`}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ background: '#452419' }}
            style={{ color: 'white', fontSize: '14px' }}
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={patients.length}
            rowsPerPage={patientsPage}
            page={page}
            onPageChange={changePage}
            onRowsPerPageChange={ChangePatients}
            nextIconButtonProps={{
              disabled: !nextUrl
            }}
            backIconButtonProps={{
              disabled: !prevUrl
            }}
          />
        </Paper>
      )}
    </div>
  );
};

export default PatientDataListTable;
