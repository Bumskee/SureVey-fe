import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';
import "./Questionform.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import {
  ArrowRight,
  CheckBox,
  Close,
  CropOriginal,
  ShortText,
  Subject,
  FilterNone,
  MoreVert,
  DeleteOutline,
  AddCircleOutline,
  OndemandVideo,
  TextFields,
  PersonalVideoRounded,
  DragIndicator,
  FlareSharp,
  Article,
} from "@mui/icons-material";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useStateValue } from '../StateProvider'
import {actionTypes} from '../reducer'

function Questionform() {
  let { id } = useParams()
  const [{}, dispatch] = useStateValue()
  const [questions, setQuestions] = useState([
    {
      questionText: "Is cereal soup?",
      questionType: "radio",
      options: [
        { optionText: "yes" },
        { optionText: "no" },
        { optionText: "maybe" },
      ],
      answer: false,
      answerKey:"",
      points:0,
      open: true,
      required: true,
    },
  ]);
  const [documentName, setDocName] = useState("untitled Document");
  const [documentDesc, setDocDesc] = useState("Add Description");

  useEffect(() => {
    async function data_adding() {
      var request = await axios.get(`https://surevey-backend.herokuapp.com/api/form/${id}`);
      console.log(id);
      var question_data = request.data[1].DocumentQuests;
      console.log(question_data)
      var doc_name = request.data[0].DocumentName;
      console.log(doc_name)
      var doc_desc = request.data[0].DocumentDesc;
      console.log(doc_desc)
      setDocName(doc_name);
      setDocDesc(doc_desc);
      setQuestions(question_data);
      dispatch({
        type: actionTypes.SET_DOC_NAME,
        doc_name: doc_name

     }) 

      dispatch({
        type: actionTypes.SET_DOC_DESC,
        doc_desc: doc_desc

   })
      dispatch({
          type: actionTypes.SET_QUESTIONS,
          questions:question_data

       })
    }
    data_adding()
  }, [])

  function changeQuestion(text, i) {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
    console.log(newQuestion);
  }

  function addQuestionType(i, type) {
    let qs = [...questions];
    console.log(type);
    qs[i].questionType = type;

    setQuestions(qs);
  }

  function changeOptionValue(text, i, j) {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText = text;

    setQuestions(optionsQuestion);
    console.log(optionsQuestion);
  }

  function removeOption(i, j) {
    var RemoveOptionQuestion = [...questions];
    if (RemoveOptionQuestion[i].options.length > 1) {
      RemoveOptionQuestion[i].options.splice(j, 1);
      setQuestions(RemoveOptionQuestion);
      console.log(i + "__" + j);
    }
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionText: "Option " + (optionsOfQuestion[i].options.length + 1),
      });
    } else {
      console.log("No more than 5 options ");
    }

    setQuestions(optionsOfQuestion);
  }

  function copyQuestion(i) {
    expandCloseAll();
    let qs = [...questions];
    var newQuestion = { ...qs[i] };

    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function requiredQuestion(i) {
    var reqQuestion = [...questions];
    reqQuestion[i].required = !reqQuestion[i].required;

    console.log(reqQuestion[i].required + " " + i);
    setQuestions(reqQuestion);
  }

  function addMoreQuestionField() {
    expandCloseAll();

    setQuestions((questions) => [
      ...questions,
      {
        questionText: "Question",
        questionType: "radio",
        options: [{ optionText: "Option 1" }],
        open: true,
        required: false,
      },
    ]);
  }

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  
  function setOptionAnswer(ans, quesNo) {
    var Questions = [...questions];

    Questions[quesNo].answerKey = ans;

    setQuestions(Questions);
    console.log(quesNo + " " + ans);
  }

  function setOptionPoints(points, quesNo) {
    var Questions = [...questions];

    Questions[quesNo].points = points;

    setQuestions(Questions);
    console.log(quesNo + " " + points);
  }
  
  function addAnswer(i) {
    var answerOfQuestion = [...questions];

    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;

    setQuestions(answerOfQuestion)
  }

  function doneAnswer(i) {
    var answerOfQuestion = [...questions];

    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;

    setQuestions(answerOfQuestion)
  }

  function submitToDB() {
    // post
    console.log([...questions])
    fetch(`https://surevey-backend.herokuapp.com/api/form/${id}`, {
      method: 'POST',
      mode:'cors',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        "DocumentID" : id,
        "DocumentName" : documentName,
        "DocumentDesc" : documentDesc,
        "DocumentQuests" : questions,
    })
    })
    .then(res=>res.json())
    .then((result)=>{
      alert(result);
      },
      (error)=>{
        alert('Failed');
      })
  }

  function newQuestion() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: "100%", marginBottom: "0px" }}>
                    <DragIndicator
                      style={{
                        transform: "rotate(-90deg)",
                        color: "#DAE0E2",
                        // position: "relative",
                        // left: "300px",
                        display: "block",
                        textAlign: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      fontSize="small"
                    />
                </div>
                <div>
                  <Accordion
                    expanded={questions[i].open}
                    onChange={() => handleExpand(i)}
                    className={questions[i].open ? "add_border" : ""}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      elevation={1}
                      style={{ width: "100%"}}
                    >
                      {!questions[i].open ? (
                        <div className="saved_questions">
                          <Typography
                            style={{
                              fontSize: "15px",
                              fontWeight: "400",
                              letterSpacing: ".1px",
                              lineHeight: "24px",
                              paddingBottom: "8px",
                            }}
                          >
                            {i + 1}. {ques.questionText}
                          </Typography>

                          {ques.options.map((op, j) => (
                            <div key={j}>
                              <div style={{ display: "flex" }}>
                                <FormControlLabel
                                  style={{
                                    marginLeft: "5px",
                                    marginBottom: "5px",
                                  }}
                                  disabled
                                  control={
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      style={{ marginRight: "3px" }}
                                      required={ques.type}
                                    />
                                  }
                                  label={
                                    <Typography
                                      style={{
                                        fontFamily: " Roboto,Arial,sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                        letterSpacing: ".2px",
                                        lineHeight: "20px",
                                        color: "#202124",
                                      }}
                                    >
                                      {ques.options[j].optionText}
                                    </Typography>
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}

                    </AccordionSummary>

                    <div className="question_boxes">
                    {!questions[i].answer ? (
                        <AccordionDetails className="add_question">
                          <div>
                            <div className="add_question_top">
                              <input
                                type="text"
                                className="question"
                                placeholder="Question"
                                value={ques.questionText}
                                onChange={(event) => {
                                  changeQuestion(event.target.value, i);
                                }}
                              />
                              {/* <CropOriginal style={{ color: "#5f6368" }} /> */}
                              <Select
                                className="select"
                                style={{ color: "#5f6368", fontSize: "13px" }}
                              >
                                <MenuItem
                                  id="text"
                                  value="Text"
                                  onClick={() => {
                                    addQuestionType(i, "text");
                                  }}
                                >
                                  {" "}
                                  <Subject style={{ marginRight: "10px" }} />{" "}
                                  Paragraph
                                </MenuItem>
                                <MenuItem
                                  id="checkbox"
                                  value="Checkbox"
                                  onClick={() => {
                                    addQuestionType(i, "checkbox");
                                  }}
                                >
                                  <CheckBox
                                    style={{
                                      marginRight: "10px",
                                      color: "#70757a",
                                    }}
                                    checked
                                  />{" "}
                                  Checkboxes
                                </MenuItem>
                                <MenuItem
                                  id="radio"
                                  value="Radio"
                                  onClick={() => {
                                    addQuestionType(i, "radio");
                                  }}
                                >
                                  <Radio
                                    style={{
                                      marginRight: "10px",
                                      color: "#70757a",
                                    }}
                                    checked
                                  />{" "}
                                  Multiple Choice
                                </MenuItem>
                              </Select>
                            </div>
                            {ques.options.map((op, j) => (
                              <div className="add_question_body" key={j}>
                                {(ques.questionType != "text") ?
                                  <input
                                    type={ques.questionType}
                                    style={{ marginRight: "10px" }}
                                  />
                                 :
                                  <ShortText style={{ marginRight: "10px" }} />
                                }
                                <div>
                                  <input
                                    type="text"
                                    className="text_input"
                                    placeholder="option"
                                    value={ques.options[j].optionText}
                                    onChange={(event) => {
                                      changeOptionValue(event.target.value, i, j);
                                    }}
                                  />
                                </div>
                                {/* <CropOriginal style={{ color: "#5f6368" }} /> */}
                                <IconButton aria-label="delete">
                                  <Close
                                    onClick={() => {
                                      removeOption(i, j);
                                    }}
                                  />
                                </IconButton>
                              </div>
                            ))}
                            {ques.options.length < 5 ? (
                              <div className="add_question_body">
                                <FormControlLabel
                                  disabled
                                  control={
                                    (ques.questionType != "text") ? (
                                      <input
                                        type={ques.questionType}
                                        color="primary"
                                        inputProps={{
                                          "aria-label": "secondary checkbox",
                                        }}
                                        style={{
                                          marginLeft: "10px",
                                          marginRight: "10px",
                                        }}
                                        disabled
                                      />
                                    ) : (
                                      <ShortText
                                        style={{ marginRight: "10px" }}
                                      />
                                    )
                                  }
                                  label={
                                    <div>
                                      {/* <input
                                        type="text"
                                        className="text_input"
                                        style={{
                                          fontSize: "13px",
                                          width: "60px",
                                        }}
                                        placeholder="Add other"
                                      ></input> */}
                                      <Button
                                        size="small" 
                                        style={{
                                          textTransform: "none",
                                          color: "#4285f4",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                        onClick={() => {
                                          addOption(i);
                                        }}
                                      >
                                        Add Option
                                      </Button>
                                    </div>
                                  }
                                />
                              </div>
                            ) : ""}
                            <div className="add_footer">
                              <div className="add_question_bottom_left">
                                <Button
                                  size="small"
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  onClick={()=>{addAnswer(i)}}
                                >
                                  Answer key
                                  <ArrowRight
                                    style={{ padding: "2px", marginRight: "8px" }}
                                  />
                                </Button>
                              </div>
                              <div className="add_question_bottom">
                                {/* <IconButton
                                  aria-label="Copy"
                                  onClick={() => {
                                    copyQuestion(i);
                                  }}
                                > */}
                                  {/* <FilterNone /> */}
                                {/* </IconButton> */}
                                <IconButton
                                  aria-label="Delete"
                                  onClick={() => {
                                    deleteQuestion(i);
                                  }}
                                >
                                  <DeleteOutline />
                                </IconButton>
                                <span
                                  style={{ color: "#5f6368", fontSize: "13px" }}
                                >
                                  Required
                                </span>
                                <Switch
                                  name="checkedA"
                                  color="primary"
                                  onClick={() => {
                                    requiredQuestion(i);
                                  }}
                                  checked={ques.required}
                                />
                                {/* <IconButton> */}
                                  {/* <MoreVert /> */}
                                {/* </IconButton> */}
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>):(
                          <AccordionDetails className="add_question" >
                            <div className="top_header">
                              Choose Correct Answer
                            </div>
                            <div>
                              <div className="add_question_top">
                                <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(event)=>{changeQuestion(event.target.value, i)}} disabled />
                                <input type="number" className="points" min="0" step="1" placeholder="0" onChange={(e)=>{setOptionPoints(e.target.value, i)}} />
                              </div>
                              {ques.options.map((op, j)=>(
                                <div className="add_question_body" key={j} style={{marginLeft:"8px",marginBottom:"10px",marginTop:"5px"}}>
                                  <div key={j}>
                                    <div style={{display: 'flex'}} className="">
                                      <div className="form-check">
                                        <label style={{fontSize:"13px"}} onClick={()=>{setOptionAnswer(ques.options[j].optionText, i)}}>
                                        {(ques.questionType!="text") ? (
                                          <input
                                          type={ques.questionType}
                                          name={ques.questionText}
                                          
                                          value="option3"
                                          className="form-check-input"
                                          required={ques.required}
                                          style={{marginRight:"10px",marginBottom:"10px",marginTop:"5px"}}
                                        />) : <ShortText style={{marginRight:"10px"}} /> }
                                        {ques.options[j].optionText}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}

                              <div className="add_question_body">
                                <Button size="small"  style={{textTransform: 'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}> <Article style={{fontSize:"20px",marginRight:"8px"}} />Add Answer Feedback </Button>
                              </div>
                              
                              <div className="add_question_bottom">
                                <Button variant="outlined" color="primary"  style={{textTransform: 'none',color:"#4285f4",fontSize:"12px",marginTop:"12px",fontWeight:"600"}} onClick={()=>{doneAnswer(i)}}>
                                  Done
                                </Button>
                              </div>
                            </div>
                          </AccordionDetails>
                        )}

                        {!ques.answer ? (
                        <div className="question_edit">
                          <AddCircleOutline
                            className="edit"
                            onClick={addMoreQuestionField}
                          />
                          {/* <OndemandVideo className="edit" /> */}
                          {/* <CropOriginal className="edit" /> */}
                          {/* <TextFields className="edit" /> */}
                        </div>) : "" }
                      </div>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }
  return (
    <div>
      <div className="question_form">
        <br></br>
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input
                type="text"
                className="question_form_top_name"
                style={{ color: "black" }}
                placeholder="Untitled document"
                onChange={(event)=>{setDocName(event.target.value)}}
              />
              <input
                type="text"
                className="question_form_top_desc"
                placeholder="Form Description"
                onChange={(event)=>{setDocDesc(event.target.value)}}
              />
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {newQuestion()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="save_form">
            <Button variant="contained" color="primary" onClick={submitToDB} style={{fontSize:"14px"}}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionform;
