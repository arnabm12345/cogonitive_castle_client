import React, { useState } from 'react';
import FacultyHomeHelper from "../Components/FacultyHomeHelper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";

const Announcement = () => {
    const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch(); 
  const [subjects, setSubjects] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");


  const [notices, setNotices] = useState([]);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchSubjects();
    fetchUpload();
  }, []);


  const fetchUpload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/faculty/getAllUploadedNotice/${store.faculty.faculty.faculty.registrationNumber}`
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


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  }; 

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

  const handleDeleteNotice = async(id) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/faculty/deleteUploadNotice",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id }),
        }
      );
      if (response.ok) {
        // Upload deleted successfully
        alert("The file deleted successfully");
        setNotices((prevNotices) => prevNotices.filter((notice) => notice._id !== id));
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

  const handleUpload = () => {
    if ( subjects && inputValue && inputValue1) {
      setIsLoading(true);
      const formData = new FormData();
      const selectedSubject = document.getElementById("subject-dropdown").value;
      formData.append("subject", selectedSubject);
      formData.append("content", inputValue);
      formData.append('classt',inputValue1);
      formData.append(
        "registration_num",
        store.faculty.faculty.faculty.registrationNumber
      );

      fetch("http://localhost:5000/api/faculty/uploadNotice", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully");
            setInputValue1("");
            setInputValue("");
            alert(
              "Announcement Created Successfully.Please Reload the Site to see the changes"
            );
          } else {
            console.error("Content upload failed");
          }
        })
        .catch((error) => {
          console.error("Error occurred during Announcement:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log("No file selected");
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
            <h1>Create Announcement</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="title">Announcement:</label>
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                rows={3}
                cols={50}
                maxLength={70}
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
            <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="title">class:</label>
              <input
                value={inputValue1}
                onChange={handleInputChange1}
                maxLength={3}
                style={{ width: "30%"}}
              />
              </div>
            <div
              className="file-input-wrapper"
              style={{ display: "flex", flexDirection: "column", width: "20%" }}
            >
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
          <button
            style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
            onClick={() => handleDeleteNotice(notice._id)}
          >
            Delete
          </button>
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

export default Announcement;
