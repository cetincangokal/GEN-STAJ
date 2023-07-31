import React, { useState } from 'react';
import NewPatientForm from './addPatient';
import { useDispatch } from 'react-redux';
import { addPatient, fetchPatientsData } from '../store/feature/patient/patientSlicer';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const PatientDataListTable = ({
  patients,
  columns,
  page,
  patientsPage,
  status,
  totalPatient,
  error,
  nextUrl,
  prevUrl,
  count,
  changePage,
  ChangePatients,
}) => {
  const dispatch = useDispatch();

  const [setShowAddForm] = useState(false);

  const handleCreatePatient = (patientData) => {
    dispatch(addPatient(patientData));
    setShowAddForm(false);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    dispatch(fetchPatientsData({ type: 'search', searchTerm }));
  };

  return (
    <div>
      <AppBar position="static" sx={{ background: '#452419' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Patients Data
          </Typography>
          <div>
            <InputBase
              style={{ color: 'white', marginRight: '10px' }}
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton onClick={handleSearch} sx={{ color: 'white' }}>
              <SearchIcon />
            </IconButton>
          </div>
            <NewPatientForm
              handleCreatePatient={handleCreatePatient}
              open={setShowAddForm}
              onClose={() => setShowAddForm(false)}
            />
        </Toolbar>
      </AppBar>
      <div style={{marginTop: '20px'}}>
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
                    <TableRow
                      key={patient.id}
                      style={{ backgroundColor: '#EDD2CA', borderRadius: '10px' }}
                    >
                      <TableCell>{patient.id || '-'}</TableCell>
                      <TableCell>
                        {`${patient.name?.[0]?.given?.[0] || ''} ${patient.name?.[0]?.family || ''
                          } ${patient.name?.[0].text || ''} `}
                      </TableCell>
                      <TableCell>{patient.gender || '-'}</TableCell>
                      <TableCell>{patient.birthDate || '-'}</TableCell>
                      <TableCell>
                        {patient.telecom?.map((phone) => (
                          <div key={phone.value}>
                            <div>{phone.value}</div>
                            <div>{phone.use}</div>
                          </div>
                        ))}
                      </TableCell>
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
            rowsPerPageOptions={[20]}
            component="div"
            count={totalPatient}
            rowsPerPage={patientsPage}
            page={page}
            onPageChange={changePage}
            onRowsPerPageChange={ChangePatients}
            nextIconButtonProps={{
              disabled: !nextUrl,
            }}
            backIconButtonProps={{
              disabled: !prevUrl,
            }}
          />
        </Paper>
      )}
    </div>
    </div>
  );
};

export default PatientDataListTable;
