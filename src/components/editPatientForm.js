import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePatient } from '../store/feature/patient/patientSlicer';
import {
    Modal,
    Box,
    Typography,
    InputLabel,
    TextField,
    Button,
    Select,
    MenuItem,
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#75C4E0',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'row',
};

const columnStyle = {
    flex: '1 1 0',
    padding: '8px',
};

const EditPatientForm = ({ patient, open, onClose }) => {
    const dispatch = useDispatch();
    const [updatedPatient, setUpdatedPatient] = useState(patient);
    
    const resetUpdatedPatient = async() => {
        setUpdatedPatient(patient);
};

    const handleInputChange = (field, value) => {
        setUpdatedPatient((prevPatient) => ({
            ...prevPatient,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updatePatient({ id: updatedPatient.id, patientData: updatedPatient })); // Güncellenen hastanın id'sini gönderin

            onClose();
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };

    const handleAddTelecom = () => {
        setUpdatedPatient((prevPatient) => ({
            ...prevPatient,
            telecom: [
                ...(prevPatient.telecom || []), // Kontrol eklendi
                { system: 'phone', value: '', use: 'work', rank: (prevPatient.telecom?.length || 0) + 1 }, // Kontrol eklendi
            ],
        }));
    };

    const handleRemoveTelecom = (index) => {
        setUpdatedPatient((prevPatient) => ({
            ...prevPatient,
            telecom: prevPatient.telecom.filter((telecom, i) => i !== index),
        }));
    };

    const handleTelecomChange = (index, field, value) => {
        setUpdatedPatient((prevPatient) => ({
            ...prevPatient,
            telecom: (prevPatient.telecom || []).map((telecom, i) =>
                i === index ? { ...telecom, [field]: value } : telecom
            ),
        }));
    };


    return (
        <Modal
            open={open}
            onClose={() => {
                onClose();
                resetUpdatedPatient(); // State'i sıfırla
            }}            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style} fontStyle={{ color: '#FFFFFF' }}>
                <div style={columnStyle}>
                    <Typography variant="h6" component="h2">
                        Edit Patient:
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Given Name:</InputLabel>
                            <TextField
                                type="text"
                                value={updatedPatient.name?.[0]?.given?.[0]}
                                onChange={(e) =>
                                    handleInputChange('name', [{ given: [e.target.value] }])
                                }
                                
                            />
                        </div>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Family Name:</InputLabel>
                            <TextField
                                type="text"
                                value={updatedPatient.name?.[0]?.family}
                                onChange={(e) =>
                                    handleInputChange('name', [{ family: e.target.value }])
                                }
                                
                            />
                        </div>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Use:</InputLabel>
                            <Select
                                value={updatedPatient.name?.[0]?.use || ''}
                                onChange={(e) =>
                                    handleInputChange('name', [{ use: e.target.value }])
                                }
                            >
                                <MenuItem value="official">Official</MenuItem>
                                <MenuItem value="usual">Usual</MenuItem>
                                <MenuItem value="nickname">Nickname</MenuItem>
                                <MenuItem value="anonymous">Anonymous</MenuItem>
                                <MenuItem value="old">Old</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Gender:</InputLabel>
                            <Select
                                name="Gender"
                                value={updatedPatient.gender || ''}
                                onChange={(e) =>
                                    handleInputChange('gender', e.target.value)
                                }
                                
                            >
                                <MenuItem value="unknown">Unknown</MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Birth Date:</InputLabel>
                            <TextField
                                type="date"
                                value={updatedPatient.birthDate || ''}
                                onChange={(e) =>
                                    handleInputChange('birthDate', e.target.value)
                                }
                                
                            />
                        </div>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Phone Numbers:</InputLabel>
                            {updatedPatient.telecom && updatedPatient.telecom.map((telecom, index) => (
                                <div key={index}>
                                    <TextField
                                        type="text"
                                        value={telecom.value || ''}
                                        onChange={(e) =>
                                            handleTelecomChange(index, 'value', e.target.value)
                                        }
                                        
                                    />
                                    <Select
                                        value={telecom.use || ''}
                                        onChange={(e) =>
                                            handleTelecomChange(index, 'use', e.target.value)
                                        }
                                    >
                                        <MenuItem value="home">Home</MenuItem>
                                        <MenuItem value="work">Work</MenuItem>
                                        <MenuItem value="mobile">Mobile</MenuItem>
                                        <MenuItem value="old">Old</MenuItem>
                                    </Select>
                                    {index > 0 && (
                                        <Button
                                            style={{ backgroundColor: '#4FA4C3', color: '#FFFFFF' }}
                                            type="button"
                                            onClick={() => handleRemoveTelecom(index)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={handleAddTelecom}
                                style={{
                                    backgroundColor: '#4FA4C3',
                                    color: '#FFFFFF',
                                    margin: '5px',
                                }}
                            >
                                Add Phone Number
                            </Button>
                        </div>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Address:</InputLabel>
                            <TextField
                                type="text"
                                value={updatedPatient.address?.[0]?.line?.[0] || ''}
                                onChange={(e) =>
                                    handleInputChange('address', [{ line: [e.target.value] }])
                                }
                                
                            />
                        </div>

                        <Button
                            type="submit"
                            style={{
                                backgroundColor: '#4FA4C3',
                                color: '#FFFFFF',
                                marginTop: '15px',
                                marginLeft: '80px',
                            }}
                        >
                            Update Patient
                        </Button>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default EditPatientForm;
