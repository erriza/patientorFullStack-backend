import patientData from "../../data/patient";
import { v1 as uuid } from 'uuid';

import { NonSensitivePatient, Patient, NewPatientEntry, NewEntry, Entry } from "../../types";


const getPatient = (): NonSensitivePatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender, 
        occupation,
        entries
    }))
}

const getPatientById = (id: string): Patient[] => {
    return patientData.filter(patient => patient.id === id);
}

const addPatient =(entry: NewPatientEntry): Patient => {
    const NewPatientEntry = {
        id: uuid(),
        ...entry,
        entries: []
    };

    patientData.push(NewPatientEntry);
    return NewPatientEntry;
}

const findPatientById = (id: string): Patient | undefined => {
    return patientData.find(patient => patient.id === id);
};

const createEntry = (patientId: string, entry: NewEntry): Entry => {
    const patient = findPatientById(patientId);
    if(!patient) {
        throw new Error('No patient found!');
    }

    let newEntry: Entry;

    if ('healthCheckRating' in entry) {
        // It's a HealthCheckEntry
        newEntry = {
            id: uuid(),
            ...entry
        };
    } else if ('employerName' in entry) {
        // It's an OccupationalHealthcareEntry
        newEntry = {
            id: uuid(),
            ...entry
        };
    } else if ('discharge' in entry) {
        // It's a HospitalEntry
        newEntry = {
            id: uuid(),
            ...entry
        };
    } else {
        throw new Error('Invalid entry type');
    }
    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatient,
    createEntry,
    getPatientById,
    findPatientById,
    addPatient
}