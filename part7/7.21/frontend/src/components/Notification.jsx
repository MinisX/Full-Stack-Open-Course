import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (
    notification === null ||
    notification === undefined ||
    notification.text === null ||
    notification.text === ''
  ) {
    return null;
  }

  return <Alert variant={notification.error ? 'error' : 'success'}>{notification.text}</Alert>;
};

export default Notification;
