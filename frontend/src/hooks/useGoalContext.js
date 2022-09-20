import { useContext } from "react";
import { GoalContext } from "../context/GoalContext";

export const useGoalContext = () => {
  const context = useContext(GoalContext);

  if (!context) {
    throw Error("useGoalContext must be used inside a useGoalContext provider")
  }

  return context
}