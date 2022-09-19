import React, { useState } from 'react'
import { useExerciseContext } from '../hooks/useExerciseContext'
import EditableExerciseRow from './EditableExerciseRow';

export default function ExercisesTable({ exercises, error, setError }) {
  const { dispatch } = useExerciseContext()

  return (
    <div className='table exercises-table'>
      <div className='table-header'>
        <h2>My Exercises</h2>
        {error && <span className='error'>{error}</span>}
      </div>
      <table>
        <thead>
          <tr>
            <th>Exercise <span className='error'>{error && error.message}</span></th>
            <th className='options'></th>
          </tr>
        </thead>
        <tbody>
          { exercises &&
            exercises.map((exercise) => {
              return (
                <EditableExerciseRow 
                  key={exercise._id}
                  exercise={exercise}
                  setError={setError}
                />
              )
            }) 
          }
        </tbody>
      </table>
    </div>
  )
}
