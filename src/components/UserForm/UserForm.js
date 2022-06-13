import { Button, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import "../ViewForm/ViewForm.css"

function UserForm() {
  var Navigate = useNavigate()
  var quest = [];
  var posted_answer_data = {};
  var { id } = useParams();

  var [answer, setAnswer] = useState([]);
  var [{}, dispatch] = useStateValue();
  var [questions, setQuestions] = useState([]);
  var [doc_name, setDocName] = useState("");
  var [doc_desc, setDocDesc] = useState("");

  useEffect(() => {
    async function data_adding() {
      var request = await axios.get(
        `https://surevey-backend.herokuapp.com/api/form/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((request) => {
        var question_data = request.data.DocumentQuests;
        var doc_name = request.data.DocumentName;
        var doc_desc = request.data.DocumentDesc;

        setDocName(doc_name);
        console.log(doc_name);
        setDocDesc(doc_desc);
        setQuestions(question_data);

        // dispatch({
        //   type: actionTypes.SET_DOC_NAME,
        //   doc_name: doc_name,
        // });

        // dispatch({
        //   type: actionTypes.SET_DOC_DESC,
        //   doc_desc: doc_desc,
        // });
        
        // dispatch({
        //   type: actionTypes.SET_QUESTIONS,
        //   questions: question_data,
        // });

        question_data.map((q) => {
          answer.push({
            question: q.questionText,
            answer: " ",
          });
        });

        question_data.map((q, quesIndex) => {
          quest.push( {header: q.questionText, key: q.questionText} )
        });

      })
      .catch((error) => {
        console.log(error)
      })
    }

    console.log(id);
    data_adding();
  }, []);

  function select( que, option ) {
    var j = answer.findIndex((el) => el.question == que);

    answer[j].answer = option;
    setAnswer(answer);
  }

  function selectInput( que, option ) {
    var j = answer.findIndex((el) => el.question == que);

    answer[j].answer = option;
    setAnswer(answer);
  }

  function selectCheck(e, que, option) {
    var l = [];
    var j = answer.findIndex((el) => el.question == que );

    if (answer[j].answer) {
      l = answer[j].answer.split(",");
    }

    if (e == true) {
      l.push(option);
    } else {
      var k = l.findIndex((el) => el.option == option );
      l.splice(k, 1);
    }

    answer[j].answer = l.join(",");

    setAnswer(answer);
  }

  function submit() {

    answer.map((el) => {
      posted_answer_data[el.question] = el.answer
    });

    console.log(posted_answer_data)

    axios.post(
      `https://surevey-backend.herokuapp.com/responses/${id}`,
      {
        column: quest,
        answer_data: [posted_answer_data],
      }
    );

    Navigate(`/submit`)
  }

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