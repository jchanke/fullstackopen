import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      const message = action.payload
      return message
    },
    clearMessage(state, action) {
      return null
    },
  }
})

export const setNotification = (message, timeInSeconds) => {
  return async (dispatch) => {
    const timeInMilliseconds = timeInSeconds * 1000
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, timeInMilliseconds)
  }
}

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer