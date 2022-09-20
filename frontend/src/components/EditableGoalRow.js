import React, { useState, useRef, useEffect } from 'react'
import Select from 'react-select'
import { useGoalContext } from '../hooks/useGoalContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useGetWeekDates } from '../hooks/useGetWeekDates';

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

export default function EditableGoalRow({ goal, setError }) {
  const [isEdit, setIsEdit] = useState(false);
  const [goalType, setGoalType] = useState(goal.goal_type)
  const [time, setTime] = useState(goal.time)
  const [frequency, setFrequency] = useState(goal.frequency)
  const [achieved, setAchieved] = useState(goal.achieved)

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

  // const handleChange = (e) => {
  //   setName(e.target.value)
  //   console.log(name)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   const fetchData = async () => {
  //     if (!name || !color) {
  //       setError("Fields must not be empty")
  //       return
  //     }

  //     const response = await fetch("/api/exercise/" + exercise._id, {
  //       method: "PATCH",
  //       headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${user.token}`
  //         },
  //       body: JSON.stringify({ name, color })
  //     })

  //     const result = await response.json()

  //     if (!response.ok) {
  //       setError(result.error)
  //     } else {
  //       console.log(result)
  //       dispatch({ type: "UPDATE_EXERCISE", payload: result })
  //       setIsEdit(false)
  //     }
  //   }

  //   fetchData()
  // } 

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

  const findRemaining = (exercise, goalType) => {
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
  }

  // const handleClickOutside = (e) => {
  //   console.log(name)
  //   const clickInMenu = e.target.id ? e.target.id.includes("react-select") : null
  //   if (formRef.current && !editRef.current.contains(e.target) && !formRef.current.contains(e.target) && !clickInMenu) {
  //     setIsEdit(false)
  //   }
  // }

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     if (!name) {
  //       return
  //     }
  //     fetch("/api/exercise/" + exercise._id, {
  //       method: "PATCH",
  //       headers: {
  //         "Authorization": `Bearer ${user.token}`
  //       },
  //       body: JSON.stringify({
  //         name,
  //         color
  //       })
  //     })
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside)
  //   return () => {document.removeEventListener('click', handleClickOutside)}
  // }, [])

  const handleChangeGoalType = (e) => {
    setGoalType(e.value)
  }

  let remaining

  if (goal.goal_type === "time") {
    remaining = goal.time - findRemaining(goal.exercise, goal.goal_type)
  } else {
    remaining = goal.frequency - findRemaining(goal.exercise, goal.goal_type)
  }

  return (
    <tr>
      <td>
        {
          isEdit
          ? <form ref={formRef} className='editable-form' onSubmit={() => {}}>
              <div className='form-group'>
                <label> Goal Type: </label>
                <Select 
                  options={goalTypeOptions}
                  onChange={handleChangeGoalType}
                />
              </div>
              <button className='editable-form-btn'>Save Changes</button>
            </form>
          : <span className='dot'>{goal.exercise[0].name} <Dot color={goal.exercise[0].color} /> </span>
        }
      </td>
      <td>
        <span>{goal.goal_type[0].toUpperCase() + goal.goal_type.slice(1)}</span>
      </td>
      <td>
        <span>{goal.goal_type === "time" ? `${goal.time} minutes` : `${goal.frequency} times`}</span>
      </td>
      <td>
        {
          <span className={remaining <= 0 ? "success" : "danger"}> 
            {remaining} 
          </span>
        }
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
