import React, { useState, useEffect } from 'react'

export default function TimeInput({ time, setTime, noLabel }) {
  const [timeSuffix, setTimeSuffix] = useState(false)

  const handleChangeTime = (e) => {
    const limit = 3;

    if (e.target.value === '1000') {
      return setTime(999)
    } else {
      setTime((prevState) => {
        return e.target.value.slice(0, limit)
      })
    }
  }

  useEffect(() => {
    if (time || time === 0) {
      setTimeSuffix(true)
    } else {
      setTimeSuffix(false)
    }
  }, [time])

  return (
    <div className='form-group time-form-group'>
      {
        !noLabel 
        ? <label htmlFor='time'>Time: </label> 
        : null
      }
      
      <input 
        id='time'
        type="number"
        onChange={ handleChangeTime }
        value={time}
        autoComplete="off"
        min="0"
        placeholder="minutes"
      />
      {timeSuffix && <span className='time-suffix'>{time === "1" ? "minute" : "minutes"}</span>}
    </div>
  )
}
