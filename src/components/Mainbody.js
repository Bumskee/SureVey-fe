import React, { useState } from 'react'
import "./Mainbody.css"
import data from "../data/mock-data.json"

export default function Mainbody() {

  const [forms, setFoms] = useState(data)

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
                <th>No. of Responses</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr>
                  <td>{form.title}</td>
                  <td>{form.date}</td>
                  <td>{form.responses}</td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
