import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

import Layout from "./Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={user ? <Home username={user.username}/> : <Navigate to="/login" />}></Route>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
