const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  
  const notificationStyle = {
    color: message.isSuccess ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 1,
    marginBottom: 10
  }
  
    return (
      <div style={notificationStyle}>
        {message.text}
      </div>
    )
  }

  export default Notification