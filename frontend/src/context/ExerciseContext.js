import { createContext, useReducer } from "react";

export const ExerciseContext = createContext()

export const exerciseReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXERCISES":
      return {
        exercises: action.payload
      }
    case "CREATE_EXERCISE":
      return {
        exercises: [action.payload, ...state.exercises]
      }
    case "UPDATE_EXERCISE":
      const indexToUpdate = state.exercises.findIndex(exercise => exercise._id === action.payload._id)
      state.exercises.splice(indexToUpdate, 1, action.payload);
      return {
        exercises: state.exercises
      }
    case "DELETE_EXERCISE":
      const newState = state.exercises.filter(exercise => exercise._id !== action.payload._id)
      return {
        exercises: [...newState]
      }
    default:
      return state
  }
}

export const ExerciseContextProvider = (props) => {
  const [state, dispatch] = useReducer(exerciseReducer, {
    exercises: null
  })

  return (
    <ExerciseContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </ExerciseContext.Provider>
  )
}