import React from 'react'
import { Link } from "react-router-dom"
import { useAuthContext } from './hooks/useAuthContext'
import { useLogout } from "./hooks/useLogout"

export default function Layout({ children }) {
  const { user } = useAuthContext()
  const logout = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
  <>
  <header>
    <Link to="/">
      <h1 className='logo'>Workout Tracker</h1>
    </Link>
    <nav>
      {!user ? 
        <div className='nav-container'>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        :
        <div className='nav-container'>
        <Link to="/">Home</Link>
        <button onClick={handleClick}>Log Out</button>
      </div>
      }
    </nav>
  </header>
  <main>
    {children}
  </main>
  <footer>
    <div className='footer-text'>
      Made by {" "}
      <a href="https://github.com/laoWaiRay"> laoWaiRay </a> {" "}
      for Harvard's {" "}
      <a href="https://www.edx.org/cs50"> CS50x 2022 </a>
    </div>
  </footer>
  </>
  )
}
