import React from 'react'

export default function ExercisesTable({ exercises }) {

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
                <tr key={exercise._id}>
                  <td>{exercise.name}</td>
                  <td className='options'>
                    <span>
                      <button><span className="material-symbols-outlined">edit</span></button>
                      <button><span className="material-symbols-outlined">delete</span></button>
                    </span>
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
