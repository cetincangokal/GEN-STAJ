//addPatient.js


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPatient } from '../store/feature/patient/patientSlicer';
import { Box, Button, Modal, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#7E402B',
    border: '2px solid #FFFFFF',
    boxShadow: 24,
    p: 4,

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
            <Button onClick={handleOpen} style={{ backgroundColor: '#452419', color: '#FFFFFF' }}>Add Patient</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-InputLabelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style} fontStyle={{ color: '#FFFFFF' }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Add New Patient:
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Given Name:</InputLabel>
                            <input
                                type="text"
                                value={givenName}
                                onChange={(e) => setGivenName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Family Name:</InputLabel>
                            <input type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)} required />
                        </div>

                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Use:</InputLabel>
                            <select value={use} onChange={(e) => setUse(e.target.value)}>
                                <option value="official">Official</option>
                                <option value="usual">Usual</option>
                                <option value="nickname">Nickname</option>
                                <option value="anonymous">Anonymous</option>
                                <option value="old">Old</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Gender:</InputLabel>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                                <option value="unknown">Unknown</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Birth Date:</InputLabel>
                            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                        </div>
                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Phone Numbers:</InputLabel>
                            {telecoms.map((telecom, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={telecom.value}
                                        onChange={(e) =>
                                            handleTelecomChange(index, 'value', e.target.value)
                                        }
                                        required
                                    />
                                    <select
                                        value={telecom.use}
                                        onChange={(e) =>
                                            handleTelecomChange(index, 'use', e.target.value)
                                        }
                                    >
                                        <option value="home">Home</option>
                                        <option value="work">Work</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="old">Old</option>
                                    </select>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTelecom(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={handleAddTelecom} style={{ backgroundColor: '#452419', color: '#FFFFFF' }}>
                                Add Phone Number
                            </button>
                        </div>

                        <div>
                            <InputLabel style={{ color: '#FFFFFF' }}>Address:</InputLabel>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" style={{ backgroundColor: '#452419', color: '#FFFFFF' }}>Create Patient</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default NewPatientForm;

