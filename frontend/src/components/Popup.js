import React, { useState } from 'react'

export default function Popup(props) {
  const [exercise, setExercise] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  
  return (
    <div className='popup'>
      <form onSubmit={handleSubmit}>
      <span class="material-symbols-outlined close" onClick={props.handleClickClosePopup}>close</span>
        <h2>Add a Workout</h2>
        <div className='form-group'>
          <label htmlFor='exercise'>Exercise: </label>
          <input 
            id='exercise'
            type="text"
            onChange={ (e) => setExercise(e.target.value)}
            value={exercise}
            autoComplete="off"
            autoFocus="on"
          />
        </div>

        <div className='form-group'>
          <label htmlFor='time'>Time: </label>
          <input 
            id='time'
            type="number"
            onChange={ (e) => setTime(e.target.value)}
            value={time}
            autoComplete="off"
            autoFocus="on"
          />
        </div>

        <button>Add</button>
      </form>
    </div>
  )
}
