import { createSlice } from "@reduxjs/toolkit"

const initialState = {text: '', error: false}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        text: action.payload.text,
        error: action.payload.error
      }
    },
    removeNotification(state, action) {
      return initialState
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (message, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification({
      text: message.text,
      error: message.error
    }));

    setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer