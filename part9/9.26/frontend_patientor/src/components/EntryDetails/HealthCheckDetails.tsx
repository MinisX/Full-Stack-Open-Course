import { HealthCheckEntry } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
    entry: HealthCheckEntry;
};

const heartColors = ["green", "yellow", "orange", "red"];

const HealthCheckDetails = ({entry} : Props) => {
    return(
        <>
            <FavoriteIcon
                style={{
                    color: heartColors[entry.healthCheckRating]
                }}
            />
        </>
    );
};

export default HealthCheckDetails;