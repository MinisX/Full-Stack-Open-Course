import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useEffect, useState } from "react";
import patientService from '../services/patients';
import EntryDetails from "./EntryDetails/EntryDetails";

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

    const entryStyle = {
       padding: 10,
       border: 'solid',
       borderWidth: 1,
       marginBottom: 5,
       borderRadius: 8
    };

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
        <div key={entry.id} style={entryStyle}>
            <p>
            {entry.date} 
            <br/>
            <i>{entry.description}</i>
            </p>
            <ul>
                {entry.diagnosisCodes?.map((code) => {
                    const diagnosis = diagnoses.find(d => d.code === code);
                    return (
                        <li key={code}>
                            {code} {diagnosis ? diagnosis.name : ""}
                        </li>
                    );
                })}
            </ul>
            <EntryDetails entry={entry}/>
            <br/>
            diagnose by {entry.specialist}
        </div>
        ))}
        </>
    );
};

export default PatientInfo;