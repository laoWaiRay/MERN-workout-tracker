import React, { useState, useEffect } from 'react'
import Popup from './Popup';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
import EditableWorkoutRow from './EditableWorkoutRow';

export default function WorkoutsTable() {
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
  }, [dispatch, user.token])

  const handleClickAddExercise = () => {
    setIsPopupOpen(true)
  }

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
          { isPopupOpen ? <Popup setIsPopupOpen={setIsPopupOpen}/> : null }
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
                <EditableWorkoutRow 
                  key={workout._id}
                  workout={workout}
                />
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
