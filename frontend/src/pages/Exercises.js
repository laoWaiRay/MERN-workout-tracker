import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import chroma from 'chroma-js'

import { useAuthContext } from '../hooks/useAuthContext'
import { useExerciseContext } from "../hooks/useExerciseContext"
import ExercisesTable from '../components/ExercisesTable'

const options = [
  {
    label: "Red",
    value: "red",
    color: "red"
  },
  {
    label: "Orange",
    value: "orange",
    color: "orange"
  },
  {
    label: "Yellow",
    value: "yellow",
    color: "yellow"
  },
  {
    label: "Pink",
    value: "pink",
    color: "pink"
  },
  {
    label: "Blue",
    value: "blue",
    color: "blue"
  },
];

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',
  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const customStyles = {
  control: (styles) => ({...styles, backgroundColor: "white", width: "150px"}),
  // Destructuring state in second parameter
  option: (styles, {data, isDisabled, isFocused, isSelected}) => {
    const color = chroma(data.color)
    return { 
      ...styles,
      backgroundColor: isDisabled
      ? undefined
      : isSelected
      ? data.color
      : isFocused
      ? color.alpha(0.8).css()
      : undefined,
      color: isDisabled
      ? '#ccc'
      : isSelected
      ? chroma.contrast(color, "white") > 2
        ? "white"
        : "black"
      : "black",
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
        ? isSelected
          ? data.color
          : color.alpha(0.3).css()
        : undefined
      },
      ':hover': {
        ...styles[':hover'],
        color: chroma.contrast(color, "white") > 2
        ? "white"
        : "black"
      }
    }
  },
  singleValue: (styles, { data }) => {
    const color = chroma(data.color)
    return {
      ...styles,
      color: chroma.contrast(color, 'white') < 1.5
      ? "black"
      : data.color,
      ...dot(data.color)
    }
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
}

export default function Exercises() {
  const [name, setName] = useState("")
  const [color, setColor] = useState(null)

  const { exercises, dispatch } = useExerciseContext()
  const { user, isLoaded } = useAuthContext()
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("/api/exercise", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, color })
    })

    const result = await response.json()

    if (response.ok) {
      console.log(result)
    }
  }

  const handleChange = (e) => {
    setColor(e.value)
  }

  useEffect(() => {
    if (isLoaded) {
      console.log("2")
      const token = user.token
      fetch("/api/exercise", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(result => {console.log(result)})
      .catch(e => console.log(e))
    } 
  }, [isLoaded, user])

  return (
    <div className='container exercises-container'>
      <form className="exercises" onSubmit={handleSubmit}>
        <h2>Create a new exercise</h2>
        <div className='form-group'>
          <label htmlFor='exercise'>Exercise name: </label>
          <input 
            id='exercise'
            type="text"
            onChange={ (e) => setName(e.target.value)}
            value={name}
            autoComplete="off"
            autoFocus="on"
          />
        </div>

        <div className='form-group'>
          <label htmlFor='color'>Color: </label>
          <Select 
            options={options} 
            styles={customStyles}
            onChange={handleChange}
          />
        </div>

        <button>Add</button>
      </form>
      <ExercisesTable />
    </div>
  )
}
