import React from 'react'
import EditableGoalRow from './EditableGoalRow';

export default function GoalsTable({ goals, error, setError, exercises }) {

  return (
    <div className='table goals-table'>
      <div className='table-header'>
        <h2>My Goals</h2>
        {error && <span className='error'>{error}</span>}
      </div>
      <table>
        <thead>
          <tr>
            <th>Exercise <span className='error'>{error && error.message}</span></th>
            <th>Goal Type</th>
            <th>Weekly Goal</th>
            <th>Remaining</th>
            <th className='options'></th>
          </tr>
        </thead>
        <tbody>
          { goals &&
            goals.map((goal) => {
              return (
                <EditableGoalRow 
                  key={goal._id}
                  goal={goal}
                  setError={setError}
                  exercises={exercises}
                />
              )
            }) 
          }
        </tbody>
      </table>
    </div>
  )
}