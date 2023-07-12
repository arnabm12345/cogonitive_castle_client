import React, { useState } from "react";
import FacultyHomeHelper from "../Components/FacultyHomeHelper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";

const UploadNotes = () => {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const filename = "1687102508807_Notice 726 dated 12-06-23.pdf";
  const [dummyData, setdummyData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  /*  const dummyData = [
        { title: 'Subject 1', subject: 'Physics', download: '1687102508807_Notice 726 dated 12-06-23.pdf' },
        { title: 'Subject 2', subject: 'Chemistry', download: 'Download Link 2' },
        { title: 'Subject 3', subject: 'Mathematics', download: 'Download Link 3' },
        // Add more data as needed
      ];*/

  useEffect(() => {
    fetchSubjects();
    fetchUpload();
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
    }
    finally{
        setIsLoading(false);
    }
  };

  const fetchUpload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/faculty/getAllUploadedNotes/${store.faculty.faculty.faculty.registrationNumber}`
      );
      const dummy = await response.json();
      const reversedDummy = dummy.reverse();
      setdummyData(reversedDummy);
      // console.log('subjects',subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
    finally{
        setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleView = (file) => {
    // Perform the download action here
    window.open(
      `http://localhost:5000/getNote/${encodeURIComponent(file)}`,
      "_blank"
    );
  };

  const handleUpload = () => {
    if (selectedFile && subjects && inputValue) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("screenshot", selectedFile);
      const selectedSubject = document.getElementById("subject-dropdown").value;
      formData.append("subject", selectedSubject);
      formData.append("title", inputValue);
      formData.append(
        "registration_num",
        store.faculty.faculty.faculty.registrationNumber
      );

      fetch("http://localhost:5000/upLoadNotes", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully");
            setSelectedFile(null);
            setInputValue("");
            alert(
              "File Uploaded Successfully.Please Reload the Site to see the changes"
            );
          } else {
            console.error("File upload failed");
          }
        })
        .catch((error) => {
          console.error("Error occurred during file upload:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log("No file selected");
    }
  };

  const handleDelete = async (id,file) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/faculty/deleteUpload",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id,file:file }),
        }
      );

      if (response.ok) {
        // Upload deleted successfully
        alert("The file deleted successfully");
        setdummyData((prevData) => prevData.filter((item) => item._id !== id));
        console.log("Upload deleted successfully");
      } else {
        // Error deleting the upload
        const error = await response.json();
        console.log("Error deleting the upload:", error);
      }
    } catch (error) {
      console.log("Error occurred while deleting the upload:", error);
    }
    finally{
        setIsLoading(false);
    }
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
          <div
            className="container"
            style={{
              opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? "none" : "auto",
            }}
          >
            <h1>File Upload</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="title">Title:</label>
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                rows={4}
                cols={50}
                style={{ width: "30%", height: "80px" }}
              />
             
            </div>
            <label htmlFor="subject-dropdown">Select a Subject:</label>
            <div className="subject-dropdown-wrapper">
              {subjects && subjects.length > 0 ? (
                <select
                  id="subject-dropdown"
                  style={{ width: "30%", height: "30px", borderRadius: "5px" }}
                >
                  {store.faculty.faculty.faculty.subjectsCanTeach.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                        {subject.subjectName} (Class: {subject.year})
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
            <div
              className="file-input-wrapper"
              style={{ display: "flex", flexDirection: "column", width: "20%" }}
            >
              <label htmlFor="file-input" style={{ marginTop: "10px" }}>
                Choose a File:
              </label>
              <input
                id="file-input"
                type="file"
                accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileSelect}
              />
            </div>
            <button
              onClick={handleUpload}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "15px",
                opacity: loading ? "0.5" : "1",
                pointerEvents: loading ? "none" : "auto",
              }}
            >
              Upload
            </button>
          </div>

          <div style={{ width: "100%" ,opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? "none" : "auto",marginBottom:'40px'}}>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid",
              }}
            >
              List of Your Uploaded Notes
            </h2>
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
                      width: "15%",
                      padding: "10px",
                      textAlign: "left",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    Subject
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
                        textAlign: "left",
                        backgroundColor: index % 2 === 0 ? "#EFE1DF" : "white",
                      }}
                    >
                      {data.subject.subjectName}
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
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(data._id,data.file)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
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

export default UploadNotes;
