import React, { useState, useEffect } from 'react'
import Chart from "../components/Chart"
import Table from "../components/Table"


export default function Home({ username }) {
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
    <>
    <div className='sub-header'>
      Welcome, {username}
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


