import React from "react";
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

const data = {
  labels,
  datasets: [
    {
      label: 'Squat',
      data: [30, 0 , 60, 0, 45],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Bench Press',
      data: [0, 60, 60, 90],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function Chart() {
  return <Bar options={options} data={data} />;
}

export default Chart;
