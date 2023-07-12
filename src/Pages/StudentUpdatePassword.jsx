import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import HomeHelper from '../Components/HomeHelper'
import { studentUpdatePassword } from '../redux/action/studentAction'
import Payment from './Payment'



const StudentUpdatePassword = () => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [error, setError] = useState({})
   const [isLoading,setIsLoading]=useState(false);
    useEffect(() => {
        if (store.errorHelper) {
            setError(store.errorHelper)
            console.log(store.errorHelper)
        }
    }, [store.errorHelper])
    const formHandler = async(e) => {
        e.preventDefault()
        setIsLoading(true);
       await dispatch(studentUpdatePassword({ registrationNumber: store.student.student.student.registrationNumber, oldPassword, newPassword, confirmNewPassword }))
       setIsLoading(false);
    }
    var today = new Date();  // Get the current date
    const student = store.student && store.student.student && store.student.student.student;

    if (!student || !student.date) {
      var daysDiff = -10;
    } else {
      var date = new Date(student.date);
      var timeDiff = date.getTime() - today.getTime();
      var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 30;
    }
    if(daysDiff<=0){
      daysDiff=0;
      return(
          <div>
              {store.student.isAuthenticated ? <>
              <Payment />
              </>: (history.push('/'))}
          </div>
      );
    }
    return (
        <div>
            {store.student.isAuthenticated ? <>
                <HomeHelper />
                <div className="container m-5">
                    <div className="row m-5">
                        <div className="col-md-5 m-auto">
                            <form noValidate onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="emailId">Old Password</label>
                                    <input onChange={(e) => setOldPassword(e.target.value)} type="password" value={oldPassword} className={classnames("form-control",
                                        {
                                            'is-invalid': error.oldPassword

                                        })} id="emailId" />
                                    {error.oldPassword && (<div className="invalid-feedback">{error.oldPassword}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordId">New Password</label>
                                    <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className={classnames("form-control", {
                                        "is-invalid": error.newPassword
                                    })} 
                                    type="password" id="passwordId" />
                                    {error.newPassword && (<div className="invalid-feedback">{error.newPassword}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordCId">Confirm New Password</label>
                                    <input onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} className={classnames("form-control", {
                                        "is-invalid": error.confirmNewPassword
                                    })}  type="password" id="passwordCId" />
                                    {error.confirmNewPassword && (<div className="invalid-feedback">{error.confirmNewPassword}</div>)}
                                </div>
                                <div class="row justify-content-center">
                <div class="col-md-1">
                  {isLoading && (
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </div>
              </div>
              {!isLoading && (
                <button type="submit" className="btn btn-info btn-block  ">
                  Update Password
                </button>
              )}
                               
                            </form>
                        </div>
                    </div>
                </div>
                
                </> : (history.push('/'))}

           

        </div>
    )
}

export default StudentUpdatePassword
