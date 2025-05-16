import { HospitalEntry } from "../../types";

type Props = {
    entry: HospitalEntry
};

const HospitalDetails = ({ entry } : Props) => {
    if(!entry.discharge)
        return null;

    return (
        <>
            Discharge criteria and date: {entry.discharge.criteria} {entry.discharge.date}
        </>
    );
};

export default HospitalDetails;