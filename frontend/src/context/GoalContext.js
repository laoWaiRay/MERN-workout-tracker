import { createContext, useReducer } from "react";

export const GoalContext = createContext()

export const goalReducer = (state, action) => {
  switch (action.type) {
    case "SET_GOALS":
      return {
        goals: [...action.payload],
        isLoaded: true
      }
    case "CREATE_GOAL":
      return {
        goals: [action.payload, ...state.goals],
        isLoaded: true
      }
    case "DELETE_GOAL":
      const newState = state.goals.filter(goal => goal._id !== action.payload._id)
      return {
        goals: [...newState],
        isLoaded: true
      }
    case "UPDATE_GOAL":
      const index = state.goals.findIndex((goal) => goal._id === action.payload._id);
      state.goals.splice(index, 1, action.payload);
      return {
        goals: [...state.goals],
        isLoaded: true
      }
    default:
      return state
  }
}

export const GoalContextProvider = (props) => {
  const [state, dispatch] = useReducer(goalReducer, {
    goals: [],
    isLoaded: false
  })

  return (
    <GoalContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </GoalContext.Provider>
  )
}