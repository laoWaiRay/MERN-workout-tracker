import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useAuthContext } from "../hooks/useAuthContext"

export default function ExerciseSelect({ options, onChange }) {
  return (
    <Select 
      options={options}
      onChange={onChange}
    />
  )
}
