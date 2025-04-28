import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/users';

const initialState = []

const usersSlice = createSlice({
  name : 'users',
  initialState,
  reducers : {
    setUsers(state, action){
      return action.payload
    },
    resetUsers(state,action){
      return initialState
    }
  }
})

export const { setUsers, resetUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    userService
      .getAll()
      .then((result) => dispatch(setUsers(result)))
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }
}

export default usersSlice.reducer