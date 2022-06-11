import { ArrowBack, Check } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import "./UserForm.css"

function UserForm() {
  const navigate = useNavigate()
  var quest = [];
  var posted_answer = [];
  
  var [answer, setAnswer] = useState([]);
  var [{ questions, doc_name, doc_desc }, dispatch] = useStateValue();

  function select(que, option) {
    var i = answer.findIndex((el) => el.question == que);
    answer[i].answer = option;
    setAnswer(answer);
  }

  useEffect(() => {
    questions.map((q) => {
      answer.push({
        question: q.questionText,
        answer: " ",
      });
    });
    questions.map((q, quesIndex) => {quest.push({ header: q.questionText, key: q.questionText });
  });
  }, [])

  var post_answer_data = {};

  function selectInput(que, option) {
    var k = answer.findIndex((ele) => ele.question == que);

    answer[k].answer = option;
    setAnswer(answer);
  }

  function selectCheck(e, que, option) {
    var d = [];
    var k = answer.findIndex((ele) => ele.question == que);
    if (answer[k].answer) {
      d = answer[k].answer.split(",");
    }

    if (e == true) {
      d.push(option);
    } else {
      var n = d.findIndex((el) => el.option == option);
      d.splice(n, 1);
    }

    answer[k].answer = d.join(",");

    setAnswer(answer);
  }

  function submit() {

  }

  return (
    <div className='submit'>
      <div className='user_form'>
        <div className='form_section'>
          <div className='title_section'>
            <Button 
              variant='contianed'
              color='primary'
              onClick={()=> {
                navigate(-1)
              }}
              style={{ fontSize: "14px" }}
            >
              {" "}
              <ArrowBack />
            </Button>
            <Typography style={{ fontSize: "26px"  }} align="right">{doc_name}</Typography>
            <Typography style={{ fontSize: "15px" }} align="right">{doc_desc}</Typography>
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