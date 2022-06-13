import { Typography } from '@mui/material'
import React from 'react'
import "../ViewForm/ViewForm.css"

function UserForm() {
  return (
    <div className='submit'>
      <div className='user_form'>
        <div className='form_section'>
          <div className='title_section'>
            <Typography style={{ fontSize: "26px" }}>{doc_name}</Typography>
            <Typography style={{ fontSize: "15px" }}>{doc_desc}</Typography>
          </div>
          {questions.map((question, quesIndex) => (
            <div className='form_questions'>
              <Typography style={{ fontSize: "15px", fontWeight: "400", letterSpacing: ".1px", lineHeight:"24px", paddingBottom: "8px", fontSize: "14px", }}>
                {quesIndex + 1}. {question.questionText}
              </Typography>
              {question.options.map((ques, index) => (
                <div key={index} style={{ marginBottom: "5px"}}>
                  <div style= {{display: "flex" }}>
                    <div className='form_check'>
                      {question.questionType != "radio" ? (
                        question.questionType != "text" ? (
                          <label>
                            <input type = {question.questinType} name = {quesIndex} value= {ques.optionText} className="form_check_input" required={question.required} style={{ marginLeft: "5px", marginRight: "5px" }} onChange={(e) => {
                              selectCheck(
                                e.target.checked,
                                question.questionText,
                                ques.optionText
                              );
                            }}
                            />{" "}
                            {ques.optionText}
                          </label>
                        ) : (
                          <label>
                            <input type={question.questionType}
                              name={quesIndex}
                              value={ques.optionText}
                              className="form_check_input"
                              required={question.required}
                              style={{ margnLeft: "5px", marginRight: "5px" }}
                              onChange={(e) => {
                                selectInput(
                                  question.questionText,
                                  e.target.value
                                  );
                                }}
                              />{" "}
                              {ques.optionText}
                          </label>
                        )
                      ) : (
                        <label>
                            <input type={question.questionType}
                              name={quesIndex}
                              value={ques.optionText}
                              className="form_check_input"
                              required={question.required}
                              style={{ margnLeft: "5px", marginRight: "5px" }}
                              onChange={(e) => {
                                select(question.questionText, ques.optionText);
                                }}
                              />
                              {ques.optionText}
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className='form_submit'>
            <Button variant="contained" color="primary" onClick={submit} style={{ fontSize: "14px" }}>Submit</Button>
          </div>
          <div className='user_footer'>SureVey Form</div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;              