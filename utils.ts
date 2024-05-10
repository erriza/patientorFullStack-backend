import { NewPatientEntry, Gender } from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };

        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
}

const parseGender = (gender: unknown): Gender => {
    console.log('gender', gender)
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing fieldssss: ' + gender);
    }
    return gender;
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
}


const parseOccupation = (text: unknown): string => {
    if(!text || !isString(text)) {
        throw new Error('Incorrect or missing field: ' + text);
    }
    return text;
}

const parseName = (text: unknown): string => {
    if(!text || !isString(text)) {
        throw new Error('Incorrect or missing field: ' + text);
    }
    return text;
}

const parseSSN = (text: unknown): string => {
    if(!text || !isString(text)) {
        throw new Error('Incorrect or missing field: ' + text);
    }
    return text;
}

export default toNewPatientEntry;