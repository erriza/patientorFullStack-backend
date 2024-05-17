import { NewPatientEntry, Gender, NewEntry, HealthCheckRating  } from "./types";

export const toNewEntry = (object: any): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    const { description, date, specialist, type, healthCheckRating, employerName, sickLeave, discharge, diagnosisCodes } = object;

    const newEntryBase: Omit<NewEntry, 'type'> = {
        description: parseString(description, 'description'),
        date: parseDate(date),
        specialist: parseString(specialist, 'specialist'),
        diagnosisCodes: diagnosisCodes
    }

    let newEntry: NewEntry;

    switch (type) {
        case 'HealthCheck':
            if (healthCheckRating === undefined) {
                throw new Error('healthCheckRating is required for HealthCheckEntry');
            }
            newEntry = {
                ...newEntryBase,
                type,
                healthCheckRating: parseHealthCheckRating(healthCheckRating),
            };
            break;
        case 'OccupationalHealthcare':
            if (employerName === undefined) {
                throw new Error('employerName is required for OccupationalHealthcareEntry');
            }
            newEntry = {
                ...newEntryBase,
                type,
                employerName: parseEmployerName(employerName),
                sickLeave: parseSickLeave(sickLeave),
            };
            break;
        case 'Hospital':
            if (discharge === undefined) {
                throw new Error('discharge is required for HospitalEntry');
            }
            newEntry = {
                ...newEntryBase,
                type,
                discharge: parseDischarge(discharge),
            };
            break;
        default:
            throw new Error('Invalid entry type');
    }

    return newEntry;
}

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation, 'occupation'),
            entries: []
        };

        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
}

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
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

const parseString = (value: any, name: string): string => {
    if (!value || typeof value !== 'string') {
        throw new Error(`Incorrect or missing ${name}: ${value}`);
    }
    return value;
};

const parseName = (text: unknown): string => {
    return parseString(text, 'name');
}

const parseSSN = (text: unknown): string => {
    return parseString(text, 'SSN');
}

const parseSickLeave = (sickLeave: any): { startDate: string, endDate: string } | undefined => {
    if (!sickLeave) {
        return undefined;
    }

    if (!isString(sickLeave.startDate) || !isDate(sickLeave.startDate) ||
        !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
        throw new Error('Incorrect or missing sick leave dates');
    }

    return {
        startDate: sickLeave.startDate,
        endDate: sickLeave.endDate
    };
}

const parseDischarge = (discharge: any): { date: string, criteria: string } => {
    if (!discharge || !isString(discharge.date) || !isDate(discharge.date) ||
        !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge information');
    }

    return discharge;
}

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!isHealthCheckRating(healthCheckRating)) {
        throw new Error(`Incorrect or missing health check rating: ${healthCheckRating}`);
    }
    return healthCheckRating;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseEmployerName = (name: any): string => {
    return parseString(name, 'employerName');
};