import React, { useState, useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

import Chart from "../components/Chart"
import WorkoutsTable from "../components/WorkoutsTable"


export default function Home() {
  const { user } = useAuthContext()
  const { workouts, dispatch } = useWorkoutContext()

  const [data, setData] = useState([]);

  return (
    <>
    <div className='sub-header'>
      Welcome, <strong className='username'>{user.username}</strong>
    </div>
    <div className='container-home'>
      <div className='chart-container'>
        <h1>Chart</h1>
        <Chart />
      </div>
      <WorkoutsTable />
    </div>
    </>
  )
}


