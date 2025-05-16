import { OccupationalHealthcareEntry } from "../../types";

type Props = {
    entry: OccupationalHealthcareEntry
};

const OccupationalHealthcareDetails = ({ entry } : Props) => {
    return (
        <>
            Employer name: {entry.employerName}
            <br/>
            {entry.sickLeave && `Sick leave from ${entry.sickLeave.startDate} until ${entry.sickLeave.endDate}`}
        </>
    );
};

export default OccupationalHealthcareDetails;