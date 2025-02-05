const Notification = ({ notification }) => {
    if (notification === null || notification.text === null || notification.text === '') {
      return null
    }
  
    return (
      <div className = {notification.error ? 'error' : 'success'}>
        {notification.text}
      </div>
    )
  }

  export default Notification