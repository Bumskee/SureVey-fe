import React from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'

const RegisterModal = () => {

    const state = {
        credentials: {username: '', password: '', email: ''},
    }

    const register =() => {
        fetch('http://127.0.0.1:8000/api/users/', {
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
        state.credentials = cred;
    }

    return (
        <div className="register-container">

<Modal
{...this.props} 
size='lg' 
aria-labelledby="contained-modal-title-vcenter" 
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Register
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
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
                    <button className="login_button" onClick={register}>Login</button>
                </div>
            </Col>
        </Row>
    </Modal.Body>

    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Cancel</Button>
    </Modal.Footer>

</Modal>
        </div>
    )
}

export { RegisterModal };