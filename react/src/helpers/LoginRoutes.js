import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//Login Components
import Login from "../modules/Auth/Login";
import Register from "../modules/Auth/Register";
import FacultyRegister from "../modules/Auth/FacultyRegistration";
import FacultyLogin from "../modules/Auth/FacultyLogin";
import LandingPage from "../modules/Auth/LandingPage";
import LoginPages from "../modules/Auth/LoginPages";
import { ProtectedLogin } from "./ProtectedLogin";

const LoginRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={LoginPages} />
      <Route path="/register" component={Register} />
      <Route path="/facultyregister" component={FacultyRegister} />
    </div>
  );
};

export default LoginRoutes;
