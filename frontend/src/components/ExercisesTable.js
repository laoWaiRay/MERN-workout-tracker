import React, { useState } from 'react'

export default function ExercisesTable() {

  return (
    <div className='table exercises-table'>
      <div className='table-header'>
        <h2>My Exercises</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th className='options'></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Squat</td>
            <td className='options'>
              <span>
                <button><span className="material-symbols-outlined">edit</span></button>
                <button><span className="material-symbols-outlined">delete</span></button>
              </span>
            </td>
          </tr>
          <tr>
            <td>Deadlift</td>
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
