import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useGetWeekDates } from '../hooks/useGetWeekDates';

import Chart from "../components/Chart"
import WorkoutsTable from "../components/WorkoutsTable"

const options = { year: 'numeric', month: 'long', day: 'numeric' };

export default function Home() {
  const [modifier, setModifier] = useState(0)
  const { user } = useAuthContext()
  const getWeekDates =  useGetWeekDates()
  const [startDate, endDate] = getWeekDates(modifier * 7)
  
  const startDateStr = new Date(startDate).toLocaleString(undefined, options)
  const endDateStr = new Date(endDate).toLocaleString(undefined, options)

  const handleClickInc = () => {
    setModifier((prev) => prev + 1)
  }

  const handleClickDec = () => {
    setModifier((prev) => prev - 1)
  }

  return (
    <>
    <div className='sub-header'>
      Welcome, <strong className='username'>{user.username}</strong>
    </div>
    <div className='container-home'>
      <div className='chart-container'>
        <div className='chart-header'>
          <button 
            className='chevron-btn'
            onClick={handleClickDec}
          >
            <span className="material-symbols-outlined chevron">
              chevron_left
            </span>
          </button>
          <h1>Workouts</h1>
          <button 
            className='chevron-btn'
            onClick={handleClickInc}
          >
            <span className="material-symbols-outlined chevron">
              chevron_right
            </span>
          </button>
        </div>
        <h2>{startDateStr} - {endDateStr}</h2>
        <Chart 
          modifier={modifier}
        />
      </div>
      <WorkoutsTable />
    </div>
    </>
  )
}


