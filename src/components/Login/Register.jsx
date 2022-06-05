import React from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
    const Navigate = useNavigate();
    const state = {
        credentials: {username: '', password: '', email: ''},
    }

    const register = () => {
        console.log(state.credentials);
        fetch('http://127.0.0.1:8000/auth/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.credentials)
        })
        .then( data => data.json())
        .then(
            data => {
                console.log(data.token);
            }
        ).catch( error => console.error(error))
    }

    const inputChanged = event => {
        const cred = state.credentials;
        cred[event.target.name] = event.target.value; 
        state.credentials = cred;
    }

    const emailChange = event => {
        const cred = state.credentials;
        cred["email"] = event.target.value;
        cred["username"] = event.target.value;
        state.credentials = cred;
    }

    return (
      <div className="Register">
        <div class = "register_box_back"></div>
        <div class="register_box_front">
            <h1>Register</h1>
            <div className="register_form">
                <div class="txt_field">
                    <input type="text" name="username"
                     onChange={emailChange}
                     required/>
                    <span></span>
                    <label>Email</label>
                </div>
                <div class="txt_field">
                    <input type="password" name="password"
                     onChange={inputChanged}
                     required/>
                    <span></span>
                    <label>Password</label>
                </div>
                <button className="register_button" onClick={register}>Register</button>
            </div>
        </div>
      </div>
    );
  }
  
  export default Register;