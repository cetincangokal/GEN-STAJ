import React, { useState } from 'react';
import ConfirmationDialog from './confirmationDialog'; // Onay iletişim kutusu bileşeni
import NewPatientForm from './addPatient';
import EditPatientForm from './editPatientForm';

import { useDispatch } from 'react-redux';
import { addPatient, fetchPatientsData, deletePatient } from '../store/feature/patient/patientSlicer';

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
import { Search as SearchIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

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
  changePage,
  ChangePatients,
}) => {
  const dispatch = useDispatch();

  const [setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedPatient, setEditedPatient] = useState(null);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingPatientId, setDeletingPatientId] = useState(null);

  const handleOpenDeleteConfirmation = (patientId) => {
    setDeleteConfirmationOpen(true);
    setDeletingPatientId(patientId);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setDeletingPatientId(null);
  };

  const handleConfirmDelete = () => {
    if (deletingPatientId) {
      handleDeletePatient(deletingPatientId);
      handleCloseDeleteConfirmation();
    }
  };

  const handleCreatePatient = (patientData) => {
    dispatch(addPatient(patientData));
    setShowAddForm(false);
  };

  const handleDeletePatient = (patientId) => {
    dispatch(deletePatient(patientId));
  };
  


  const handleEditClick = (patient) => {
    setEditedPatient(patient);
    setShowEditForm(true);
  };



  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    dispatch(fetchPatientsData({ type: 'search', searchTerm }));
  };

  return (
    <div>
      <AppBar position="static" sx={{ background: '#3A98B9' }}>
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
      <div style={{ marginTop: '20px' }}>
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
                          width: column.width,
                          position: 'sticky',
                          top: 0,
                          backgroundColor: '#3A98B9',
                          zIndex: 1,
                          color: 'white',
                          fontSize: '14px',
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell
                      style={{
                        minWidth: 150, // Set a specific width for the TableCell containing Edit and Delete icons
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#3A98B9',
                        zIndex: 1,
                        color: 'white',
                        fontSize: '14px',
                      }}
                    >

                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients
                    .slice(page * patientsPage, page * patientsPage + patientsPage)
                    .map((patient) => (
                      <TableRow
                        key={patient.id}
                        style={{ backgroundColor: '#FFF1DC', borderRadius: '10px' }}
                      >
                        <TableCell>{patient.id || '-'}</TableCell>
                        <TableCell>
                          {`${patient.name?.[0]?.given?.[0] || ''} ${patient.name?.[0]?.family || ''} ${patient.name?.[0].text || ''
                            } `}
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
                        <TableCell>
                          <IconButton onClick={() => handleEditClick(patient)} sx={{ color: '#D09765' }}>

                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleOpenDeleteConfirmation(patient.id)}
                            sx={{ color: '#D09765' }} // Customize icon color if needed
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{ background: '#3A98B9' }}
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
        {editedPatient && (
          <EditPatientForm
            patient={editedPatient}
            open={showEditForm}
            onClose={() => setShowEditForm(false)}
          />
        )}
        <ConfirmationDialog
          open={deleteConfirmationOpen}
          onClose={handleCloseDeleteConfirmation}
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete this patient?"
        />
      </div>
    </div>
  );
};

export default PatientDataListTable;
