import patientsData from '../data/patients';
import { Patient, NonSensitivePatient } from '../types';

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatient
};