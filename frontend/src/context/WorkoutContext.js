import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: [...action.payload],
        isLoaded: true
      }
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case "DELETE_WORKOUT":
      const newState = state.workouts.filter(workout => workout._id !== action.payload._id)
      return {
        workouts: [...newState]
      }
    case "UPDATE_WORKOUT":
      const index = state.workouts.findIndex((workout) => workout._id === action.payload._id);
      state.workouts.splice(index, 1, action.payload);
      return {
        workouts: [...state.workouts]
      }
    default:
      return state
  }
}

export const WorkoutContextProvider = (props) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: [],
    isLoaded: false
  })

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </WorkoutContext.Provider>
  )
}