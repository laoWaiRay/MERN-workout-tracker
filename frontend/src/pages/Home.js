import React, { useState, useEffect } from 'react'
import Chart from "../components/Chart"


export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/workout", {method: "GET"})
      .then(res => res.json())
      .then(json => {
        console.log(json)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='container'>
      <div className='chart-container'>
        <h1>Chart</h1>
        <Chart />
      </div>
    </div>
  )
}


