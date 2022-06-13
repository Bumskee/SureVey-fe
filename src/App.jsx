import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Mainbody from "./components/Home/Mainbody";
import Template from "./components/Home/Template";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import "./App.css";
import CenterTabs from "./components/Form/Tabs";
import Questionform from "./components/Form/Questionform";
import UserForm from "./components/UserForm/UserForm";
import { useNavigate } from "react-router-dom";
import Submit from "./components/UserForm/Submit";

// const App = () => {
const Root = () => {
  const Navigate = useNavigate();
  const signOut = () => {
    localStorage.clear();
    Navigate("/login");
  }

  return (
    <div>
      <nav>
        <Link className="nav_text" to="/">Home</Link>

        {/* {!isAuth ? (
          <Link className="nav_text" to="/login">
          Account
          </Link>
          ) : (
            <Link className="nav_text" to="/account">
            Account
            </Link>
          )} */}

        {localStorage.getItem("isAuth") ? <button className = 'astext' onClick={signOut}>Logout</button> : <Link className="nav_text" to="/login">Login</Link>}
      </nav>
      <Routes>
        <Route path="/login" element={<Login/>} />

        <Route path="/account"
          element= {localStorage.getItem("isAuth") ? (
            <div>
              <Template />
              <Mainbody />
            </div>
          ) : (
            <Login />
          )}/>

        <Route
          path="/form/:id"
          element = 
            {localStorage.getItem("isAuth") ? (
            <div>
              <CenterTabs />
              <Questionform />
            </div>
            ) : (
              <Login />
            )
          } />

        <Route path="/response" element={<UserForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/question_form/:id" element =
          {localStorage.getItem("isAuth") ? (
            <UserForm />
          ) : (
            <Login />
          )} />
        <Route path="/submit" element =
          {localStorage.getItem("isAuth") ? (
            <Submit />
          ) : (
            <Login />
          )} /> 

      </Routes>  
    </div>
  )
}

const App = () => {
  return (
    <Router>
        <Root />
    </Router>
  );
};

export default App;
