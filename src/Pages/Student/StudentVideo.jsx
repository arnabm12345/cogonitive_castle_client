import React, { useState } from "react";
import HomeHelper from "../../Components/HomeHelper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";
import classnames from "classnames";
import { getAllSubjects } from "../../redux/action/studentAction";

const GetVideos = () => {
    const store = useSelector((store) => store);
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const [subject, setSubject] = useState();
    const [inputValue, setInputValue] = useState("");
    const [inputValue1, setInputValue1] = useState("");
    const filename = "1687102508807_Notice 726 dated 12-06-23.pdf";
    const [dummyData, setdummyData] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState([]);
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
        `http://localhost:5000/api/student/getAllUploadedVideos/${subject}`
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
 

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
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

            
<div className="row mt-1 " style={{marginLeft:'27vw'}}>
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

          <div style={{ width: "100%" ,opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? "none" : "auto",marginBottom:'40px',marginTop:'25px'}}>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid",
              }}
            >
              List of Your  Videos
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
        overflowY: 'auto',
        borderRadius:'25px'

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
              marginTop:'0.5rem',
              marginBottom:'25px'
            }}
            controlsList="nodownload"

          ></video>
        )}
<div  style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}}>
    <div>
        {selectedVideo && (
           <div style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
          <h3
            className="title"
            style={{
              marginTop: '0.5rem',
            }}
          >
            {selectedVideo.title}
          </h3>


          </div> 
        )}
        </div>
        <div>
        {selectedVideo && (
             <p style={{font:'small-caption',marginBottom:'15px'}}>{selectedVideo.description}</p>
        )}
        </div>
        </div>
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

export default GetVideos;
