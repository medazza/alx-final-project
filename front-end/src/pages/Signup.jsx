import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../features/authentication/SignupForm";
import Logo from "../ui/Logo";


function Registration() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <div className="content text-center px-4">
          <Logo />
            <h1 className="text-primary">Welcome to the SOCIOHUB!</h1>
            <p className="content">
            This is a new social media platform designed 
          for developers and programmers. The app aims to create a community where users can connect, 
          share ideas, and collaborate on projects.
           If you don't have an account yet, register now and start enjoying the platform. <br />
           If you already have an account, please{" "}
              <Link to="/login/">log in</Link>.
            </p>
          </div>
        </div>
        <div className="col-md-6 p-5">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default Registration;