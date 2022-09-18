import React, { useState } from 'react'
import { useExerciseContext } from '../hooks/useExerciseContext'
import EditableRow from './EditableRow';

export default function ExercisesTable({ exercises }) {
  const { dispatch } = useExerciseContext()

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
          { exercises &&
            exercises.map((exercise) => {
              return (
                <EditableRow 
                  key={exercise._id}
                  exercise={exercise}
                />
              )
            }) 
          }
        </tbody>
      </table>
    </div>
  )
}
