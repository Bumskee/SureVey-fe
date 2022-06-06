import React, { useState } from 'react'
import "./Mainbody.css"
import { useNavigate } from "react-router-dom";
import data from "../../data/mock-data.json"

import axios from "axios"
import { Button } from '@mui/material'

export default function Mainbody() {
  const Navigate = useNavigate()
  const [forms, setForms] = useState(data)

  async function allForms() {
    // GET
    var request = await axios.get("https://surevey-backend.herokuapp.com/api/get_all_forms")
    let filename = request.data;
    setForms(filename)
    console.log(filename[0].DocumentID)
  }

  function navigateTo(id) {
    Navigate("/form/" + id)
  }

  return (
    <div className="mainbody">
      <div className='mainbody_top'>
        <div className='mainbody_top_left' style={{fontSize:"16px", fontWeight:"500"}}>
          Recent Forms 
        </div>
        <div className='mainbody_top_right'></div>
      </div>
      <div className='mainbody_container'>
        <div className='mainbody_table'>
          <table>
            <thead>
              <tr>
                <th>Form Title</th>
                <th>Date Created</th>
                {/* <th>No. of Responses</th> */}
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr>
                  <td>{form.DocumentName}</td>
                  <td>{form.DocumentDesc}</td>
                  {/* <td>{form.responses}</td> */}
                  <td>
                    <button type="button" onClick={()=>navigateTo(form.DocumentID)}>Edit</button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
        <div className='refresh_button'>
          <Button onClick={()=> (allForms())}>Refresh</Button>
        </div>
      </div>
    </div>
  )
}
