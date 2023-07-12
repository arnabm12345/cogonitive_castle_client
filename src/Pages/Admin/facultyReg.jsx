import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import { Audio } from "react-loader-spinner";
import classnames from 'classnames'
const FacultyList = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
  const [facultyList, setFacultyList] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const fetchFacultyData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/getfacultyReg');
      setFacultyList(response.data.reverse());
      setIsLoading(false);

    } catch (error) {
      console.error('Error fetching faculty data:', error);
      setIsLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facultyList.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
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
    <div style={{ width: '97%', marginLeft: '1.5%' }}>
      <h2 style={{ textAlign: 'center',marginTop:'15px' }}>Faculty Register List</h2>
      {facultyList.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Loading faculty data...</p>
      ) : (
        <div style={{marginTop:'20px'}}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Last Name</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Paypal</th>
                <th style={tableHeaderStyle}>Highest Qualification</th>
                <th style={tableHeaderStyle}>Institute</th>
                <th style={tableHeaderStyle}>Subject</th>
                <th style={tableHeaderStyle}>Experience</th>
                <th style={tableHeaderStyle}>Company</th>
                <th style={tableHeaderStyle}>Country</th>
                <th style={tableHeaderStyle}>Salary</th>
                <th style={tableHeaderStyle}>DOB</th>
                <th style={tableHeaderStyle}>Gender</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((faculty) => (
                <tr key={faculty._id} style={tableRowStyle}>
                  <td style={tableCellStyle}>{faculty.name}</td>
                  <td style={tableCellStyle}>{faculty.lastName}</td>
                  <td style={tableCellStyle}>{faculty.email}</td>
                  <td style={tableCellStyle}>{faculty.paypal}</td>
                  <td style={tableCellStyle}>{faculty.highest_qualification}</td>
                  <td style={tableCellStyle}>{faculty.institute}</td>
                  <td style={tableCellStyle}>{faculty.subject}</td>
                  <td style={tableCellStyle}>{faculty.experience}</td>
                  <td style={tableCellStyle}>{faculty.company}</td>
                  <td style={tableCellStyle}>{faculty.country}</td>
                  <td style={tableCellStyle}>{faculty.salary}</td>
                  <td style={tableCellStyle}>{faculty.dob.substring(0, 10)}</td>
                  <td style={tableCellStyle}>{faculty.gender}</td>
                </tr>
              ))}
            </tbody>
            </table>
          <div style={{ textAlign: 'center', margin: '1rem 0' ,padding:'10px'}}>
            {currentPage > 1 && (
              <button onClick={handlePrevPage}>Previous</button>
            )}
            {indexOfLastItem < facultyList.length && (
              <button style={{marginLeft:'8px'}} onClick={handleNextPage}>Next</button>
            )}
          </div>
        </div>
      )}
    </div>
    </>
    ) : (
      history.push("/")
    )}
    </div>          
  );
};





// CSS Styles
const tableHeaderStyle = {
  background: '#f2f2f2',
  fontWeight: 'bold',
  padding: '8px',
  border: '1px solid #ddd',
};

const tableRowStyle = {
  backgroundColor: '#fff',
};

const tableCellStyle = {
  padding: '8px',
  border: '1px solid #ddd',
};

export default FacultyList;
