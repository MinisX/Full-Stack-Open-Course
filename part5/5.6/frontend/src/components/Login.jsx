import {useState} from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({setUser, setNotification}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setNotification({error: false, text: `You have succesfully logged in as ${username}`})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({error: true, text: `Wrong credentials`})
      console.error('Wrong credetinals')
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
          <div>
            username 
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password 
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>  
    </div>
  )
}

export default Login