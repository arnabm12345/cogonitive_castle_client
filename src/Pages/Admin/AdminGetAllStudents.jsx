import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { adminGetAllStudent } from '../../redux/action/adminAction'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import classnames from 'classnames'
import { Audio } from "react-loader-spinner";


const AdminGetAllStudent = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loading,setLoading]=useState(false);

    
    const [allStudent, setAllStudent] = useState(store.admin.allStudent);

    const [error, setError] = useState({})
    const history = useHistory()


    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminGetAllStudent({  year }))
    }
    useEffect(()=>{
        setAllStudent(store.admin.allStudent);
      },[store])
     

    useEffect(() => {
        if (store.admin.allStudent.length !== 0) {
            setIsLoading(false)
        }

    }, [store.admin.allStudent.length])

    const handleBlockClick = async(id) => {
        // Find the faculty with the given id in the state
        const updatedStudent = allStudent.find((student) => student._id === id);
      
        if (updatedStudent) {
          // Update the block status of the faculty
          try {
            setLoading(true);
       const response= await  fetch(`http://localhost:5000/api/admin/blockStudent/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if (response.ok) {   
            updatedStudent.block = 1; // Update to unblock (assuming 1 represents unblocked status)
      
          // Update the state with the modified faculty object
          setAllStudent((prevAllStudent) => [...prevAllStudent]);
          setLoading(false);

          }
          else{
            alert('Error in block the user')
            setLoading(false);

          }
        }
        catch (error) {
          alert('Error blocking faculty:', error);
          setLoading(false);

        }
        }
      };
    
      const handleUnblockClick = async(id) => {
        // Find the faculty with the given id in the state
    
    
        const updatedStudent = allStudent.find((student) => student._id === id);
      
        if (updatedStudent) {
          // Update the block status of the faculty
          try {
        setLoading(true);
       const response= await  fetch(`http://localhost:5000/api/admin/unblockStudent/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if (response.ok) {   
            updatedStudent.block = 0; // Update to unblock (assuming 1 represents unblocked status)
      
          // Update the state with the modified faculty object
          setAllStudent((prevAllStudent) => [...prevAllStudent]);
          setLoading(false);
          }
          else{
            alert('Error in unblock the user')
            setLoading(false);
          }
        }
        catch (error) {
          alert('Error in unblocking faculty:', error);
          setLoading(false);
        }
        }
      };

    return (
        <div>
            {store.admin.isAuthenticated ? <>
                <AdminHomeHelper />
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
                <div className="container"  style={{
              opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? "none" : "auto",
            }}>
                    <div className="row mt-5">
                        <div className="col-md-4">
                            <form noValidate onSubmit={formHandler}>
                               
                                <div className="form-group">
                                    <label htmlFor="yearId">Year</label>
                                    <select onChange={(e) => setYear(e.target.value)} className={classnames("form-control",
                                        {
                                            'is-invalid': error.year
                                        })} id="yearId">
                                        <option>Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    {error.year && (<div className="invalid-feedback">{error.year}</div>)}
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {!isLoading && <button type="submit" className="btn btn-info btn-block  ">Search</button>}
                              
                               
                            </form>


                        </div>
                        <div className="col-md-8">

                            {store.admin.allStudent.length !== 0 && <table className="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Password</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allStudent.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.registrationNumber}</td>
                                                <td>{res.name}</td>
                                                <td>{res.email}</td>
                                                <td>{res.password}</td>
                                                <td>
                            {res.block === 0 ? (
                              <button
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                }}
                                onClick={() => handleBlockClick(res._id)}
                              >
                                Block
                              </button>
                            ) : (
                              <button
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                }}
                               onClick={() => handleUnblockClick(res._id)}
                              >
                                Unblock
                              </button>
                            )}
                          </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>}

                        </div>
                    </div>
                </div>
            </> : (history.push('/'))}
        </div>
    )
}

export default AdminGetAllStudent
