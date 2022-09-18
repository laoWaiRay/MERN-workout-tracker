import React, { useEffect, useState } from 'react'

import { useAuthContext } from '../hooks/useAuthContext'
import { useExerciseContext } from "../hooks/useExerciseContext"
import ExercisesTable from '../components/ExercisesTable'
import ColorSelect from '../components/ColorSelect'


export default function Exercises() {
  const [name, setName] = useState("")
  const [color, setColor] = useState(null)
  const [error, setError] = useState(null);

  const { exercises, dispatch } = useExerciseContext()
  const { user, isLoaded } = useAuthContext()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name || !color) {
      setError("Fields must not be empty")
      return
    }

    const response = await fetch("/api/exercise", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, color })
    })

    const result = await response.json()

    if (!response.ok) {
      console.log(result.error)
      setError(result.error)
    }
    if (response.ok) {
      dispatch({ type: "CREATE_EXERCISE", payload: result })
    }
  }

  useEffect(() => {
    if (isLoaded) {
      fetch("/api/exercise", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        dispatch({ type: "SET_EXERCISES", payload: result })
      })
      .catch(e => console.log(e))
    } 
  }, [isLoaded, user, dispatch])

  return (
    <div className='container exercises-container'>
      <form className="exercises" onSubmit={handleSubmit}>
        <h2>Create a new exercise </h2>
        <div className='form-group'>
          <label htmlFor='exercise'>Exercise name: </label>
          <input 
            id='exercise'
            type="text"
            onChange={ (e) => setName(e.target.value)}
            value={name}
            autoComplete="off"
            autoFocus="on"
          />
        </div>
        <ColorSelect 
          setColor={setColor}
          className={"form-group"}
        />
        <button>Add</button>
      </form>
      <ExercisesTable 
        exercises={exercises}
        error={error}
        setError={setError}
      />
    </div>
  )
}
