import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
import Camera from './Camera'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

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
        var uri = photo.toDataURL('image/png'),
        b64 = uri.replace(/^data:image.+;base64,/, '');
        state.credentials["image"]=b64;
        console.log(state.credentials["image"])
    }

    const retakePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);
        state.credentials["image"]='';
        setHasPhoto(false);
        console.log(state.credentials["image"])
    }

    const savePhoto = () => {
        setOpenCam(false);
    }

    // useEffect(() => {
    //     const onPageLoad = () => {
    //         getVideo();
    //     };

    //     if (document.readyState === 'complete') {
    //         onPageLoad();
    //     } else {
    //         window.addEventListener("load", onPageLoad);
    //         return () => window.removeEventListener("load", onPageLoad);
    //     }
    // }, [videoRef])

    const Navigate = useNavigate();

    const [openCam, setOpenCam] = useState(false);

    const state = {
        credentials: {username: '', password: '', email: '', image:''},
    }

    const register = () => {
        fetch('https://surevey-backend.herokuapp.com/api/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.credentials)
        })
        .then( data => data.json())
        .then(
            data => {
                if (data.password) {
                    Navigate("/login");
                }
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
        retakePhoto();
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
      </div>
    );
  }
  
  export default Register;