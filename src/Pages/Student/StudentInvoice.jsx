import React, { useState } from "react";
import HomeHelper from "../../Components/HomeHelper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";
import classnames from 'classnames'

const StudentPaymentTable = ({ }) => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    const [payments,setpayment]=useState([]);
    useEffect(() => {
        fetchUpload();
      }, []);

      const fetchUpload = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://localhost:5000/api/student/getPayment/${store.student.student.student._id}`
          );
          const dummy = await response.json();
         const reversedDummy =await dummy.reverse();
          setpayment(reversedDummy);
          // console.log('subjects',subjects);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
        finally{
            setIsLoading(false);
        }
      };
      const handleView = ( id, amount,name) => {
        // Perform any necessary operations with the file, id, and amount data
      
        // Redirect to the "/invoice" path with the necessary parameters
        window.open(`/invoice/${id}/${amount}/${name}`, "_blank");
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
    <table style={{ borderCollapse: 'collapse', width: '80%',marginLeft:'10%',marginTop:'4%',marginBottom:'5%' }}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>Sl No</th>
          <th style={tableHeaderStyle}>Name</th>
          <th style={tableHeaderStyle}>Student ID</th>
          <th style={tableHeaderStyle}>Amount</th>
          <th style={tableHeaderStyle}>Order ID</th>
          <th style={tableHeaderStyle}>Date</th>
          <th style={tableHeaderStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment, index) => (
          <tr key={index}>
            <td style={tableCellStyle}>{index + 1}</td>
            <td style={tableCellStyle}>{payment.name}</td>
            <td style={tableCellStyle}>{payment.registrationNumber}</td>
            <td style={tableCellStyle}>${payment.amount}</td>
            <td style={tableCellStyle}>{payment.orderId}</td>
            <td style={tableCellStyle}>{payment.date}</td>
            <td style={tableCellStyle}>
  <button
    onClick={() => handleView(payment.orderId,payment.amount,payment.name)}
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
</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

const tableHeaderStyle = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
};

const tableCellStyle = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'left',
};

export default StudentPaymentTable;
