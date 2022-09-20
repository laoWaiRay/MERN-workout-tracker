import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

import Layout from "./Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Exercises from "./pages/Exercises"
import Goals from "./pages/Goals"

function App() {
  const { user, isLoaded } = useAuthContext();
  let token;

  if (!isLoaded) {
    token = JSON.parse(localStorage.getItem("user"))
  } else {
    token = null
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}></Route>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />}></Route>
          {/* user is initially set to null, and is only updated through a useEffect AFTER the
              components are rendered, therefore on page refresh user will always be null
          */}
          <Route path="/goals" element={user || token ? <Goals /> : <Navigate to="/login" />}></Route>
          <Route path="/exercises" element={user || token ? <Exercises /> : <Navigate to="/login" />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
