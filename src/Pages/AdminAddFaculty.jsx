import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { adminAddFaculty } from "../redux/action/adminAction";
import AdminHomeHelper from "../Components/AdminHomeHelper";

const AdminAddFaculty = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedsubject, setselectedsubject] = useState("");
  const [designation, setDesignation] = useState("");
  const [facultyMobileNUmber, setFacultyMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (store.error) {
      setError(store.error);
    }
  }, [store.error]);
  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      adminAddFaculty({
        name,
        email,
        designation,
        facultyMobileNUmber,
        selectedsubject,
        aadharCard,
        gender,
        dob: dob.split("-").reverse().join("-"),
      })
    );
  };

  useEffect(() => {
    if (store.admin.adminAddFacultyFlag) {
      setError({});
    }
  }, [store.admin.adminAddFacultyFlag]);

  useEffect(() => {
    if (store.error || store.admin.adminAddFacultyFlag) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.admin.adminAddFacultyFlag]);
  return (
    <div>
      {store.admin.isAuthenticated ? (
        <>
          <AdminHomeHelper />
          <div className="container mt-5">
            <div className="row ">
              <div className="col">
                <form noValidate onSubmit={formHandler}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="nameId">Faculty Name</label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className={classnames("form-control", {
                            "is-invalid": error.name,
                          })}
                          id="nameId"
                        />
                        {error.name && (
                          <div className="invalid-feedback">{error.name}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="emailId">Email</label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className={classnames("form-control", {
                            "is-invalid": error.email,
                          })}
                          id="emailId"
                        />
                        {error.email && (
                          <div className="invalid-feedback">{error.email}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="designationId">Designation</label>
                        <select
                          onChange={(e) => setDesignation(e.target.value)}
                          className={classnames("form-control", {
                            "is-invalid": error.designation,
                          })}
                          id="designationId"
                        >
                          <option>Select</option>
                          <option value="Assistant Professor">
                            Assistant Professor
                          </option>
                          <option value="Senior Professer">
                            Senior Professer
                          </option>
                        </select>
                        {error.designation && (
                          <div className="invalid-feedback">
                            {error.designation}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="subjectId">Subject</label>

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
                              <option
                                key={subject._id}
                                value={subject._id}
                              >
                                {subject.subjectName}
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
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="dobId">DOB</label>
                        <input
                          onChange={(e) => setDob(e.target.value)}
                          type="date"
                          className={classnames("form-control", {
                            "is-invalid": error.dob,
                          })}
                          id="dobId"
                        />
                        {error.dob && (
                          <div className="invalid-feedback">{error.dob}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="genderId">Gender</label>
                        <select
                          onChange={(e) => setGender(e.target.value)}
                          className="form-control"
                          id="genderId"
                        >
                          <option>Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="numberId">Contact Number</label>
                        <input
                          onChange={(e) =>
                            setFacultyMobileNumber(e.target.value)
                          }
                          type="number"
                          className="form-control"
                          id="numberId"
                        />
                      </div>
                     
                    </div>
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
                    <button type="submit" className="btn btn-info">
                      Add Faculty
                    </button>
                  )}
                </form>
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

export default AdminAddFaculty;
