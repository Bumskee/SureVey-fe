import React, { useState, useEffect } from 'react'
import "./Mainbody.css"
import { useHistory, withRouter } from "react-router-dom";
import data from "../../data/mock-data.json"

import axios from "axios"
import { Button } from '@mui/material'
import { Delete, DeleteOutline, Edit, EditOutlined } from '@mui/icons-material';

function Mainbody() {
  const history = useHistory()
  const [forms, setForms] = useState(data)

  async function allForms() {
    // GET
    var request = await axios.get("https://surevey-backend.herokuapp.com/api/get_all_forms")
    let filename = request.data;
    setForms(filename)
    // console.log(filename[0].DocumentID)
  }

  function navigateTo(id) {
    history.push("/form/" + id)
    console.log(id)
  }

  useEffect(() => {
    allForms();
  }, [])

  function removeDoc(id) {
    axios.delete(`https://surevey-backend.herokuapp.com/form/${id}`, {
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
                <th>Actions</th>
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
                    <Edit type="button" onClick={()=>navigateTo(form.DocumentID)} style={ {margin: 1, marginRight: 4, paddingLeft: 20 } } />
                    <DeleteOutline type="button" onClick={()=>removeDoc(form.DocumentID)} style={ {margin: 1, paddingLeft: 20} } />
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

export default Mainbody;