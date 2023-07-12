import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminGetAllFaculty } from "../../redux/action/adminAction";
import AdminHomeHelper from "../../Components/AdminHomeHelper";
import classnames from "classnames";
import { Audio } from "react-loader-spinner";

const AdminGetAllFaculty = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [selectedsubject, setselectedsubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [allFaculty, setAllFaculty] = useState(store.admin.allFaculty);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);
  useEffect(()=>{
    setAllFaculty(store.admin.allFaculty);
  },[store])
 
  const item=0;

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

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminGetAllFaculty({ selectedsubject }));
  };

  useEffect(() => {
    if (store.admin.allFaculty.length !== 0) {
      setIsLoading(false);
    }
  }, [store.admin.allFaculty.length]);

  const handleBlockClick = async(id) => {
    // Find the faculty with the given id in the state
    const updatedFaculty = allFaculty.find((faculty) => faculty._id === id);
  
    if (updatedFaculty) {
      // Update the block status of the faculty
      try {
        setLoading(true);

   const response= await  fetch(`http://localhost:5000/api/admin/blockFaculty/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {   
      updatedFaculty.block = 1; // Update to unblock (assuming 1 represents unblocked status)
  
      // Update the state with the modified faculty object
      setAllFaculty((prevAllFaculty) => [...prevAllFaculty]);
      setLoading(false);

      }
      else{
        alert('Error in block the user')
        setLoading(false);

      }
    }
    catch (error) {
      alert('Error blocking faculty:', error);
      setLoading(false);

    }
    }
  };

  const handleUnblockClick = async(id) => {
    // Find the faculty with the given id in the state


    const updatedFaculty = allFaculty.find((faculty) => faculty._id === id);
  
    if (updatedFaculty) {
      // Update the block status of the faculty
      try {
    setLoading(true);
   const response= await  fetch(`http://localhost:5000/api/admin/unblockFaculty/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {   
      updatedFaculty.block = 0; // Update to unblock (assuming 1 represents unblocked status)
  
      // Update the state with the modified faculty object
      setAllFaculty((prevAllFaculty) => [...prevAllFaculty]);
      setLoading(false);
      }
      else{
        alert('Error in unblock the user')
        setLoading(false);
      }
    }
    catch (error) {
      alert('Error in unblocking faculty:', error);
      setLoading(false);
    }
    }
  };

  return (
    <div>
      {store.admin.isAuthenticated ? (
        <>
          <AdminHomeHelper />
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

          <div className="container"  style={{
              opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? "none" : "auto",
            }}>
            <div className="row mt-5">
              <div className="col-md-4">
                <form form-inline noValidate onSubmit={formHandler}>
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
                        <th scope="col">Password</th>
                        <th scope="col">Joining Year</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allFaculty.map((res, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{res.registrationNumber}</td>
                          <td>{res.name}</td>
                          <td>{res.email}</td>
                          <td>{res.password}</td>
                          <td>{res.joiningYear}</td>
                          <td>
                            {res.block === 0 ? (
                              <button
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                }}
                                onClick={() => handleBlockClick(res._id)}
                              >
                                Block
                              </button>
                            ) : (
                              <button
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                }}
                                onClick={() => handleUnblockClick(res._id)}
                              >
                                Unblock
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default AdminGetAllFaculty;
