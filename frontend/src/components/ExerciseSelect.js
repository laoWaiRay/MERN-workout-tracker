import React from 'react'
import Select from 'react-select'

export default function ExerciseSelect({ options, onChange }) {
  return (
    <Select 
      options={options}
      onChange={onChange}
    />
  )
}
