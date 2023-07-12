import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import { Audio } from "react-loader-spinner";
import classnames from 'classnames'
const Contact = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/getContact');
      const data = await response.json();

      if (response.ok) {
        setContacts(data);
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
    
    <div style={{ padding: '20px', backgroundColor: '#f7f7f7',justifyContent:'center',
    marginTop:'50px',width:'98%',marginLeft:'1%',borderRadius:'25px'}}>

      <h2 style={{ fontSize: '24px', marginBottom: '20px',alignContent:'center',justifyContent:'center',marginLeft:'35%' }}>Contact Form Submissions Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
          <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Sl. No</th>
            <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Phone</th>
            <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact,index) => (
            <tr key={contact._id} style={{ marginTop: index > 0 ? '50px' : '0' }}>
            <td style={{ padding: '10px', textAlign: 'left', }}>{index+1}</td>
 
              <td style={{ padding: '10px', textAlign: 'left' }}>{contact.name}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{contact.email}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{contact.phone}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{contact.message}</td>
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

export default Contact;
