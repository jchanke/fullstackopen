import { createContext, useContext, useReducer } from "react"
import PropTypes from 'prop-types'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'notification-set':
      return action.payload
    case 'notification-clear':
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default NotificationContext