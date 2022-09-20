import React, { useState, useEffect } from 'react'
import ExerciseSelect from '../components/ExerciseSelect'
import Select from 'react-select'
import TimeInput from '../components/TimeInput'

import { useAuthContext } from '../hooks/useAuthContext'
import { useGoalContext } from '../hooks/useGoalContext'

export default function Goals() {
  const { user, isLoaded } = useAuthContext()
  const { dispatch } = useGoalContext()

  const [goalType, setGoalType] = useState(null)
  const [time, setTime] = useState(0)
  const [frequency, setFrequency] = useState(null)
  const [exercises, setExercises] = useState(null)
  const [exercise, setExercise] = useState(null)  
  const [error, setError] = useState(null)


  useEffect(() => {
    if (isLoaded) {
      fetch("/api/exercise", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      .then((response) => response.json())
      .then((result) => {
        setExercises(result)
      })
    }
  }, [user, isLoaded])
  
  let exerciseOptions

  if (exercises) {
    exerciseOptions = exercises.map(exercise => {
      return {
        label: exercise.name,
        value: exercise._id
      }
    })
  }

  const goalTypeOptions = [
    {
      label: "Frequency",
      value: "frequency"
    },
    {
      label: "Time",
      value: "time"
    }
  ]
  
  const handleChangeExercise = (e) => {
    setExercise(e.value)
  }

  const handleChangeGoalType = (e) => {
    setGoalType(e.value)
  }
  const handleChangeFrequency = (e) => {
    setFrequency(e.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    console.log("submit")

    if (!exercise || !goalType || (!time && !frequency)) {
      setError("Fields must not be empty")
      return
    }

    if (goalType === "time") {
      setFrequency(null)
    } else {
      setTime(0)
    }

    const response = await fetch("/api/goals", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        exercise, 
        goal_type: goalType, 
        time, 
        frequency 
      })
    })

    const result = await response.json()

    if (!response.ok) {
      console.log(result.error)
      setError(result.error)
    }
    if (response.ok) {
      dispatch({ type: "CREATE_GOAL", payload: result })
    }
  }

  return (
    <div className='container goals-container'>
      <form className="goals" onSubmit={handleSubmit}>
        <h2>Set a new goal </h2>
        <div className='form-group'>
          <label> Exercise: </label>
          <ExerciseSelect 
            onChange={handleChangeExercise}
            options={exerciseOptions}
          />
        </div>
        <div className='form-group'>
          <label> Goal Type: </label>
          <Select 
            options={goalTypeOptions}
            onChange={handleChangeGoalType}
          />
        </div>
        {
          goalType === "time"
          &&
          <TimeInput 
            time={time}
            setTime={setTime}
          />
        }
        {
          goalType === "frequency"
          &&

          <div className='form-group time-form-group'>
            <label htmlFor='time'>Weekly Goal: </label>
            <input 
              type="number"
              onChange={handleChangeFrequency}
              placeholder="# times / week"
            />
          </div>
        }
        <button>Set Goal</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  )
}
