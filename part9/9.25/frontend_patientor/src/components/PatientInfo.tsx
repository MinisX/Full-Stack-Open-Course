import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useEffect, useState } from "react";
import patientService from '../services/patients';

type Props = {
    diagnoses: Diagnosis[]
};

const PatientInfo = ({ diagnoses } : Props) => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        if(id){
            patientService.getById(id)
            .then(data => setPatient(data));
        }
    }, [id]);

     if(!patient)
        return null;

    return(
        <>
        <h1>
            {patient.name}{" "}
            {patient.gender === "male" ? (
                <MaleIcon />
            ) : patient.gender === "female" ? (
                <FemaleIcon />
            ) : (
                <NoAccountsIcon />
            )}
        </h1>
        {`ssn: ${patient.ssn}`}
        <br/>
        {`occupation: ${patient.occupation}`}
        
        <h2>entries</h2>
        {patient.entries.map((entry) => (
        <div key={entry.id}>
            <p>
            {entry.date} <i>{entry.description}</i>
            </p>
            <ul>
            {entry.diagnosisCodes?.map((code) => (
                <li key={code}>{code}</li>
            ))}
            </ul>
        </div>
        ))}
        </>
    );
};

export default PatientInfo;