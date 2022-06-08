import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
import Camera from './Camera'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { nodeflux_auth, nodefluxFaceMatch } from "../nodeflux/nodeflux"

const Register = () => {

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: { width:1920, height:1080 }
        })
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const takePhoto = () => {
        const width = 720;
        const height = width / (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
        var b64 = photo.toDataURL('image/jpeg')
        state.credentials["image"]=b64;
        console.log(b64);
    }

    const retakePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);
        state.credentials["image"]=null;
        setHasPhoto(false);
    }

    const savePhoto = () => {
        setOpenCam(false);
        setHasPhoto(false);
    }

    const Navigate = useNavigate();

    const [openCam, setOpenCam] = useState(false);

    const state = {
        credentials: {id: null, username: '', password: '', email: '', image:''},
    }

    const testButtonClicked = async (a) => {
        a.preventDefault();
        let auth = await nodeflux_auth();


        const doSomething = delay_amount_ms =>
            new Promise(resolve => setTimeout(() => resolve("delay"), delay_amount_ms))

        const loop = async () => {
            // set loading to true here
            let status;
            let result;
            while (['success', 'incompleted'].includes(status) !== true) {
                result = await nodefluxFaceMatch({
                    "auth_key": auth.auth_key,
                    "timestamp": auth.timestamp
                }, state.credentials["image"], state.credentials["image"])
                status = result.response.job.result.status
                await doSomething(100)
                console.log(status)
            }

            console.log(result) // DISABLE LATER
            if (result.response.message === "No face detected") {
                alert("No face detected in your captured photo");
            } else if (result.response.message === "Face Match Success") {
                console.log(result.job.result.result.face_match.match);
            } else {
                alert(result.response.message)
            }
        }

        await loop().then(() => {alert("success boi")});
    }

    const register = () => {
        fetch('https://surevey-backend.herokuapp.com/api/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.credentials)
        })
        .then( res => res.json())
        .then(
            () => {
                Navigate("/");
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

    const cam_button_clicked = () => {
        setOpenCam(true);
        getVideo();
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
                <div className="register-cam">
                <button className="open_cam_button" onClick={cam_button_clicked}><CameraAltIcon style={{ color: "white" }} /></button>
                    <button className="register_button" onClick={register}>Register</button>
                </div>
            </div>
        </div> 
        <Camera trigger={openCam} setTrigger={setOpenCam} videoRef={videoRef} takePhoto={takePhoto}
        hasPhoto={hasPhoto} photoRef={photoRef} retakePhoto={retakePhoto} savePhoto={savePhoto}>
            <h3>Camera</h3>
        </Camera>
        <button onClick={testButtonClicked}>testcalllmao</button>
      </div>
    );
  }
  
  export default Register;