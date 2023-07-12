import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import HomeHelper from "../../Components/HomeHelper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";
import classnames from 'classnames'



const FeedbackForm = () => {
  const [message, setMessage] = useState('');
  const store = useSelector((store) => store)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Perform actions with the message data (e.g., submit to server, display success message, etc.)
    if (message) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("student",store.student.student.student._id);
        formData.append("message", message);
       
  
        fetch("http://localhost:5000/api/student/feedbackCreate", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              console.log("Feedback uploaded successfully");
              setMessage("");
              alert(
                "Success!Feedback Uploaded Successfully"
              );
            } else {
              console.error("Feedback upload failed");
            }
          })
          .catch((error) => {
            alert("Error occurred during Feedback upload:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } 
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  return (
    <div>
        {store.student.isAuthenticated ? (
        <>
                  <HomeHelper />
          {isLoading && (
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formMessage">
        <Form.Label style={{marginLeft:'20%',marginTop:'5%'}}>Message</Form.Label>
        <Form.Control
          as="textarea"
          name="message"
          rows={3}
          placeholder="Enter your message"
          value={message}
          onChange={handleChange}
          style={{width:'70%',marginLeft:'20%'}}
        />
      </Form.Group>

      <Button variant="primary" type="submit" style={{marginTop:'1%',marginLeft:'20%'}}>
        Submit
      </Button>
    </Form>
    </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default FeedbackForm;
