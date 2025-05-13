import { NewPatient } from "./types";

const toNewPatientEntry = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
        const newEntry: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

// text is string is a predicate
// The return type text is string tells TypeScript that if the function returns true, 
// then the text parameter can safely be treated as a string in the code that follows.

// The general form of a type predicate is parameterName is Type where the parameterName 
// is the name of the function parameter and Type is the targeted type.
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date))
        throw new Error('Incorrect or missing date: ' + date);

    return date;
};

const parseGender = (gender: unknown): string => {
    if(!gender || !isString(gender) || !['male', 'female'].includes(gender))
        throw new Error('Incorrect or missing gender: ' + gender);

    return gender;
};


const parseSsn = (ssn: unknown): string => {
    return parseName(ssn);
};

const parseOccupation = (occupation: unknown): string => {
    return parseName(occupation);
};

export default toNewPatientEntry;