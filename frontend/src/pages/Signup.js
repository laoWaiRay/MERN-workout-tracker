import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

export default function Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { signup, isLoading, error } = useSignup()

  const handleClick = async (e) => {
    await signup(username, password)
  }

  return (
    <div className='container'>
      <form className='signup'>
        <h1>Register a new account</h1>

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

        <button onClick={handleClick} disabled={isLoading}>Sign Up</button>
        { error && <div className='error'>{ error }</div> }
      </form>
    </div>
  )
}