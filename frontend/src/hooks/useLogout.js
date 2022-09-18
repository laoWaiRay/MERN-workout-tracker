import { useAuthContext } from "./useAuthContext";
import { useExerciseContext } from "./useExerciseContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: exerciseDispatch } = useExerciseContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" })
    exerciseDispatch({ type: "SET_EXERCISES", payload: null })
  }

  return logout
}