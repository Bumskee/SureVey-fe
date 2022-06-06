import { MoreVert } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import "./Template.css"
import survey from "../../images/template-form.png"
import blank from "../../images/blank02.png"
import uuid from "react-uuid"
import { useNavigate } from "react-router-dom"

function Template() {
  
  const navigate = useNavigate();


  const createForm = () => {
    const id_ = uuid();

    navigate("/form/" + id_)

  }

  return (
    <div className='template_section'>
      <div className='template_top'>
        <div className='template_left'>
          <span style={{fontsize:'16px', color:'#202124'}}>Start a New Form</span>
        </div>
        {/* <div className='template_right'> */}
          {/* <IconButton> */}
            {/* <MoreVert /> */}
          {/* </IconButton> */}
        {/* </div> */}
        
      </div>
      <div className='template_body'>
        <div className='card' onClick={createForm}>
          <img src={blank} alt='no image' className='card_image'/>
          <p className='card_title'>Blank</p>
        </div>
        <div className='card'>
          <img src={survey} alt='no image' className='card_image'/>
          <p className='card_title'>Survey</p>
        </div>
      </div>
    </div>
  )
}

export default Template