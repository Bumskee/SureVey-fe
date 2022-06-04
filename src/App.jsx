import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Mainbody from "./components/Mainbody";
import Template from "./components/Template";
import Formheader from './components/Formheader';
import Login from "./components/Login";
import "./App.css";

const App = () => {
  return (
    <Router>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
        </nav>
        <Routes>
            <Route path="/" element={
              <div>
              <Template />
              <Mainbody />
            </div>
            } />
            <Route path="/form/:id" element={<Formheader />}></Route>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </Router>
  );
}

export default App;