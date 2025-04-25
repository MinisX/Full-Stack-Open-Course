import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotificationWithTimeout } from "./notificationReducer";

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers : {
    setUser (state, action){
      return action.payload
    },
    removeUser (state, action){
      return initialState
    }
  }
})

export const {setUser, removeUser} = userSlice.actions

export const doLogin = (username, password) => {
  return async (dispatch) => {
    console.log(username, password)
    try {
          const user = await loginService.login({
            username,
            password
          });

          window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
          blogService.setToken(user.token)
          dispatch(setUser(user))
          dispatch(
            setNotificationWithTimeout(
              { error: false, text: `You have succesfully logged in as ${username}` },
              5
            )
          );
        } catch (exception) {
          dispatch(setNotificationWithTimeout({ error: true, text: 'Wrong credentials' }, 5));
          console.error('Wrong credetinals');
        }
    };
}

export const sessionLogin = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          dispatch(setUser(user));
          blogService.setToken(user.token);
        }
  }
}

export const doLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(setUser(null))
  }
}

export default userSlice.reducer