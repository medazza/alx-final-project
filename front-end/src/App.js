import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./ui/ProtectedRoute";
import Registration from "./pages/Signup";
import Login from "./pages/Login";
import SinglePost from "./features/posts/SinglePost";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";


function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute> } />
        <Route path="/post/:postId/" element={
          <ProtectedRoute>
            <SinglePost />
          </ProtectedRoute> } />
          <Route
        path="/profile/:profileId/"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:profileId/edit/"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
        <Route path="/register/" element={<Registration />} />
        <Route path="/login/" element={<Login />} />
    </Routes>
  );
}

export default App;