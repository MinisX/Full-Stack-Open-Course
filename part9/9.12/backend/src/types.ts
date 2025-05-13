export interface Diagnosis {
    code: string,
    name: string,
    latin?: string // optional property
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;