import { Typography } from "@mui/material";
import React from "react";
import "../ViewForm/ViewForm.css";

function Submit() {
  return (
    <div className="submit">
      <div className="user_form">
        <div className="form_section">
          <div className="title_section">
            <Typography
              style={{
                fontSize: "26px",
                fontFamily: "'Google Sans','Roboto','Arial','sans-serif'",
              }}
            >
              Untitled Form
            </Typography>
            <br></br>
            <Typography style={{ fontSize: "13px", fontWeight: "400" }}>
              Your response has been recorded.
            </Typography>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Submit;
