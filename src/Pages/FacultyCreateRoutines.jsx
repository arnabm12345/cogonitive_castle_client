import React, { useState } from "react";
import FacultyHomeHelper from "../Components/FacultyHomeHelper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";
import classnames from 'classnames'

const CreateRoutines = () => {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [years, setYears] = useState(new Set());

  const [buttonStyles, setButtonStyles] = useState({
    addButtonStyle: { display: "none" },
    editButtonStyle: { display: "none" },
  });

  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    fetchYears();
  }, []);
 

  const fetchYears =async () =>{
    setLoading(true);
    store.faculty.faculty.faculty.subjectsCanTeach.forEach((subject) => {
      setYears(prevYears => new Set(prevYears).add(subject.year));
    });

    setLoading(false);
  }
  const formHandler = async(e) => {
    e.preventDefault()
    setIsLoading(true)
   await fetchRoutines();
    setIsLoading(false);

}
const uniqueYears = Array.from(years).sort((a, b) => a - b);


  const fetchRoutines = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/faculty/getAllTimetable/${year}`
      );
      const dummy = await response.json();
      setTimetableData(dummy);
      // console.log('subjects',subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEditClick = (day, period, _id) => {
    const data = timetableData.find((item) => item.day === day);
    const periodData = data[period];
    setEditData({ day, period, _id, ...periodData });
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    // Handle form submission and update the timetableData state
    // ...
    event.preventDefault();
    setLoading(true);
    const { day, period, _id } = editData;
    const newData = {
      time: formData.time ? formData.time : editData.time,
      zoomLink: formData.zoomLink ? formData.zoomLink : editData.zoomLink,
      subject: formData.subject ? formData.subject : editData.subject,
    };
    const formData1 = new FormData();
    formData1.append("time", newData.time);
    formData1.append("zoomLink", newData.zoomLink);
    formData1.append("subject", newData.subject);
    formData1.append("period", period);
    formData1.append("_id", _id);

    const updatedTimetableData = timetableData.map((data) => {
      if (data.day === day) {
        return {
          ...data,
          [period]: { ...newData },
        };
      }
      return data;
    });

    await fetch("http://localhost:5000/api/faculty/updateTimetabel", {
      method: "POST",
      body: formData1,
    })
      .then((response) => {
        if (response.ok) {
          console.log("File uploaded successfully");
          setTimetableData(updatedTimetableData);
          alert("File Updated Successfully.");
        } else {
          console.error("File updating failed");
          alert("File updating failed");
        }
      })
      .catch((error) => {
        console.error("Error occurred during file update:", error);
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });

    setShowForm(false);
  };

  const handleMouseEnter = (day, period) => {
    const data = timetableData.find((item) => item.day === day);
    const periodData = data[period];

    if (!periodData.time) {
      setButtonStyles({
        addButtonStyle: { display: "block" },
        editButtonStyle: { display: "none" },
      });
    } else {
      setButtonStyles({
        addButtonStyle: { display: "none" },
        editButtonStyle: { display: "block" },
      });
    }
  };

  const handleMouseLeave = () => {
    setButtonStyles({
      addButtonStyle: { display: "none" },
      editButtonStyle: { display: "none" },
    });
  };

  const [formData, setFormData] = useState({
    time: "",
    zoomLink: "",
    subject: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      {store.faculty.isAuthenticated ? (
        <>
          <FacultyHomeHelper />
          {loading && (
            <div
              className="spinner-container"
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Audio
                ariaLabel="loading"
                radius="9"
                color="green"
                height={80}
                width={80}
              />
            </div>
          )}

          <div className="col-md-4" style={{marginLeft:'34vw'}}>
            <form noValidate onSubmit={formHandler}>
              <div className="form-group">
                <label htmlFor="yearId">Year</label>

                <select
                  onChange={(e) => setYear(e.target.value)}
                  className={classnames("form-control", {
                    "is-invalid": error.year,
                  })}
                  id="yearId"
                >
                  <option>Select</option>
                  {uniqueYears.map((year) => (
    <option key={year} value={year}>{year}</option>
  ))}

                </select>
                {error.year && (
                  <div className="invalid-feedback">{error.year}</div>
                )}
              </div>
              <div class="row justify-content-center">
                <div class="col-md-1">
                  {isLoading && (
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </div>
              </div>
              {!isLoading && (
                <button type="submit" className="btn btn-info btn-block  ">
                  Search
                </button>
              )}
            </form>
          </div>

          <div
            style={{
              opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? "none" : "auto",
            }}
          >
            <table
              style={{
                width: "90%",
                borderCollapse: "collapse",
                marginLeft: "5vw",
                marginTop: "20px",
                marginBottom: "40px",
              }}
            >
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Day</th>
                  <th style={tableHeaderStyle}>Morning</th>
                  <th style={tableHeaderStyle}>Afternoon</th>
                  <th style={tableHeaderStyle}>Evening</th>
                </tr>
              </thead>
              <tbody>
                {timetableData.map((data, index) => (
                  <tr key={index}>
                    <td style={tableCellStyle}>{data.day}</td>
                    <td
                      style={tableCellStyle}
                      onMouseEnter={() => handleMouseEnter(data.day, "morning")}
                      onMouseLeave={handleMouseLeave}
                    >
                      {showForm &&
                      editData?.day === data.day &&
                      editData?.period === "morning" ? (
                        <div
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: loading ? 0.6 : 1,
                            pointerEvents: loading ? "none" : "auto",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#fff",
                              padding: "20px",
                              margin: "auto",
                              marginTop: "100px",
                              width: "50%",
                              borderRadius: "5px",
                            }}
                          >
                            <form onSubmit={handleFormSubmit}>
                              <div>
                                <label htmlFor="time">Time:</label>
                                <input
                                  type="text"
                                  id="time"
                                  name="time"
                                  defaultValue={editData?.time}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="zoomLink">Zoom Link:</label>
                                <input
                                  type="text"
                                  id="zoomLink"
                                  name="zoomLink"
                                  defaultValue={editData?.zoomLink}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="subject">Subject:</label>
                                <input
                                  type="text"
                                  id="subject"
                                  name="subject"
                                  defaultValue={editData?.subject}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <button type="submit">Submit</button>
                                <button
                                  type="button"
                                  onClick={() => setShowForm(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p>{data.morning.time}</p>
                          <a
                            href={data.morning.zoomLink}
                            target="_blank"
                            rel="noreferrer"
                            style={zoomLinkStyle}
                          >
                            Join Zoom
                          </a>
                          <p>{data.morning.subject}</p>
                          <button
                            onClick={() =>
                              handleAddEditClick(data.day, "morning", data._id)
                            }
                            style={buttonStyles.addButtonStyle}
                          >
                            Add
                          </button>
                          <button
                            onClick={() =>
                              handleAddEditClick(data.day, "morning", data._id)
                            }
                            style={buttonStyles.editButtonStyle}
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </td>
                    <td
                      style={tableCellStyle}
                      onMouseEnter={() =>
                        handleMouseEnter(data.day, "afternoon")
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      {showForm &&
                      editData?.day === data.day &&
                      editData?.period === "afternoon" ? (
                        <div
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: loading ? 0.6 : 1,
                            pointerEvents: loading ? "none" : "auto",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#fff",
                              padding: "20px",
                              margin: "auto",
                              marginTop: "100px",
                              width: "50%",
                              borderRadius: "5px",
                            }}
                          >
                            <form onSubmit={handleFormSubmit}>
                              <div>
                                <label htmlFor="time">Time:</label>
                                <input
                                  type="text"
                                  id="time"
                                  name="time"
                                  defaultValue={editData?.time}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="zoomLink">Zoom Link:</label>
                                <input
                                  type="text"
                                  id="zoomLink"
                                  name="zoomLink"
                                  defaultValue={editData?.zoomLink}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="subject">Subject:</label>
                                <input
                                  type="text"
                                  id="subject"
                                  name="subject"
                                  defaultValue={editData?.subject}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <button type="submit">Submit</button>
                                <button
                                  type="button"
                                  onClick={() => setShowForm(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p>{data.afternoon.time}</p>
                          <a
                            href={data.afternoon.zoomLink}
                            target="_blank"
                            rel="noreferrer"
                            style={zoomLinkStyle}
                          >
                            Join Zoom
                          </a>
                          <p>{data.afternoon.subject}</p>
                          <button
                            onClick={() =>
                              handleAddEditClick(
                                data.day,
                                "afternoon",
                                data._id
                              )
                            }
                            style={buttonStyles.addButtonStyle}
                          >
                            Add
                          </button>
                          <button
                            onClick={() =>
                              handleAddEditClick(
                                data.day,
                                "afternoon",
                                data._id
                              )
                            }
                            style={buttonStyles.editButtonStyle}
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </td>
                    <td
                      style={tableCellStyle}
                      onMouseEnter={() => handleMouseEnter(data.day, "evening")}
                      onMouseLeave={handleMouseLeave}
                    >
                      {showForm &&
                      editData?.day === data.day &&
                      editData?.period === "evening" ? (
                        <div
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: loading ? 0.6 : 1,
                            pointerEvents: loading ? "none" : "auto",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#fff",
                              padding: "20px",
                              margin: "auto",
                              marginTop: "100px",
                              width: "50%",
                              borderRadius: "5px",
                            }}
                          >
                            <form onSubmit={handleFormSubmit}>
                              <div>
                                <label htmlFor="time">Time:</label>
                                <input
                                  type="text"
                                  id="time"
                                  name="time"
                                  defaultValue={editData?.time}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="zoomLink">Zoom Link:</label>
                                <input
                                  type="text"
                                  id="zoomLink"
                                  name="zoomLink"
                                  defaultValue={editData?.zoomLink}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="subject">Subject:</label>
                                <input
                                  type="text"
                                  id="subject"
                                  name="subject"
                                  defaultValue={editData?.subject}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <button type="submit">Submit</button>
                                <button
                                  type="button"
                                  onClick={() => setShowForm(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p>{data.evening.time}</p>
                          <a
                            href={data.evening.zoomLink}
                            target="_blank"
                            rel="noreferrer"
                            style={zoomLinkStyle}
                          >
                            Join Zoom
                          </a>
                          <p>{data.evening.subject}</p>
                          <button
                            onClick={() =>
                              handleAddEditClick(data.day, "evening", data._id)
                            }
                            style={buttonStyles.addButtonStyle}
                          >
                            Add
                          </button>
                          <button
                            onClick={() =>
                              handleAddEditClick(data.day, "evening", data._id)
                            }
                            style={buttonStyles.editButtonStyle}
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default CreateRoutines;
const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  padding: "10px",
  textAlign: "center",
};

const tableCellStyle = {
  padding: "10px",
  textAlign: "center",
  border: "1px solid #ccc",
};

const zoomLinkStyle = {
  display: "block",
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "5px",
  textDecoration: "none",
};

const addButtonStyle = {
  display: "none",
  margin: "5px",
};

const editButtonStyle = {
  display: "none",
  margin: "5px",
};
