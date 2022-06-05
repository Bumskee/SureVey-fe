import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Mainbody from "./components/Home/Mainbody";
import Template from "./components/Home/Template";
import Login from "./components/Login";
import "./App.css";
import CenterTabs from "./components/Form/Tabs";
import Questionform from "./components/Form/Questionform";

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
            <Route path="/form/:id" element={
            <div>
            <CenterTabs />
            <Questionform />
            </div>
            }>
            </Route>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </Router>
  );
}

export default App;