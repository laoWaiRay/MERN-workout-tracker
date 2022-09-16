// Custom hook to handle logging in

import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext()

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })

    const result = await response.json()
    
    if (!response.ok) {
      setIsLoading(false)
      setError(result.error)
    } else {
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(result))

      // Update the Auth Context
      dispatch({ type: "LOGIN", payload: result })
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}