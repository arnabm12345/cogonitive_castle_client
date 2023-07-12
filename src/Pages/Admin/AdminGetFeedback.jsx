import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import { Audio } from "react-loader-spinner";
import classnames from 'classnames'

const AdminFeedback = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
  const [feedbacklist, setFeedback] = useState([]);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/getAllFeedback');
      const data = await response.json();

      if (response.ok) {
        setFeedback(data.reverse());
        setIsLoading(false);
      } else {
        console.log('Failed to fetch contact data');
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbacklist.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  };

  const feedbackItemStyle = {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '5px',
  };

  const feedbackItemHeaderStyle = {
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const messageStyle = {
    marginTop: '10px',
    fontSize: '14px',
  };

  return (
    <div>
    {store.admin.isAuthenticated ? (
        <>
          <AdminHomeHelper />
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
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center' }}>Student Feedback</h1>
      {currentItems.map((feedback, index) => (
        <div key={index} style={feedbackItemStyle}>
          <div style={feedbackItemHeaderStyle}>
            <span style={{ marginRight: '10px' }}>Name:</span>
            {feedback.student.name}
          </div>
          <div style={feedbackItemHeaderStyle}>
            <span style={{ marginRight: '10px' }}>ID:</span>
            {feedback.student.registrationNumber}
          </div>
          <div style={feedbackItemHeaderStyle}>
            <span style={{ marginRight: '10px' }}>Year:</span>
            {feedback.student.year}
          </div>
          <div style={messageStyle}>
            <span style={{ fontWeight: 'bold' }}>Message:</span>{' '}
            {feedback.message}
          </div>

        </div>
        
      ))}
                <div style={{ textAlign: 'center', margin: '1rem 0' ,padding:'10px'}}>
            {currentPage > 1 && (
              <button onClick={handlePrevPage}>Previous</button>
            )}
            {indexOfLastItem < feedbacklist.length && (
              <button style={{marginLeft:'8px'}} onClick={handleNextPage}>Next</button>
            )}
          </div>
    </div>
    </>
      ) : (
        history.push("/")
      )}
    </div>

  );
};

export default AdminFeedback;
