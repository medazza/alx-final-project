import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./ui/ProtectedRoute";
import Registration from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path="/register/" element={<Registration />} />
        <Route path="/login/" element={<Login />} />
    </Routes>
  );
}

export default App;