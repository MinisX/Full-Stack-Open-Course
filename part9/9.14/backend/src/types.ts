import { z } from "zod";
import { newEntrySchema } from './utils';

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string // optional property
}

// infer the type from schema
export type NewPatientEntry = z.infer<typeof newEntrySchema>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = "other"
}

export interface Patient extends NewPatientEntry {
    id: string,
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>; 