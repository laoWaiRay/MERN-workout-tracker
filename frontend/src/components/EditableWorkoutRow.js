import React, { useState, useRef, useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Dot from "./Dot"
import TimeInput from './TimeInput';

export default function EditableWorkoutRow({ workout, setError }) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(workout.exercise[0].name)
  const [time, setTime] = useState(workout.time);
  const { dispatch } = useWorkoutContext()
  const { user } = useAuthContext()

  const editRef = useRef()
  const formRef = useRef()

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fetchData = async () => {
      if (!name || !time) {
        setError("Fields must not be empty")
        return
      }

      const response = await fetch("/api/workout/" + workout._id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          },
        body: JSON.stringify({ name, time, exerciseID: workout.exercise[0]._id })
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error)
      } else {
        dispatch({ type: "UPDATE_WORKOUT", payload: result })
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
    fetch("/api/workout/" + workout._id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    .catch(e => console.log(e))

    dispatch({ type: "DELETE_WORKOUT", payload: workout })
  }

  const handleClickOutside = (e) => {
    if (formRef.current && !editRef.current.contains(e.target) && !formRef.current.contains(e.target)) {
      setIsEdit(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {document.removeEventListener('click', handleClickOutside)}
  }, [])

  const getDate = (dateString) => {
    const date = new Date(dateString)
    return date
  }

  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

  return (
    <tr key={workout._id} ref={formRef}>
      <td>{getDate(workout.createdAt).toLocaleDateString(undefined, options)}</td>
      <td>
        {
          isEdit
            ? <form className='editable-form' onSubmit={handleSubmit}>
                <input 
                  className="editable-input" 
                  value={name} 
                  onChange={handleChangeName} 
                  autoFocus 
                  onKeyDown={handleKeyDown}
                />
              </form>
            : <span className='dot'>{workout.exercise[0].name} <Dot color={workout.exercise[0].color}/> </span>
        }
      </td>
      <td>
        {
          isEdit
          ? <form className='editable-form' onSubmit={handleSubmit}>
              <TimeInput 
                time={time}
                setTime={setTime}
              />
              <button className='editable-form-btn'>Save Changes</button>
            </form>
          : <span>{workout.time} {workout.time === 1 ? "minute" : "minutes"}</span>
        }
      </td>
      <td className='options'>
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
      </td>
    </tr>
  )
}
