const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 1,
    marginBottom: 10
  }

    if (!message) {
      return null
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  export default Notification