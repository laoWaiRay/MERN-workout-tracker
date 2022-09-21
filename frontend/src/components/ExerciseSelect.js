import React from 'react'
import Select from 'react-select'

export default function ExerciseSelect({ onChange, exercises, defaultValue }) {
  let exerciseOptions = []

  if (exercises) {
    exerciseOptions = exercises.map(exercise => {
      return {
        label: exercise.name,
        value: exercise._id
      }
    })
  }
  
  return (
    <Select 
      options={exerciseOptions}
      onChange={onChange}
      defaultValue={defaultValue ? defaultValue : null}
    />
  )
}
