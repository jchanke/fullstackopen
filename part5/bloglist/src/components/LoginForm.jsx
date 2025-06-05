import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ tryLoginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    const loggedInSuccess = tryLoginUser({ username, password })
    if (loggedInSuccess) {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleLoginSubmit}>
      <label htmlFor="username">username</label>
      <input
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <label htmlFor="password">password</label>
      <input
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button type="submit">login</button>
    </form >
  )
}

LoginForm.propTypes = {
  tryLoginUser: PropTypes.func.isRequired,
}

export default LoginForm