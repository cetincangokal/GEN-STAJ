// NewPatientForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addPatient} from '../store/feature/patient/patientSlicer';

const NewPatientForm = () => {
    const dispatch = useDispatch();
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [use, setUse] = useState('official');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [telecom, setTelecom] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new patient object from the form data
        const newPatient = {
            resourceType: 'Patient',
            name: [
                {
                  use, // Name kullanım türü (örn. "official")
                  family: familyName, // Soyadı
                  given: [givenName], // İsim veya isimler (dizi olarak)
                },
              ],
            gender,
            birthDate,
            telecom: [{ system: 'phone', value: telecom }],
            address: [{ line: [address] }],
        };

        try {
            // Dispatch the addPatient async thunk

            // Clear the form fields after successful submission
            setGivenName('');
            setFamilyName('');
            setUse('official');
            setGender('');
            setBirthDate('');
            setTelecom('');
            setAddress('');
            dispatch(addPatient(newPatient));

        } catch (error) {
            console.error('Error creating patient:', error);
            // Handle error if necessary
        }
    };

    return (
        <form onSubmit={handleSubmit}>

<label>Given Name:</label>
      <input type="text" value={givenName} onChange={(e) => setGivenName(e.target.value)} required />

      <label>Family Name:</label>
      <input type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)} required />

      <label>Use:</label>
      <select value={use} onChange={(e) => setUse(e.target.value)}>
        <option value="official">Official</option>
        <option value="usual">Usual</option>
        <option value="nickname">Nickname</option>
        <option value="anonymous">Anonymous</option>
        <option value="old">Old</option>
      </select>

            <label>Gender:</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />

            <label>Birth Date:</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />

            <label>Telecom:</label>
            <input type="tel" value={telecom} onChange={(e) => setTelecom(e.target.value)} required />

            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />

            <button type="submit">Create Patient</button>
        </form>
    );
};

export default NewPatientForm;
