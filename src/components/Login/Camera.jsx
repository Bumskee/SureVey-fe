import React from "react";
import './Camera.css'

const Camera = (props) => {
    
    return (props.trigger) ? (
    <div className="Cam-Background">
      <div className="Camera-app">
          <div className="camera">
              <video className="camscreen" ref={props.videoRef}></video>
              <button className="camButton" onClick={props.takePhoto}>TAKE PICTURE</button>
          </div>
          <div className={"result " + (props.hasPhoto ? 'hasPhoto' : '')}>
              <canvas className="camscreen" ref={props.photoRef}></canvas>
              <button className="camButton" onClick={props.retakePhoto}>RETAKE</button>
              <button className="camButton save" onClick={props.savePhoto}>SAVE</button>
          </div>
      </div>
    </div>
    ) : "";
  }
  
  export default Camera;