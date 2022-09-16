import React, { useState } from 'react'
import { useLogin } from "../hooks/useLogin"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { login, isLoading, error } = useLogin()

  const handleClick = async (e) => {
    await login(username, password)
  }

  return (
    <div className='container'>
      <form className='login'>
        <h1>Sign in to view workouts</h1>

        <div className='form-group'>
          <label htmlFor='username'>Username: </label>
          <input 
            id='username'
            type="text"
            onChange={ (e) => setUsername(e.target.value)}
            value={username}
            autoComplete="off"
            autoFocus="on"
          />
        </div>
        
        <div className='form-group'>
          <label htmlFor='password'>Password: </label>
          <input 
            id='password'
            type="password"
            onChange={ (e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
          />
        </div>

        <button onClick={handleClick} disabled={isLoading}>Log In</button>
        { error && <div className='error'>{ error }</div>}
      </form>
    </div>
  )
}
