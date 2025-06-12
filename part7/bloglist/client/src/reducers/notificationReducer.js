import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload;
      return notification;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const displayInfo = (message, timeInMilliseconds = 5000) => {
  return (dispatch) => {
    dispatch(setNotification({ message, isError: false }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeInMilliseconds);
  };
};

export const displayError = (message, timeInMilliseconds = 5000) => {
  return (dispatch) => {
    dispatch(setNotification({ message, isError: true }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeInMilliseconds);
  };
};

export const { setNotification, clearNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;
