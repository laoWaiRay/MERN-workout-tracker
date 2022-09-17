import React, { useState } from 'react'
import Popup from './Popup';

export default function Table() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClickAddExercise = () => {
    setIsPopupOpen(true)
  }

  const handleClickClosePopup = () => {
    setIsPopupOpen(false)
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
          <tr>
            <td>Sept 3</td>
            <td>Overhead Press</td>
            <td>30 minutes</td>
            <td className='options'>
              <button><span className="material-symbols-outlined">edit</span></button>
              <button><span className="material-symbols-outlined">delete</span></button>
            </td>
          </tr>
          <tr>
            <td>Sept 4</td>
            <td>Squat</td>
            <td>50 minutes</td>
            <td className='options'>
              <button><span className="material-symbols-outlined">edit</span></button>
              <button><span className="material-symbols-outlined">delete</span></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
