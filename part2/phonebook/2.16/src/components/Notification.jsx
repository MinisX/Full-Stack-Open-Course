const Notification = ({ message }) => {
    if (!message) {
      return null
    }

    const notificationStyle = {
      color: message.isError === true ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 1,
      marginBottom: 10
    }
  
    return (
      <div style={notificationStyle}>
        {message.message}
      </div>
    )
  }

  export default Notification