import React, { useState, useEffect } from 'react'
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
    var request = await axios.get("http://127.0.0.1:8000/api/get_all_forms")
    let filename = request.data;
    setForms(filename)
    // console.log(filename[0].DocumentID)
  }

  function navigateTo(id) {
    Navigate("/form/" + id)
    console.log(id)
  }

  useEffect(() => {
    allForms();
  }, [])

  function removeDoc(id) {
    axios.delete(`http://127.0.0.1:8000/form/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => allForms());
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
                <th>Description</th>
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
                    <Button type="button" onClick={()=>navigateTo(form.DocumentID)} style={ {backgroundColor: "orange", color: "red", margin: 1, marginRight: 4 } } >Edit</Button>
                    <Button type="button" onClick={()=>removeDoc(form.DocumentID)}style={ {backgroundColor: "red", color: "white" } } >Delete</Button>
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
