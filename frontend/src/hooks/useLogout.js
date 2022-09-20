import { useAuthContext } from "./useAuthContext";
import { useExerciseContext } from "./useExerciseContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: exerciseDispatch } = useExerciseContext();
  const { dispatch: workoutDispatch } = useWorkoutContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" })
    exerciseDispatch({ type: "SET_EXERCISES", payload: null })
    workoutDispatch({ type: "SET_WORKOUTS", payload: [] })
  }

  return logout
}