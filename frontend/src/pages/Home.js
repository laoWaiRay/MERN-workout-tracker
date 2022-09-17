import React, { useState, useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

import Chart from "../components/Chart"
import Table from "../components/Table"


export default function Home() {
  const { user } = useAuthContext()
  const { workouts, dispatch } = useWorkoutContext()

  const [data, setData] = useState([]);


  useEffect(() => {
    fetch("/api/workout", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
      })
      .catch(err => console.log(err))
  }, [])

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
      <Table />
    </div>
    </>
  )
}


