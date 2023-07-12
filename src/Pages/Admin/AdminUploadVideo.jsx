import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Home from "../../Components/AdminHomeHelper";
import { Audio } from "react-loader-spinner";

const AdminUploadVideos = () => {
    const store = useSelector((store) => store);
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [inputValue1, setInputValue1] = useState("");
    const filename = "1687102508807_Notice 726 dated 12-06-23.pdf";
    const [dummyData, setdummyData] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState([]);


    
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
        `http://localhost:5000/api/admin/getAllUploadedVideos`
      );
      const dummy = await response.json();
      const reversedDummy = dummy.reverse();
      setVideos(reversedDummy);
    //  console.log('dummy',dummyData)
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
  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleUpload = () => {
    if (selectedFile && subjects && inputValue) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("video", selectedFile);
      const selectedSubject = document.getElementById("subject-dropdown").value;
      formData.append("subject", selectedSubject);
      formData.append("title", inputValue);
      formData.append('description',inputValue1);
      formData.append(
        "registration_num",
        store.admin.admin.registrationNumber
      );

      fetch("http://localhost:5000/uploadVideos", {
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

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/faculty/deleteVideo",
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
        setVideos((prevData) => prevData.filter((item) => item._id !== id));
        console.log("Upload deleted successfully");
        setSelectedVideo(null);
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
      {store.admin.isAuthenticated ? (
        <>
          <Home />

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
               
                style={{ width: "30%" }}
              />

           <label htmlFor="title">Description:</label>
              <textarea
                value={inputValue1}
                onChange={handleInputChange1}
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
                  {subjects.map((subject) => (
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
                accept="video/mp4, video/mpeg, video/quicktime"
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
              List of Your Uploaded Videos
            </h2>
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '95vw',
        minHeight: '90vh',
        backgroundImage: 'linear-gradient(to bottom right, #0a0057, #3f00ee)',
        fontFamily: 'sans-serif',
        color: '#fff',
        alignContent:'center',
        marginLeft:'2.5vw',
        marginTop:'5vh',
        overflowY: 'auto'

      }}
    >
      <section
        className="main-video"
        style={{
          width: '100%',
          height: '30rem',
          marginLeft:'5vw',
          marginRight:'5vw',
          marginBottom:'5vh'
        }}
      >
        {selectedVideo && (
            <h3>Subject : {selectedVideo.subject.subjectName}</h3>
        )}
        {selectedVideo && (
          <video
            src={`http://localhost:5000/getVideo/${selectedVideo.file}`}
            controls
            autoPlay
            muted
            style={{
              width: '100%',
              borderRadius: '.5rem',
              marginTop:'0.5rem'
            }}
          ></video>
        )}

        {selectedVideo && (
           <div style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
          <h3
            className="title"
            style={{
              marginTop: '1rem',
            }}
          >
            {selectedVideo.title}
          </h3>

          <div style={{marginTop:'1rem'}}>
          <button
    style={{
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      cursor: 'pointer',
    }}
    onClick={() => handleDelete(selectedVideo._id)}
    >
    Delete
  </button>
          </div>
          </div> 
        )}

        {selectedVideo && (
             <p style={{font:'small-caption',}}>{selectedVideo.description}</p>
        )}
      </section>

      <section
        className="video-playlist"
        style={{
          width: '100%',
          height: '30rem',
        }}
      >
        <h3
          className="title"
          style={{
            paddingLeft: '1rem',
          }}
        >
          Video List
        </h3>
        <div
          className="playlist"
          style={{
            height: '70%',
            overflowY: 'auto',
          }}
        >
          {videos.map((video,index) => (
            <div
              key={video._id}
              className={`video ${selectedVideo === video ? 'active' : ''}`}
              onClick={() => handleVideoClick(video)}
              style={{
                position: 'relative',
                width: '100%',
                height: '4rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 1rem',
                marginTop: '.1rem',
                cursor: 'pointer',
                borderRadius: '.5rem',
                backgroundColor: selectedVideo === video ? '#0003' : 'transparent',
                color: selectedVideo === video ? 'gold' : '#fff',
                
              }}
            >
              <img
                  src={selectedVideo !== video ? 'https://www.svgrepo.com/show/13672/play-button.svg' : 'https://www.svgrepo.com/show/100677/pause-button.svg'}
                alt=""
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.5rem',
                  height: '1.5rem',
                  filter: 'invert(100%)',
                }}
              />
              <p
                style={{
                  marginLeft: '2.5rem',
                  marginTop:'12px'
                }}
              >
               {index+1}.  {video.title}
              </p>
              <p
                className="time"
                style={{
                  marginLeft: 'auto',
                }}
              >
                {video.duration}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>

          </div>

          </>
      ) : (
        history.push("/")
      )}
    </div>
  );


}

export default AdminUploadVideos;
