import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Mainbody from "./components/Home/Mainbody";
import Template from "./components/Home/Template";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Test from "./components/Tests/Test";
import "./App.css";
import CenterTabs from "./components/Form/Tabs";
import Questionform from "./components/Form/Questionform";
import UserForm from "./components/UserForm/UserForm";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const Navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const signOut = () => {
    setIsAuth(false);
    Navigate("/");
  }

  return (
      <div>
        <nav>
            <Link className="nav_text" to="/">Home</Link>
            {isAuth ? <button className = 'astext' onClick={signOut}>Logout</button> : <Link className="nav_text" to="/login">Login</Link>}
            {!isAuth ? <Link className="nav_text" to="/login">Auth_Test</Link> : <Link className="nav_text" to="/test">Auth_Test</Link>}
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
            <Route path = "/response" element={
              <UserForm />
            }>
            </Route>
            <Route path="/login" element={< Login setIsAuth={setIsAuth} />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/test" element={<Test/>}/>
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
}

export default App;