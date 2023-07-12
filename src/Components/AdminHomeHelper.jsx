import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminLogout } from '../redux/action/adminAction'


const Home = () => {
    const store = useSelector(store => store)
    const [name, setName] = useState("")
    useEffect(() => {

        if (store.admin.admin.name) {
            setName(store.admin.admin.name)
        }
    }, [store.admin.admin.name])
    const history = useHistory()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(adminLogout())
        history.push('/')
    }
    return (
        <div className="container-fluid">
          
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h4 className="navbar-brand mt-1" href="" style={{fontSize:'15px'}}>COGNITIVE CASTLE</h4>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <button type="button" style={{fontSize:'15px'}} className="btn"><Link to="/admin"><li>{name.toUpperCase()}</li></Link></button>
                        </li>
                  {  /*    <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/addFaculty"><li>ADD FACULTY</li></Link></button>
                        </li>

                  */}


                        <li className="nav-item">
                            <button type="button" style={{fontSize:'15px'}} className="btn"><Link to="/admin/addAdmin"><li>ADD ADMIN</li></Link></button>
                        </li>

                        <li className="nav-item dropdown" style={{fontSize:'15px'}}>
                                    <a  className="nav-link dropdown-toggle"  href="#" id="navbarDropdown"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'DodgerBlue'}}>
                                        STUDENT </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/admin/addStudent">ADD STUDENT</Link>
                                        <Link className="dropdown-item" to="/admin/allStudents">Our Students</Link>
                                    </div>
                      </li>
                        
                      

                        <li className="nav-item dropdown" style={{fontSize:'15px'}}>
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'DodgerBlue'}}>
                                        FACULTY </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/admin/addFaculty">ADD FACULTY</Link>
                                        <Link className="dropdown-item" to="/admin/allFaculties">OUR FACULTIES</Link>
                                        <Link className="dropdown-item" to="/admin/AdminaddSubjectFaculty">Add Subject</Link>
                                    </div>
                      </li>

                      <li className="nav-item dropdown" style={{fontSize:'15px'}}>
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'DodgerBlue'}}>
                                        SUBJECT </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/admin/allSubject">All Subjects</Link>
                                        <Link className="dropdown-item" to="/admin/addSubject">Add Subject</Link>
                                    </div>
                      </li>
             
             
                      <li className="nav-item dropdown" style={{fontSize:'15px'}}>
                                    <a className="nav-link dropdown-toggle" href="#"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'DodgerBlue'}}>
                                        ACADEMICS </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button type="button" className="btn" style={{color:'brown'}}><Link to="/admin/AdminUploadNotes"><li>UPLOAD NOTES</li></Link></button>
                                    <button type="button" className="btn"><Link to="/admin/AdminUploadVideos"><li>Upload Videos</li></Link></button>  
                                    <button type="button" className="btn"><Link to="/admin/createroutines"><li>Create Routines</li></Link></button>     
                                    <a href='http://localhost:3002/' target="_blank" className="btn" style={{color:'DodgerBlue'}}><li>Answer Doubt</li></a>

                                    </div>
                      </li>
                    { /*

                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/allFaculties"><li>OUR FACULTIES</li></Link></button>
                        </li>

                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/allStudents"><li>OUR STUDENTS</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/allSubject"><li>SUBJECTS</li></Link></button>
                        </li>
     
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/AdminUploadNotes"><li>UPLOAD NOTES</li></Link></button>
                        </li>
                        <li className='nav-item'>
                       <button type="button" className="btn"><Link to="/admin/AdminUploadVideos"><li>Upload Videos</li></Link></button>     
                        </li>
                        
                        <li className="nav-item">
                                    <a href='http://localhost:3002/' target="_blank" className="btn" style={{color:'DodgerBlue'}}><li>Answer Doubt</li></a>
                        </li>

                   */}
                 <li className="nav-item" >
                            <button type="button" style={{fontSize:'15px'}} className="btn"><Link to="/admin/getpayment"><li>PAYMENT</li></Link></button>
                        </li>
                       
                        <li className="nav-item">
                            <button type="button" style={{fontSize:'15px'}} className="btn"><Link to="/admin/contact"><li>CONTACT US</li></Link></button>
                        </li>        
                    
                        <li className="nav-item">
                            <button type="button" style={{fontSize:'15px'}} className="btn"><Link to="/admin/getFaculty"><li>FACULTY REG</li></Link></button>
                        </li>        
                        <li className="nav-item">
                            <button type="button" style={{fontSize:'15px'}} className="btn"><Link to="/admin/feedback"><li>STUDENT FEEDBACK</li></Link></button>
                        </li> 

                    </ul>
                </div>
                <div>

                    <button style={{
        listStyle: 'none',
        backgroundColor: 'red',
        color: '#fff',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize:'12px',
        transition: 'background-color 0.3s',
        backgroundColor:'darkred'


      }} onClick={logoutHandler} type="button" className="btn"><li>LOGOUT</li></button>

                </div>
            </nav>
        </div>
    )
}

export default Home
