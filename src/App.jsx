import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Mainbody from "./components/Mainbody";
import Template from "./components/Template";
import Formheader from './components/Formheader'
import "./App.css";

const App = () => {
  return (
    <Router>
        <nav>
            <Link to="/">Home</Link>
        </nav>
        <Routes>
            <Route path="/" element={
              <div>
              <Template />
              <Mainbody />
            </div>
            } />
            <Route path="/form/:id" element={<Formheader />}>
            
            </Route>
        </Routes>
    </Router>
  );
}

export default App;