import React, { useState } from "react";
import HomeHelper from "../../Components/HomeHelper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";
import classnames from "classnames";
import { getAllSubjects } from "../../redux/action/studentAction";

const StudentAnnouncement = () => {
    const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch(); 
  const [subject, setSubject] = useState("");
  const [notices, setNotices] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    formHandler1();
    },[])
 
    const formHandler1 = async(e) => {
      setIsLoading(true);
     await dispatch(getAllSubjects())
       setIsLoading(false);
  }
  const formHandler = async(e) => {
    e.preventDefault()
    setIsLoading(true)
   await fetchUpload();
    setIsLoading(false);

}
  const fetchUpload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/student/getAllUploadedNotice/${subject}`
      );
      const dummy = await response.json();
      const reversedDummy = dummy.reverse();
      setNotices(reversedDummy);
      // console.log('subjects',subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
    finally{
        setIsLoading(false);
    }
  };



  return (

    <div>
      {store.student.isAuthenticated ? (
        <>
          <HomeHelper />

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

         <div
            className="container"
            style={{
              opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? "none" : "auto",
            }}
          >
                 <div className="row mt-1 " style={{marginLeft:'30vw'}}>
            <div className="col-md-4">
            <form form-inline noValidate onSubmit={formHandler}>
                  <div className="form-group">
                    <label htmlFor="subjectId">Subject</label>

                   
                      <select
                        onChange={(e) => setSubject(e.target.value)}
                        className={classnames("form-control", {
                          "is-invalid": error.setSubject,
                        })}
                        id="subjectId"
                      >
                        <option>Select</option>
                        {store.student.allSubjects.map((subject) => (
                          <option key={subject._id} value={subject._id}>
                            {subject.subjectName}
                          </option>
                        ))}
                      </select>
                   

                    {error.setSubject && (
                      <div className="invalid-feedback">
                        {error.setSubject}
                      </div>
                    )}
                  </div>

                  <div class="row justify-content-center">
                    <div class="col-md-1">
                      {loading && (
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {!loading && (
                    <button type="submit" className="btn btn-info btn-block  ">
                      Search
                    </button>
                  )}
                </form>
           </div>
           </div>   
        </div>

    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',height:'70vh' }}>
    <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Notice Board</h2>
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {notices.map((notice,index) => (
        <div key={notice.id} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ flex: '0 0 60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{index+1}.</p>
          </div>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <p style={{ fontSize: '16px', marginBottom: '5px' }}>{notice.date}</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{notice.content}</p>
          </div>
         
        </div>
      ))}
    </div>
  </div>
  
  </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default StudentAnnouncement;
