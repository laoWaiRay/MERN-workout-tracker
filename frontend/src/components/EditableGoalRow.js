import React, { useState, useRef, useEffect, useCallback } from 'react'
import Select from 'react-select'
import { useGoalContext } from '../hooks/useGoalContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useGetWeekDates } from '../hooks/useGetWeekDates';
import ExerciseSelect from './ExerciseSelect';
import TimeInput from './TimeInput';

import Dot from "./Dot"

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

export default function EditableGoalRow({ goal, setError, exercises }) {
  const [isEdit, setIsEdit] = useState(false);
  const [goalType, setGoalType] = useState(goal.goal_type)
  const [time, setTime] = useState(goal.time)
  const [frequency, setFrequency] = useState(goal.frequency)
  const [exercise, setExercise] = useState(goal.exercise[0]._id)
  const [remaining, setRemaining] = useState(0)

  const { user } = useAuthContext()
  const { dispatch: dispatchGoal } = useGoalContext()
  const { dispatch: dispatchWorkout, workouts } = useWorkoutContext()
  const getWeekDates =  useGetWeekDates()

  const editRef = useRef()
  const formRef = useRef()

  useEffect(() => {
    fetch("/api/workout", {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    .then((response) => response.json())
    .then((result) => {
      dispatchWorkout({ type: "SET_WORKOUTS", payload: result })
    })
  }, [dispatchWorkout, user.token])

  const handleSubmit = (e) => {
    e.preventDefault()

    const fetchData = async () => {
      if (!goalType || !exercise || (!time && !frequency)) {
        return
      }

      const response = await fetch("/api/goals/" + goal._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          goal_type: goalType,
          time,
          frequency,
          exercise,
        })
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error)
      } else {
        console.log(result)
        dispatchGoal({ type: "UPDATE_GOAL", payload: result })
        setIsEdit(false)
      }
    }

    fetchData()
  } 

  const handleChangeExercise = (e) => {
    setExercise(e.value)
  }

  const handleChangeFrequency = (e) => {
    setFrequency(e.target.value)
  }

  const handleClickEdit = () => {
    setIsEdit(true)
  }

  const handleClickClose = () => {
    setIsEdit(false)
  }

  const handleClickDelete = () => {
    fetch("/api/goals/" + goal._id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    .catch(e => console.log(e))

    dispatchGoal({ type: "DELETE_GOAL", payload: goal })
  }

  const findRemaining = useCallback((exercise, goalType) => {
    const [startDate, endDate] = getWeekDates()
    let workoutTotalTime = 0;
    let workoutTotalFrequency = 0;

    const weeklyWorkouts = workouts.filter((workout) => {
      const date = new Date(workout.createdAt)
      return (workout.exercise[0]._id === exercise[0]._id && date > startDate && date < endDate)
    })

    weeklyWorkouts.forEach((workout) => {
      if (goalType === "time") {
        workoutTotalTime += workout.time
      } else {
        workoutTotalFrequency++
      }
    })
    
    if (goalType === "time") {
      return workoutTotalTime
    } else {
      return workoutTotalFrequency
    }
  }, [getWeekDates, workouts])

  const handleClickOutside = (e) => {
    const clickInMenu = e.target.id ? e.target.id.includes("react-select") : null
    if (formRef.current && !editRef.current.contains(e.target) && !formRef.current.contains(e.target) && !clickInMenu) {
      setIsEdit(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {document.removeEventListener('click', handleClickOutside)}
  }, [])

  const handleChangeGoalType = (e) => {
    setGoalType(e.value)
  }

  useEffect(() => {
    let remainingData

    if (goalType === "time") {
      setFrequency(0)
      remainingData = time - findRemaining(goal.exercise, goalType)
    } else {
      setTime(0)
      remainingData = frequency - findRemaining(goal.exercise, goalType)
    }

    setRemaining(remainingData)
  }, [goalType, findRemaining, time, frequency])

  const formattedGoalType = goal.goal_type[0].toUpperCase() + goal.goal_type.slice(1)

  return (
    <tr ref={formRef}>
      <td>
        {
          isEdit
          ? <ExerciseSelect 
            exercises={exercises}
            onChange={handleChangeExercise}
            defaultValue={{label: goal.exercise[0].name, value: goal.exercise[0]._id}}
          />
          : <span className='dot'>{goal.exercise[0].name} <Dot color={goal.exercise[0].color} /> </span>
        }
      </td>
      <td>
        {
          isEdit
          ? <form className='editable-form' onSubmit={() => {}}>
              <div className='form-group flex-row'>
                <Select 
                  options={goalTypeOptions}
                  onChange={handleChangeGoalType}
                  defaultValue={{label: formattedGoalType, value: goalType}}
                />
              </div>
            </form>
          : <span>{formattedGoalType}</span>
        }
      </td>
      <td className={ goalType === "time" ? "editable-form-time" : null}>
        {
          isEdit
          ? <form 
              className="editable-form"
              onSubmit={() => {}}
            >
              {
                goalType === "time"
                &&
                <TimeInput 
                  time={time}
                  setTime={setTime}
                  noLabel={true}
                />
              }
              {
                goalType === "frequency"
                &&
                <div className='form-group time-form-group'>
                  <input 
                    className='frequency-input'
                    type="number"
                    onChange={handleChangeFrequency}
                    value={frequency}
                    placeholder="# times / week"
                    min="0"
                  />
                </div>
              }
            </form>
          : <span>{goal.goal_type === "time" ? `${goal.time} minutes` : `${goal.frequency} times`}</span>
        }
      </td>
      
      <td>
        <form className='editable-form editable-form-last' onSubmit={handleSubmit}>
          {
            <span className={remaining <= 0 ? "success" : "danger"}> 
              {remaining} {goalType === "time" ? remaining === 1 ? "minute" : "minutes" : remaining === 1 ? "time" : "times"}
            </span>
          }
          {
            isEdit
            ? <button className='editable-form-btn'>Save</button>
            : null
          }
          
        </form>
      </td>

      <td className='options'>
        <span>
          <button onClick={isEdit ? handleClickClose : handleClickEdit}>
            <span className="material-symbols-outlined" ref={editRef}>
              {
                isEdit
                ? "close"
                : "edit"
              }
            </span>
          </button>
          <button onClick={handleClickDelete}><span className="material-symbols-outlined">delete</span></button>
        </span>
      </td>
    </tr>
  )
}
