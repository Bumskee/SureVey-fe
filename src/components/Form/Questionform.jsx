import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
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
  Switch,
  Typography,
} from "@mui/material";
import {
  ArrowRight,
  CheckBox,
  Close,
  ShortText,
  DeleteOutline,
  AddCircleOutline,
  DragIndicator,
  Article,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Questionform() {
  const Navigate = useNavigate();

  let { id } = useParams();
  const [{}, dispatch] = useStateValue();
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
      answerKey: "",
      points: 0,
      open: true,
      required: true,
    },
  ]);
  const [documentName, setDocName] = useState("Untitled Document");
  const [documentDesc, setDocDesc] = useState("Add Description");

  const [isNew, setNew] = useState(false);

  useEffect(() => {
    async function data_adding() {
      axios
        .get(`https://surevey-backend.herokuapp.com/api/form/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((request) => {
          var question_data = request.data.DocumentQuests;
          var doc_name = request.data.DocumentName;
          var doc_desc = request.data.DocumentDesc;

          setDocName(doc_name);
          console.log(doc_name);
          setDocDesc(doc_desc);
          setQuestions(question_data);

          dispatch({
            type: actionTypes.SET_DOC_NAME,
            doc_name: doc_name,
          });

          dispatch({
            type: actionTypes.SET_DOC_DESC,
            doc_desc: doc_desc,
          });
          
          dispatch({
            type: actionTypes.SET_QUESTIONS,
            questions: question_data,
          });
        })
        .catch(() => {
          setNew(true);
        });
    }

    data_adding();
  }, []);

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

  // function copyQuestion(i) {
  //   expandCloseAll();
  //   let qs = [...questions];
  //   var newQuestion = { ...qs[i] };

  //   setQuestions([...questions, newQuestion]);
  // }

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

    console.log(answerOfQuestion);
    setQuestions(answerOfQuestion);
    console.log(questions);
  }

  function doneAnswer(i) {
    var answerOfQuestion = [...questions];

    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
    console.log(i + "here");
    console.log(answerOfQuestion)

    setQuestions(answerOfQuestion);
    console.log(questions);
  }

  // function submitToDB() {
  //   // post
  //   console.log([...questions])
  //   fetch(`http://127.0.0.1:8000/api/form/${id}`, {
  //     method: 'POST',
  //     mode:'cors',
  //     headers:{
  //       'Accept':'application/json',
  //       'Content-Type':'application/json'
  //   },
  //   body:JSON.stringify({
  //       "DocumentID" : id,
  //       "DocumentName" : documentName,
  //       "DocumentDesc" : documentDesc,
  //       "DocumentQuests" : questions,
  //   })
  //   })
  //   .then(res=>res.json())
  //   .then((result)=>{
  //     alert(result);
  //     },
  //     (error)=>{
  //       alert('Failed');
  //     })
  // }

  function submitToDB() {
    console.log(questions);
    dispatch({
      type: actionTypes.SET_QUESTIONS,
      questions: questions,
    });

    if (isNew) {
      console.log(id);
      console.log(documentName);
      axios.post(
        `https://surevey-backend.herokuapp.com/api/form/${id}`,
        {
          DocumentID: id,
          DocumentName: documentName,
          DocumentDesc: documentDesc,
          DocumentQuests: questions,
          Creator: localStorage.getItem("email"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then(
        () => alert("Form Saved")
      );
      setNew(false);
      
    } else {
      axios.put(
        `https://surevey-backend.herokuapp.com/api/form/${id}`,
        {
          DocumentID: id,
          DocumentName: documentName,
          DocumentDesc: documentDesc,
          DocumentQuests: questions,
          Creator: localStorage.getItem("email"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then(() => alert("Form Updated"));
    }
  }

  function viewForm() {
    dispatch({
      type: actionTypes.SET_DOC_NAME,
      doc_name: documentName,
    });

    dispatch({
      type: actionTypes.SET_DOC_DESC,
      doc_desc: documentDesc,
    });
    
    dispatch({
      type: actionTypes.SET_QUESTIONS,
      questions: questions,
    });
    
    // save before view
    submitToDB();

    Navigate("/response");
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
                      style={{ width: "100%" }}
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
                      {!ques.answer ? (
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
                              <Select
                                className="select"
                                style={{ color: "#5f6368", fontSize: "13px" }}
                              >
                                {/* <MenuItem
                                  id="text"
                                  value="Text"
                                  onClick={() => {
                                    addQuestionType(i, "text");
                                  }}
                                >
                                  {" "}
                                  <Subject
                                    style={{ marginRight: "10px" }}
                                  />{" "}
                                  Paragraph
                                </MenuItem> */ 
                                /* removed this because its annoying to use paragraph */}
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
                            {ques?.options.length > 0 &&
                            ques.options.map((op, j) => (
                              <div className="add_question_body" key={j}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                {ques.questionType != "text" ? (
                                  <input
                                    // className="question_text_input"
                                    type={ques.questionType}
                                    style={{ marginRight: "10px" }}
                                  />
                                ) : (
                                  <ShortText style={{ marginRight: "10px" }} />
                                )}
                                  <input
                                    type="text"
                                    className="text_input"
                                    placeholder="option"
                                    value={ques.options[j].optionText}
                                    onChange={(event) => {
                                      changeOptionValue(
                                        event.target.value,
                                        i,
                                        j
                                      );
                                    }}
                                  />
                                  </div>
                                  <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                {/* <CropOriginal style={{ color: "#5f6368" }} /> */}
                                <IconButton aria-label="delete" onClick={() => {
                                      removeOption(i, j);
                                    }}>
                                  <Close/>
                                </IconButton>
                              </div>
                              </div>
                            ))}
                            {ques.options.length < 5 ? (
                              <div className="add_question_body">
                                <FormControlLabel
                                  disabled
                                  control={
                                    ques.questionType != "text" ? (
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
                                      ></input> */
                                      /* not working */}
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
                            ) : (
                              ""
                            )}
                            <div className="add_footer">
                              <div className="add_question_bottom_left">
                                <Button
                                  size="small"
                                  className="leftPadding"
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  onClick={() => {
                                    addAnswer(i);
                                  }}
                                >
                                  {" "}
                                  <ArrowRight
                                    style={{
                                      padding: "2px",
                                      marginRight: "8px",
                                    }}
                                  />{" "}
                                  Answer Key
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
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title={"Delete question"}
                                  onClick={() => {
                                    deleteQuestion(i);
                                  }}
                                >
                                  <DeleteOutline />
                                </IconButton>
                                <div>
                                <span
                                  style={{ color: "#5f6368", fontSize: "13px" }}
                                >
                                  Required {" "}
                                </span>
                                {" "}
                                <Switch
                                  name="checkedA"
                                  color="primary"
                                  onClick={() => {
                                    requiredQuestion(i);
                                  }}
                                  checked={ques.required}
                                />
                                </div>
                                {/* <IconButton> */}
                                {/* <MoreVert /> */}
                                {/* </IconButton> */}
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      ) : (
                        <AccordionDetails className="add_question">
                          <div className="top_header">
                            Choose Correct Answer
                          </div>
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
                                disabled
                              />
                              <input
                                type="number"
                                className="points"
                                min="0"
                                step="1"
                                placeholder="0"
                                onChange={(e) => {
                                  setOptionPoints(e.target.value, i);
                                }}
                              />
                            </div>
                            {ques.options.map((op, j) => (
                              <div
                                className="add_question_body"
                                key={j}
                                style={{
                                  marginLeft: "8px",
                                  marginBottom: "10px",
                                  marginTop: "5px",
                                }}
                              >
                                <div key={j}>
                                  <div style={{ display: "flex" }} className="">
                                    <div className="form-check">
                                      <label
                                        style={{ fontSize: "13px" }}
                                        onClick={() => {
                                          setOptionAnswer(
                                            ques.options[j].optionText,
                                            i
                                          );
                                        }}
                                      >
                                        {ques.questionType != "text" ? (
                                          <input
                                            type={ques.questionType}
                                            name={ques.questionText}
                                            value="option3"
                                            className="form-check-input"
                                            required={ques.required}
                                            style={{
                                              marginRight: "10px",
                                              marginBottom: "10px",
                                              marginTop: "5px",
                                            }}
                                          />
                                        ) : (
                                          <ShortText
                                            style={{ marginRight: "10px" }}
                                          />
                                        )}
                                        {ques.options[j].optionText}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}

                            <div className="add_question_body">
                              <Button
                                size="small"
                                style={{
                                  textTransform: "none",
                                  color: "#4285f4",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                }}
                              >
                                {" "}
                                <Article
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "8px",
                                  }}
                                />
                                Add Answer Feedback{" "}
                              </Button>
                            </div>

                            <div className="add_question_bottom">
                              <Button
                                variant="outlined"
                                color="primary"
                                style={{
                                  textTransform: "none",
                                  color: "#4285f4",
                                  fontSize: "12px",
                                  marginTop: "12px",
                                  fontWeight: "600",
                                }}
                                onClick={() => {
                                  doneAnswer(i);
                                }}
                              >
                                Done
                              </Button>
                            </div>
                          </div>
                        </AccordionDetails>
                      )}

                      {!ques.answer ? (
                        <div className="question_edit">
                          <IconButton 
                          className="edit"
                          data-toggle="tooltip"
                          data-placement="top"
                          title={"Add question"}
                          onClick={addMoreQuestionField}>
                          

                            <AddCircleOutline />
                          </IconButton>
                          {/* <OndemandVideo className="edit" /> */}
                          {/* <CropOriginal className="edit" /> */}
                          {/* <TextFields className="edit" /> */}
                        </div>
                      ) : (
                        ""
                      )}
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
                value={documentName}
                onChange={(event) => {
                  console.log(event.target.value);
                  setDocName(event.target.value);
                }}
              />
              <input
                type="text"
                className="question_form_top_desc"
                placeholder={
                  documentDesc
                    ? documentDesc
                    : "Document description"
                }
                value={documentDesc}
                onChange={(event) => {
                  setDocDesc(event.target.value);
                }}
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
            <Button
              variant="contained"
              color="primary"
              onClick={submitToDB}
              style={{ fontSize: "14px" }}
            >
              Save
            </Button>
            <IconButton onClick={viewForm} style={{ marginLeft: "15px" }}>
              <RemoveRedEyeOutlined />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionform;
