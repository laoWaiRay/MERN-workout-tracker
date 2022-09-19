import React, { useState, useEffect } from 'react'
import ExerciseSelect from './ExerciseSelect'
import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

export default function Popup({ setIsPopupOpen }) {
  const [time, setTime] = useState("")
  const [timeSuffix, setTimeSuffix] = useState(false)
  const [exercises, setExercises] = useState([])
  const [exercise, setExercise] = useState(null)
  const [error, setError] = useState(null)

  const { user } = useAuthContext()
  const { dispatch } = useWorkoutContext()

  useEffect(() => {
    fetch("/api/exercise", {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    .then((response) => response.json())
    .then((result) => {
      setExercises(result)
    })
  }, [user.token])
  
  const options = exercises.map(exercise => {
    return {
      label: exercise.name,
      value: exercise._id
    }
  })

  useEffect(() => {
    if (time) {
      setTimeSuffix(true)
    } else {
      setTimeSuffix(false)
    }
  }, [time])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!exercise || !time) {
      setError("Fields must not be empty")
      return
    }

    const response = await fetch("/api/workout", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ exercise, time })
    })

    const result = await response.json()

    if (!response.ok) {
      console.log(result.error)
      setError(result.error)
    }
    if (response.ok) {
      dispatch({ type: "CREATE_WORKOUT", payload: result })
      setIsPopupOpen(false)
    }
  }

  const handleChangeTime = (e) => {
    const limit = 3;

    if (e.target.value === '1000') {
      return setTime(999)
    } else {
      setTime((prevState) => {
        return e.target.value.slice(0, limit)
      })
    }
  }

  const handleChangeExercise = (e) => {
    setExercise(e.value)
  }
  
  return (
    <div className='popup'>
      <form onSubmit={handleSubmit}>
      <span className="material-symbols-outlined close" onClick={() => setIsPopupOpen(false)}>close</span>
        <h2>Add a Workout</h2>
        <div className='form-group'>
          <label htmlFor='exercise'>Exercise: </label>
          <ExerciseSelect 
            options={options}
            onChange={handleChangeExercise}
          />
        </div>

        <div className='form-group time-form-group'>
          <label htmlFor='time'>Time: </label>
          <input 
            id='time'
            type="number"
            onChange={ handleChangeTime }
            value={time}
            autoComplete="off"
            min={0}
            placeholder="minutes"
          />
          {timeSuffix && <span className='time-suffix'>minutes</span>}
        </div>

        <button>Add</button>
      </form>
    </div>
  )
}
