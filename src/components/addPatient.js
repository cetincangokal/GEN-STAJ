
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPatient } from '../store/feature/patient/patientSlicer';
import { Box, Button, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';


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

const NewPatientForm = () => {
    const dispatch = useDispatch();
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [use, setUse] = useState('official');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [telecoms, setTelecoms] = useState([
        { system: 'phone', value: '', use: 'work', rank: 1 },
    ]);
    const [address, setAddress] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPatient = {
            resourceType: 'Patient',
            name: [
                {
                    use,
                    family: familyName,
                    given: [givenName],
                },
            ],
            gender,
            birthDate,
            telecom: telecoms,
            address: [{ line: [address] }],
        };

        try {
            setGivenName('');
            setFamilyName('');
            setUse('official');
            setGender('');
            setBirthDate('');
            setTelecoms([{ system: 'phone', value: '', use: 'work', rank: 1 }]);
            setAddress('');
            dispatch(addPatient(newPatient));

            setOpen(false);

        } catch (error) {
            console.error('Error creating patient:', error);
        }
    };

    const handleAddTelecom = () => {
        setTelecoms((prevTelecoms) => [
            ...prevTelecoms,
            { system: 'phone', value: '', use: 'work', rank: prevTelecoms.length + 1 },
        ]);
    };

    const handleRemoveTelecom = (index) => {
        setTelecoms((prevTelecoms) =>
            prevTelecoms.filter((telecom, i) => i !== index)
        );
    };

    const handleTelecomChange = (index, field, value) => {
        setTelecoms((prevTelecoms) =>
            prevTelecoms.map((telecom, i) =>
                i === index ? { ...telecom, [field]: value } : telecom
            )
        );
    };

    return (
        <div>
            <Button onClick={handleOpen} style={{ backgroundColor: '#4FA4C3', color: '#FFFFFF' }}>Add Patient</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-InputLabelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style} fontStyle={{ color: '#FFFFFF' }}>
                    <div style={columnStyle}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            Add New Patient:
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <InputLabel style={{ color: '#FFFFFF' }}>Given Name:</InputLabel>
                                <TextField
                                    type="text"
                                    value={givenName}
                                    onChange={(e) => setGivenName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <InputLabel style={{ color: '#FFFFFF' }}>Family Name:</InputLabel>
                                <TextField type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)} required />
                            </div>

                            <div>
                                <InputLabel style={{ color: '#FFFFFF' }}>Use:</InputLabel>
                                <Select value={use} onChange={(e) => setUse(e.target.value)}>
                                    <MenuItem value="official">Official</MenuItem>
                                    <MenuItem value="usual">Usual</MenuItem>
                                    <MenuItem value="nickname">Nickname</MenuItem>
                                    <MenuItem value="anonymous">Anonymous</MenuItem>
                                    <MenuItem value="old">Old</MenuItem>
                                </Select>
                            </div>

                            <div>
                                <InputLabel style={{ color: '#FFFFFF' }}>Gender:</InputLabel>
                                <Select name='Gender' value={gender || 'unknown'} onChange={(e) => setGender(e.target.value)} required>
                                    <MenuItem value="unknown">Unknown</MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </div>

                        </form>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div style={columnStyle}>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Birth Date:</InputLabel>
                            <TextField type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                        </div>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Phone Numbers:</InputLabel>
                            {telecoms.map((telecom, index) => (
                                <div key={index}>
                                    <TextField
                                        type="text"
                                        value={telecom.value}
                                        onChange={(e) =>
                                            handleTelecomChange(index, 'value', e.target.value)
                                        }
                                        required
                                    />
                                    <Select
                                        value={telecom.use}
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
                                        <Button style={{ backgroundColor: '#4FA4C3', color: '#FFFFFF' }}
                                            type="button"
                                            onClick={() => handleRemoveTelecom(index)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" onClick={handleAddTelecom} style={{ backgroundColor: '#4FA4C3', color: '#FFFFFF', margin:'5px' }}>
                                Add Phone Number
                            </Button>
                        </div>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Address:</InputLabel>
                            <TextField
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" style={{ backgroundColor: '#4FA4C3', color: '#FFFFFF', marginTop: '15px', marginLeft: '80px' }}>Create Patient</Button>

                      </div>
                    </form>  
                </Box>
            </Modal>
        </div>
    );
};

export default NewPatientForm;

