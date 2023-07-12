import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminGetFaculty } from "../../redux/action/adminAction";
import AdminHomeHelper from "../../Components/AdminHomeHelper";
import classnames from "classnames";
import axios from "axios";
const AdminaddSubjectFaculty = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const history = useHistory();
  const [selectedsubject, setselectedsubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [registrationNumber, setregistrationNumber] = useState("");

  const url = "http://localhost:5000";

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/getSubjects"
      );
      const subjectsData = await response.json();
      setSubjects(subjectsData);
      console.log("subjects", subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminGetFaculty({ registrationNumber }));
  };
  const formHandler1 = async (e) => {
    e.preventDefault();
    setIsLoading1(true);
    try {
       await axios({
        method: "Post",
        url: url + "/api/admin/addSubjectToFaculty",
        data: {
          registrationNumber: registrationNumber,
          subject: selectedsubject,
        },
      })
        .then((response) => {
          if (response.status===200 || 304) {
            alert("Subject Uploaded Successfully.");
          } else {
            alert("Subject Uploading failed");
          }
        })
        .catch((error) => {
          console.error("Error occurred during Subject update:", error);
          alert(error);
        })
        .finally(() => {
          setIsLoading1(false);
        });
    } catch (err) {
      alert("There is an error while adding the subject");
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    if (store.admin.allFaculty.length !== 0) {
      setIsLoading(false);
    }
  }, [store.admin.allFaculty.length]);

  return (
    <div>
      {store.admin.isAuthenticated ? (
        <>
          <AdminHomeHelper />
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-4">
                <form form-inline noValidate onSubmit={formHandler}>
                  <div className="form-group">
                    <label htmlFor="registrationNumber">
                      Registration Number
                    </label>
                    <input
                      onChange={(e) => setregistrationNumber(e.target.value)}
                      type="string"
                      className={classnames("form-control", {
                        "is-invalid": error.string,
                      })}
                      id="registrationNumber"
                    />
                    {error.registrationNumber && (
                      <div className="invalid-feedback">
                        {error.registrationNumber}
                      </div>
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
              <div className="col-md-8">
                {store.admin.allFaculty.length !== 0 && (
                  <table className="table border">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Registration Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Joining Year</th>
                        <th scope="col">Subject Can teach</th>
                      </tr>
                    </thead>
                    <tbody>
                      {store.admin.allFaculty.map((res, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{res.registrationNumber}</td>
                          <td>{res.name}</td>
                          <td>{res.email}</td>
                          <td>{res.joiningYear}</td>

                          <td>
                            {""}
                            {res.subjectsCanTeach
                              .map(
                                (subject) =>
                                  `${subject.subjectName} (Class: ${subject.year})`
                              )
                              .join(", ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {store.admin.allFaculty.length !== 0 && (
                  <div className="col-md-4">
                    <form form-inline noValidate onSubmit={formHandler1}>
                      <div className="form-group">
                        <label htmlFor="subjectId">Add Subject</label>

                        {subjects && subjects.length > 0 ? (
                          <select
                            onChange={(e) => setselectedsubject(e.target.value)}
                            className={classnames("form-control", {
                              "is-invalid": error.selectedsubject,
                            })}
                            id="subjectId"
                          >
                            <option>Select</option>
                            {subjects.map((subject) => (
                              <option key={subject._id} value={subject._id}>
                                {subject.subjectName} (class: {subject.year})
                              </option>
                            ))}
                          </select>
                        ) : null}

                        {error.selectedsubject && (
                          <div className="invalid-feedback">
                            {error.selectedsubject}
                          </div>
                        )}
                      </div>

                      <div class="row justify-content-center">
                        <div class="col-md-1">
                          {isLoading1 && (
                            <div
                              class="spinner-border text-primary"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {!isLoading1 && (
                        <button
                          type="submit"
                          className="btn btn-info btn-block  "
                        >
                          Add Subject
                        </button>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default AdminaddSubjectFaculty;
