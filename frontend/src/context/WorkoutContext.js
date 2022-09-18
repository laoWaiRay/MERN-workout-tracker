import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: [...action.payload]
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
    default:
      return state
  }
}

export const WorkoutContextProvider = (props) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: []
  })

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </WorkoutContext.Provider>
  )
}