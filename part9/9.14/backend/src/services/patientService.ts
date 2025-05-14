import patientsData from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';
import patients from '../data/patients';

const getEntries = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = ( entry: NewPatient ) : Patient => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatient,
  findById
};