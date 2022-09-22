import React, { useState, useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useGetWeekDates } from "../hooks/useGetWeekDates";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];



function Chart({ modifier }) {
  const { workouts } = useWorkoutContext()
  const [data, setData] = useState({
    labels,
    datasets: []
  })
  const getWeekDates =  useGetWeekDates()

  useEffect(() => {
    const [startDate, endDate] = getWeekDates(modifier * 7)
    const weeklyWorkouts = workouts.filter((workout) => {
      const date = new Date(workout.updatedAt)
      return (date > startDate && date < endDate)
    })

    const newDatasets = []

    weeklyWorkouts.forEach((workout) => {
      if (newDatasets.length === 0) {
        newDatasets.push({
          label: workout.exercise[0].name,
          data: [0,0,0,0,0,0,0],
          backgroundColor: workout.exercise[0].color
        })
      } else {
        let isSeen = false
        newDatasets.forEach((dataset) => {
          if (dataset.label === workout.exercise[0].name) {
            isSeen = true
          }
        })
        if (isSeen === false) {
          newDatasets.push({
            label: workout.exercise[0].name,
            data: [0,0,0,0,0,0,0],
            backgroundColor: workout.exercise[0].color
          })
        }
      }
    })

    weeklyWorkouts.forEach((workout) => {
      const day = new Date(workout.createdAt).getDay()
      newDatasets.forEach((dataset) => {
        if (dataset.label === workout.exercise[0].name) {
          dataset.data[day] += workout.time
        }
      })
    })

    setData({
      labels,
      datasets: newDatasets
    })
    
  }, [workouts, modifier])

  return <Bar options={options} data={data} />
  
}

export default Chart;
