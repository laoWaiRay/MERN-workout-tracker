import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

import { AuthContextProvider } from './context/AuthContext';
import { WorkoutContextProvider } from './context/WorkoutContext';
import { ExerciseContextProvider } from './context/ExerciseContext';
import { GoalContextProvider } from './context/GoalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoalContextProvider>
      <WorkoutContextProvider>
        <ExerciseContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ExerciseContextProvider>
      </WorkoutContextProvider>
    </GoalContextProvider>
  </React.StrictMode>
);
