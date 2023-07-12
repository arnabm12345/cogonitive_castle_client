import React, { useState } from "react";
import HomeHelper from "../../Components/HomeHelper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";
import classnames from "classnames";
import { getAllSubjects } from "../../redux/action/studentAction";

const GetNotes = () => {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [inputValue, setInputValue] = useState("");
  const filename = "1687102508807_Notice 726 dated 12-06-23.pdf";
  const [dummyData, setdummyData] = useState([]);
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
        `http://localhost:5000/api/student/getAllUploadedNotes/${subject}`
      );
      const dummy = await response.json();
      const reversedDummy = dummy.reverse();
      setdummyData(reversedDummy);
      // console.log('subjects',subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = async(file) => {
    // Perform the download action here
   
   await fetch(`http://localhost:5000/getNote/${encodeURIComponent(file)}`)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = file;
					a.click();
				});
				//window.location.href = response.url;
		});
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
            style={{
              width: "100%",
              opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? "none" : "auto",
              marginBottom: "40px",
            }}
          >

            <div className="row mt-1 " style={{marginLeft:'35vw'}}>
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
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid",
                marginTop:'25px'
              }}
            >
              List of Notes
            </h2>

            {dummyData.length > 0 ? (
            <table
              style={{
                borderCollapse: "collapse",
                width: "80%",
                margin: "auto",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: "5%",
                      padding: "10px",
                      textAlign: "left",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    Sl.No
                  </th>
                  <th
                    style={{
                      width: "55%",
                      padding: "10px",
                      textAlign: "left",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    Title
                  </th>
                
                  <th
                    style={{
                      width: "25%",
                      padding: "10px",
                      textAlign: "left",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        width: "5%",
                        padding: "10px",
                        textAlign: "left",
                        backgroundColor: index % 2 === 0 ? "#EFE1DF" : "white",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        width: "65%",
                        padding: "10px",
                        textAlign: "left",
                        backgroundColor: index % 2 === 0 ? "#EFE1DF" : "white",
                      }}
                    >
                      {data.title}
                    </td>

                    <td
                      style={{
                        width: "15%",
                        padding: "10px",
                        backgroundColor: index % 2 === 0 ? "#EFE1DF" : "white",
                      }}
                    >
 
                      <button
                        onClick={() => handleView(data.file)}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            ): (
                <p
                style={{
                  textAlign: "center",
                  fontSize: "30px",
                  color: "#555",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                Ah No, there is no note!
              </p>           
         )}
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default GetNotes;
