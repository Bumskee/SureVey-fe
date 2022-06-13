import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Mainbody from "./components/Home/Mainbody";
import Template from "./components/Home/Template";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Test from "./components/Tests/Test";
import "./App.css";
import CenterTabs from "./components/Form/Tabs";
import Questionform from "./components/Form/Questionform";
import UserForm from "./components/UserForm/UserForm";
import { useHistory } from "react-router-dom";

// const App = () => {
const Root = () => {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);
  const signOut = () => {
    setIsAuth(false);
    history.push("/");
  }

  return (
        <Router>
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

        {isAuth ? <button className = 'astext' onClick={signOut}>Logout</button> : <Link className="nav_text" to="/login">Login</Link>}

        {!isAuth ? <Link className="nav_text" to="/login">Auth_Test</Link> : <Link className="nav_text" to="/test">Auth_Test</Link>}
      </nav>
      <Route path="/login">
        <Login setIsAuth={setIsAuth} />
      </Route>

      <Route path="/account">
        {isAuth ? (
          <div>
            <Template />
            <Mainbody />
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route
        path="/form/:id">
          {isAuth ? (
          <div>
            <CenterTabs />
            <Questionform />
          </div>
          ) : (
            <Redirect to="/login" />
          )
        }
      </Route>
      <Route path="/response"><UserForm /></Route>
      <Route path="/register"><Register /></Route>
      <Route path="/test"><Test /></Route>
    </Router>
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
