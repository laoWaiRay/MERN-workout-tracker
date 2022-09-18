import React, { useState, useEffect } from 'react'
import Popup from './Popup';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Table() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { workouts, dispatch } = useWorkoutContext()
  const { user } = useAuthContext()
 
  useEffect(() => {
    fetch("/api/workout", {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    .then((response) => response.json())
    .then((result) => {
      dispatch({ type: "SET_WORKOUTS", payload: result })
    })
  }, [dispatch, user.token, workouts])

  const handleClickAddExercise = () => {
    setIsPopupOpen(true)
  }

  const handleClickClosePopup = () => {
    setIsPopupOpen(false)
  }

  const getDate = (dateString) => {
    const date = new Date(dateString)
    return date
  }

  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

  return (
    <div className='table'>
      <div className='table-header'>
        <h2>Log</h2>
        <div className='button-wrapper'>
          <button onClick={handleClickAddExercise}> 
            <span className="material-symbols-outlined material-icon">
                add_circle
            </span>
            Add Workout
          </button>
          { isPopupOpen ? <Popup handleClickClosePopup={handleClickClosePopup}/> : null }
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Exercise</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            workouts.map((workout) => {
              return (
                <tr key={workout._id}>
                  <td>{getDate(workout.createdAt).toLocaleDateString(undefined, options)}</td>
                  <td>{workout.exercise[0].name}</td>
                  <td>{workout.time} {workout.time === 1 ? "minute" : "minutes"}</td>
                  <td className='options'>
                    <button><span className="material-symbols-outlined">edit</span></button>
                    <button><span className="material-symbols-outlined">delete</span></button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
