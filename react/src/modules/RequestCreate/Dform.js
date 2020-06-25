import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import download from "js-file-download";
import Nav from "../Dashboard/Navi";

const Dform = (props) => {
  const [allPlaceholders, setPlaceholders] = useState([]);
  const [inputFields, setInputFields] = useState([{ Name: "", Roll: "" }]);
  const [team_name, setTeamname] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [respects, setRespects] = useState("");
  const [event_name, setEventname] = useState("");
  const [letter_body, setLetterbody] = useState("");
  const [hall_name, setHallname] = useState("");
  const [fromdate, setFromdate] = useState("");
  const [start_hour, setStarthour] = useState("");
  const [todate, setTodate] = useState("");
  const [start_min, setStartmin] = useState("");
  const [start_meridian, setStartmeridian] = useState("");
  const [end_hour, setEndhour] = useState("");
  const [end_min, setEndmin] = useState("");
  const [end_meridian, setEndmeridian] = useState("");
  const [where, setWhere] = useState("");
  useEffect(() => {
    console.log(props.location);
    let data = {
      templateName: props.location.subject,
    };
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    console.log(
      accessToken,
      data,
      `${process.env.REACT_APP_URL}/getPlaceHolders`
    );
    axios
      .post(`${process.env.REACT_APP_URL}/getPlaceholders`, data, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.placeholders);

        // setPlaceholders(res.data.placeholders);
        // console.log(allPlaceholders);
        res.data.placeholders.forEach((placeholder) => {
          switch (placeholder) {
            case "designation":
              setbdesignation(true);
              break;
            case "department":
              setbdepartment(true);
              break;
            case "date":
              setbdate(true);
              break;
            case "subject":
              setbsubject(true);
              break;
            case "respects":
              setbrespects(true);
              break;
            case "team_name":
              setbteamname(true);
              break;
            case "event_name":
              setbevent_name(true);
              break;
            case "fromdate":
              setbfromdate(true);
              break;
            case "todate":
              setbtodate(true);
              break;
            case "letter_body":
              setbletter_body(true);
              break;
            case "hall_name":
              setbhall_name(true);
              break;
            case "start_hour":
              setbstart_hour(true);
              break;
            case "start_min":
              setbstart_min(true);
              break;
            case "start_meridian":
              setbstart_meridian(true);
              break;
            case "end_hour":
              setbend_hour(true);
              break;
            case "end_min":
              setbend_min(true);
              break;
            case "end_meridian":
              setbend_meridian(true);
              break;
            case "campaignwhere":
              setbwhere(true);
              break;
            case "#studentdetails":
              setbInputFields(true);
              break;
            //case 'Name': ; break;
            //case 'Roll': ; break;
            //case '/studentdetails': ; break;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //boolean values
  const [binputFields, setbInputFields] = useState(false);
  const [bdesignation, setbdesignation] = useState(false);
  const [bdepartment, setbdepartment] = useState(false);
  const [bteamname, setbteamname] = useState(false);
  const [bdate, setbdate] = useState(false);
  const [bsubject, setbsubject] = useState(false);
  const [brespects, setbrespects] = useState(false);
  const [bevent_name, setbevent_name] = useState(false);
  const [bletter_body, setbletter_body] = useState(false);
  const [bhall_name, setbhall_name] = useState(false);
  const [bfromdate, setbfromdate] = useState(false);
  const [bstart_hour, setbstart_hour] = useState(false);
  const [bstart_min, setbstart_min] = useState(false);
  const [btodate, setbtodate] = useState(false);
  const [bstart_meridian, setbstart_meridian] = useState(false);
  const [bend_hour, setbend_hour] = useState(false);
  const [bend_min, setbend_min] = useState(false);
  const [bend_meridian, setbend_meridian] = useState(false);
  const [bwhere, setbwhere] = useState(false);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ Name: "", Roll: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "Name") {
      values[index].Name = event.target.value;
    } else if (event.target.name === "Roll") {
      values[index].Roll = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      team_name,
      designation,
      department,
      date,
      subject,
      respects,
      event_name,
      hall_name,
      letter_body,
      fromdate,
      start_hour,
      start_min,
      start_meridian,
      todate,
      end_hour,
      end_min,
      end_meridian,
      where
    );
  };

  var studentdetails = inputFields;

  const submit = (e) => {
    console.log("inputFields", team_name);
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    // let data = []
    // if(binputFields)
    // data.push(designation)
    // if(bdepartment)
    // data.push(department)
    // if(bteamname)
    // data.push(team_name)
    // if(bdate)
    // data.push(date)
    // if(bsubject)
    // data.push(subject)
    // if(brespects)
    // data.push(respects)
    // if(bevent_name)
    // data.push(event_name)
    // if(bletter_body)
    // data.push(letter_body)
    // if(bhall_name)
    // data.push(hall_name)

    axios
      .post(
        `${process.env.REACT_APP_URL}/generateTemplateLetter`,
        {
          template_name: props.location.subject,
          form_data: {
            designation,
            department,
            date,
            subject,
            respects,
            team_name,
            event_name,
            hall_name,
            fromdate,
            start_hour,
            start_min,
            start_meridian,
            todate,
            end_hour,
            end_min,
            end_meridian,
            letter_body,
            studentdetails,
            where,
          },
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + accessToken,
          },
          responseType: "arraybuffer",
        }
      )
      .then((result) => {
        //console.log(result.data);
        //download(result.data, 'Team_Attendance_Permission.docx');
        const file = new Blob([result.data], {
          type:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        download(file, "generated.docx");
      });
  };

  return (
    <div>
      <Nav />
      <form onSubmit={handleSubmit}>
        <div style={{ color: "white" }} id="booking" className="section">
          <div className="section-center">
            <div className="container">
              <div className="row">
                <div className="booking-form">
                  <form id="txtb" method="POST" action="/conductmeet">
                    <h3 style={{ textAlign: "center" }}>Dynamic form</h3>
                    <br />
                    <br />
                    {bdesignation && (
                      <div>
                        <div className="form-group">
                          <span className="form-label" for="designation">
                            Designation:{" "}
                          </span>
                          <select
                            required
                            className="form-control"
                            name="designation"
                            onChange={(e) => {
                              e.persist();
                              setDesignation(e.target.value);
                            }}
                          >
                            <option value="" disabled selected hidden>
                              Select your option
                            </option>
                            <option value="Head of Department">
                              Head of Department
                            </option>
                            <option value="Director">Director</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                        <br />{" "}
                      </div>
                    )}
                    {bdepartment && (
                      <div>
                        <div className="form-group">
                          <span className="form-label" for="department">
                            Department:{" "}
                          </span>
                          <select
                            required
                            className="form-control"
                            name="department"
                            onChange={(e) => {
                              e.persist();
                              setDepartment(e.target.value);
                            }}
                          >
                            <option value="" disabled selected hidden>
                              Select your option
                            </option>
                            <option value="Department of Computer Science and Engineering">
                              Department of Computer Science and Engineering
                            </option>
                            <option value="Department of Information Technology">
                              Department of Information Technology
                            </option>
                            <option value="Department of Electrical and Electronics Engineering">
                              Department of Electrical and Electronics
                              Engineering
                            </option>
                            <option value="Department of Electronics and Communication Engineering">
                              Department of Electronics and Communication
                              Engineering
                            </option>
                            <option value="Department of Civil Engineering">
                              Department of Civil Engineering
                            </option>
                            <option value="Department of Mechanical Engineering">
                              Department of Mechanical Engineering
                            </option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>

                        <br />
                      </div>
                    )}
                    {bdate && (
                      <div>
                        <div className="form-group">
                          <span className="form-label" for="date">
                            Current Date:{" "}
                          </span>
                          <input
                            className="form-control"
                            type="date"
                            name="date"
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </div>
                        <br />
                      </div>
                    )}
                    {bsubject && (
                      <div>
                        <div className="form-group">
                          <span className="form-label" for="subject">
                            Subject:{" "}
                          </span>
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="subject"
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter subject (ex: Requisition of attendance for Organising Committee)"
                          />
                        </div>
                        <br />
                      </div>
                    )}
                    {brespects && (
                      <div>
                        <div className="form-group">
                          <span className="form-label" for="respects">
                            Respects:{" "}
                          </span>
                          <select
                            required
                            className="form-control"
                            name="respects"
                            onChange={(e) => setRespects(e.target.value)}
                          >
                            <option value="" disabled selected hidden>
                              Select your option
                            </option>
                            <option value="Sir">Sir</option>
                            <option value="Ma'am">Ma'am</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                        <br />
                      </div>
                    )}
                    {bteamname && (
                      <div>
                        <div className="form-group">
                          <span className="form-label" for="team_name">
                            Forum/Team name :{" "}
                          </span>
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="team_name"
                            onChange={(e) => setTeamname(e.target.value)}
                            placeholder="Enter name"
                          />
                        </div>
                        <br />
                      </div>
                    )}
                    {bevent_name && (
                      <div>
                        <div className="form-group">
                          <span className="form-label" for="event_name">
                            Event name :{" "}
                          </span>
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="event_name"
                            onChange={(e) => setEventname(e.target.value)}
                            placeholder="Enter event name"
                          />
                        </div>
                        <br />
                      </div>
                    )}
                    {bhall_name && (
                      <div>
                        <div className="form-group">
                          <span className="form-label" for="hall_name">
                            Enter Hall Name :{" "}
                          </span>
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="hall_name"
                            placeholder="Enter Hall name"
                            onChange={(e) => setHallname(e.target.value)}
                          />
                        </div>
                        <br />
                      </div>
                    )}
                    {bletter_body && (
                      <div>
                        <div className="form-group">
                          <span className="form-label" for="letter_body">
                            Letter Body :{" "}
                          </span>
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="letter_body"
                            onChange={(e) => setLetterbody(e.target.value)}
                            placeholder="Describe your Event"
                          />
                        </div>
                        <br />
                      </div>
                    )}
                    {bwhere && (
                      <div>
                        <div className="form-group">
                          <span className="form-label" for="where">
                            Inside / Outside :{" "}
                          </span>
                          <select
                            className="form-control"
                            name="where"
                            onChange={(e) => setWhere(e.target.value)}
                          >
                            <option>Inside</option>
                            <option>Outside</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                        <br />
                      </div>
                    )}

                    {bfromdate && (
                      <div>
                        <span className="form-label">
                          Select Date and Time :
                        </span>
                        <br />
                        <div className="row">
                          <div className="col-sm-5">
                            <div className="form-group">
                              <span className="form-label" for="fromdate">
                                From
                              </span>
                              <input
                                className="form-control"
                                type="date"
                                name="fromdate"
                                required
                                onChange={(e) => setFromdate(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-sm-7">
                            <div className="row">
                              <div className="col-sm-4">
                                <div className="form-group">
                                  <span className="form-label" for="start_hour">
                                    Hour
                                  </span>
                                  <select
                                    required
                                    className="form-control"
                                    name="start_hour"
                                    onChange={(e) => {
                                      e.persist();
                                      setStarthour(e.target.value);
                                    }}
                                  >
                                    <option value="" disabled selected hidden>
                                      ...
                                    </option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                  </select>
                                  <span className="select-arrow"></span>
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div className="form-group">
                                  <span className="form-label" for="start_min">
                                    Min
                                  </span>
                                  <select
                                    required
                                    className="form-control"
                                    name="start_min"
                                    onChange={(e) => {
                                      e.persist();
                                      setStartmin(e.target.value);
                                    }}
                                  >
                                    <option value="" disabled selected hidden>
                                      ...
                                    </option>
                                    <option value="00">00</option>
                                    <option value="05">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                    <option value="50">50</option>
                                    <option value="55">55</option>
                                  </select>
                                  <span className="select-arrow"></span>
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div className="form-group">
                                  <span
                                    className="form-label"
                                    for="start_meridian"
                                  >
                                    AM/PM
                                  </span>
                                  <select
                                    required
                                    className="form-control"
                                    name="start_meridian"
                                    onChange={(e) => {
                                      e.persist();
                                      setStartmeridian(e.target.value);
                                    }}
                                  >
                                    <option value="" disabled selected hidden>
                                      ...
                                    </option>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                  </select>
                                  <span className="select-arrow"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {btodate && (
                      <div>
                        <div className="row">
                          <div className="col-sm-5">
                            <div className="form-group">
                              <span className="form-label" for="todate">
                                To
                              </span>
                              <input
                                className="form-control"
                                name="todate"
                                type="date"
                                required
                                onChange={(e) => setTodate(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-sm-7">
                            <div className="row">
                              <div className="col-sm-4">
                                <div className="form-group">
                                  <span className="form-label" for="end_hour">
                                    Hour
                                  </span>
                                  <select
                                    required
                                    className="form-control"
                                    name="end_hour"
                                    onChange={(e) => {
                                      e.persist();
                                      setEndhour(e.target.value);
                                    }}
                                  >
                                    <option value="" disabled selected hidden>
                                      ...
                                    </option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                  </select>
                                  <span className="select-arrow"></span>
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div className="form-group">
                                  <span className="form-label" for="end_min">
                                    Min
                                  </span>
                                  <select
                                    required
                                    className="form-control"
                                    name="end_min"
                                    onChange={(e) => {
                                      e.persist();
                                      setEndmin(e.target.value);
                                    }}
                                  >
                                    <option value="" disabled selected hidden>
                                      ...
                                    </option>
                                    <option value="00">00</option>
                                    <option value="05">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                    <option value="50">50</option>
                                    <option value="55">55</option>
                                  </select>
                                  <span className="select-arrow"></span>
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div className="form-group">
                                  <span
                                    className="form-label"
                                    for="end_meridian"
                                  >
                                    AM/PM
                                  </span>
                                  <select
                                    required
                                    className="form-control"
                                    name="end_meridian"
                                    onChange={(e) => {
                                      e.persist();
                                      setEndmeridian(e.target.value);
                                    }}
                                  >
                                    <option value="" disabled selected hidden>
                                      ...
                                    </option>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                  </select>
                                  <span className="select-arrow"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                      </div>
                    )}
                    {binputFields && (
                      <div>
                        <span className="form-label">Team Details:</span>
                        <br />
                        {inputFields.map((inputField, index) => (
                          <Fragment key={`${inputField}~${index}`}>
                            <div className="form-group">
                              <div class="row">
                                <div class="col-sm-5">
                                  <input
                                    required
                                    className="form-control"
                                    type="text"
                                    id="Name"
                                    name="Name"
                                    value={inputField.firstName}
                                    onChange={(event) =>
                                      handleInputChange(index, event)
                                    }
                                    placeholder={`Name`}
                                  />
                                </div>
                                <div class="col-sm-5">
                                  <input
                                    required
                                    className="form-control"
                                    type="text"
                                    id="Roll"
                                    name="Roll"
                                    value={inputField.firstName}
                                    onChange={(event) =>
                                      handleInputChange(index, event)
                                    }
                                    placeholder={`Roll No`}
                                  />
                                </div>
                                <div class="col align-self-center">
                                  <button
                                    type="button"
                                    class="btn btn-danger"
                                    onClick={() => handleRemoveFields(index)}
                                  >
                                    X
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        ))}

                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={() => handleAddFields()}
                        >
                          Add
                        </button>
                        <br />
                      </div>
                    )}
                    <br />
                    <div className="form-btn">
                      <button
                        className="submit-btn"
                        type="submit"
                        onClick={() => submit()}
                      >
                        Generate Letter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Dform;
