//Commnt
export type Code = 'M24.2' | 'S03.5' | 'M51.2' | 'J10.1' | 'J06.9' | 'Z57.1' | 'N30.0' | 'H54.7' | 'J03.0' | 'L60.1' | 'Z74.3' | 'L20' | 'F43.2' | 'S62.5' | 'H35.29';

export interface Diagnosis {
    code: Code,
    name: string
    latin?: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes? : Array<Diagnosis['code']>
}

export enum HealthCheckRating  {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: object;
}

export interface HospitalEntry  extends BaseEntry {
    type: "Hospital";
    discharge: object;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewPatientEntry = Omit<Patient, 'id'>

export type NewEntry =
  | UnionOmit<HospitalEntry, 'id'>
  | (UnionOmit<OccupationalHealthcareEntry, 'id'> & { employerName: string; sickLeave?: { startDate: string; endDate: string } })
  | (UnionOmit<HealthCheckEntry, 'id'> & { healthCheckRating: HealthCheckRating });


export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>