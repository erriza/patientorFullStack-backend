import patientData from "../../data/patient";
import { v1 as uuid } from 'uuid';

import { NonSensitivePatient, Patient, NewPatientEntry } from "../../types";

const getPatient = (): NonSensitivePatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender, occupation
    }))
}

const addPatient =(entry: NewPatientEntry): Patient => {
    const NewPatientEntry = {
        id: uuid(),
        ...entry
    };

    patientData.push(NewPatientEntry);
    return NewPatientEntry;
}

export default {
    getPatient,
    addPatient
}