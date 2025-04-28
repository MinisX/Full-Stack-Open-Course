import { useSelector } from 'react-redux';

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

  return <div className={notification.error ? 'error' : 'success'}>{notification.text}</div>;
};

export default Notification;
