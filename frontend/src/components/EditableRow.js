import React, { useState, useRef, useEffect } from 'react'
import { useExerciseContext } from '../hooks/useExerciseContext';
import { useAuthContext } from '../hooks/useAuthContext';
import ColorSelect from './ColorSelect';
import Dot from "../components/Dot"

export default function EditableRow({ exercise, setError }) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(exercise.name)
  const [color, setColor] = useState(null);
  const { dispatch } = useExerciseContext()
  const { user } = useAuthContext()

  const editRef = useRef()
  const formRef = useRef()

  const handleChange = (e) => {
    setName(e.target.value)
    console.log(name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fetchData = async () => {
      if (!name || !color) {
        setError("Fields must not be empty")
        return
      }

      const response = await fetch("/api/exercise/" + exercise._id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          },
        body: JSON.stringify({ name, color })
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error)
      } else {
        console.log(result)
        dispatch({ type: "UPDATE_EXERCISE", payload: result })
        setIsEdit(false)
      }
    }

    fetchData()
  } 

  const handleClickEdit = () => {
    setIsEdit(true)
  }

  const handleClickClose = () => {
    setIsEdit(false)
  }

  const handleClickDelete = () => {
    fetch("/api/exercise/" + exercise._id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    .catch(e => console.log(e))

    dispatch({ type: "DELETE_EXERCISE", payload: exercise })
  }

  const handleClickOutside = (e) => {
    console.log(name)
    const clickInMenu = e.target.id ? e.target.id.includes("react-select") : null
    if (formRef.current && !editRef.current.contains(e.target) && !formRef.current.contains(e.target) && !clickInMenu) {
      setIsEdit(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!name) {
        return
      }
      fetch("/api/exercise/" + exercise._id, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          name,
          color
        })
      })
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {document.removeEventListener('click', handleClickOutside)}
  }, [])

  return (
    <tr>
      <td>
        {
          isEdit
          ? <form ref={formRef} className='editable-form' onSubmit={handleSubmit}>
              <input 
                className="editable-input" 
                value={name} 
                onChange={handleChange} 
                autoFocus 
                onKeyDown={handleKeyDown}
              />
              <ColorSelect 
                setColor={setColor}
                className={"editable-input-select"}
                initialValue={exercise.color}
              />
              <button className='editable-form-btn'>Save Changes</button>
            </form>
          : <span className='dot'>{exercise.name} <Dot color={exercise.color} /> </span>
        }
      </td>
      <td className='options'>
        <span>
          <button onClick={isEdit ? handleClickClose : handleClickEdit}>
            <span className="material-symbols-outlined" ref={editRef}>
              {
                isEdit
                ? "close"
                : "edit"
              }
            </span>
          </button>
          <button onClick={handleClickDelete}><span className="material-symbols-outlined">delete</span></button>
        </span>
      </td>
    </tr>
  )
}
