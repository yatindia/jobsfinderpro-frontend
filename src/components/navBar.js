import React, { useEffect, useState } from 'react';
import {Navbar, Nav, Form,NavDropdown} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import Logo from './asserts/logo.svg'
import { tokenCheck } from './utils';

export default function NavBar (){

    const [islogged,setislogged] = useState(false)
    const [islogEmp,setislogEmp] = useState(false)
    const [isseeker,setisseeker] = useState(false)
    const history = useHistory();
    

    useEffect(()=>{
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if(!userDetails){
            setislogged(false)
        } 
        else{
            const tokenValid = tokenCheck(userDetails.Auth_token);
            if (tokenValid === true){
                if(userDetails.Role_Type === "employer"){
                    setislogEmp(true); 
                    setislogged(true)
                }
                else if(userDetails.Role_Type === "seeker"){
                    setisseeker(true);  
                    setislogged(true)
                }
            }else {
                localStorage.removeItem('userDetails')
                localStorage.removeItem('userInfo')
                history.push('/')
                window.location.reload()
            }
        }
    },[])
      
    const handleLogout=()=> {
        localStorage.removeItem('userDetails')
        localStorage.removeItem('userInfo')
        history.push('/')
        window.location.reload()
    };

    const postJob=()=>{
        history.push({pathname:"/register", tab: 'employer' })
      }

        return(
            <>         
            <Navbar expand="lg" className="navbar shadow rounded-lg">
                <Form className="container-fluid">
                    <Navbar.Brand><a className="navbar-brand ml-4" href="/"><img src={Logo} alt='Yat Jobs'/></a>  </Navbar.Brand>
                <Navbar.Toggle  aria-controls = "navbar_toggle"/>
                <Navbar.Collapse id = "navbar_toggle"> 
                    <Nav className="ml-auto navbar-nav mr-5" activeKey={window.location.pathname}>
                        <Nav.Link exact='True' className="mr-1 " href="/" > Home</Nav.Link>

                        {islogged === false ?<> <Nav.Link   href="/login"  >Login</Nav.Link>
                        <Nav.Link exact='True' className="mr-1 " href="/register">/  Register</Nav.Link>
                        <Nav.Link  onClick={postJob}>Post Job</Nav.Link></> :""}
                        {isseeker === true ?  <>
                            <NavDropdown title="Profile" id="nav-dropdown" renderMenuOnMount={true}> 
                                <NavDropdown.Item href="/users/dashboard" id="nav-dropdown-item"><i className="fa fa-home"></i>  Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="/users/dashboard/myjobs" id="nav-dropdown-item"><i className="fa fa-briefcase"></i>  Applied Jobs</NavDropdown.Item>
                                <NavDropdown.Item href="/users/dashboard/profile" id="nav-dropdown-item"><i className="fa fa-cogs"></i>  Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout} id="nav-dropdown-item"><i className="fa fa-sign-out"></i>  Logout</NavDropdown.Item>
                            </NavDropdown> 
                            <Nav.Link exact='True' className="mr-1 " href={`/jobs?kwds=&loc`}>Search Job</Nav.Link>
                            </>:""}

                        {islogEmp === true ? <>
                        <NavDropdown title="Profile" id="nav-dropdown" renderMenuOnMount={true}> 
                            <NavDropdown.Item href="/employers/dashboard" id="nav-dropdown-item"><i className="fa fa-home"></i>  Dashboard</NavDropdown.Item>
                            <NavDropdown.Item href="/employers/dashboard/search" id="nav-dropdown-item"><i className="fa fa-search"></i> Resume Search</NavDropdown.Item>
                            <NavDropdown.Item href="/employers/dashboard/newjobs" id="nav-dropdown-item"><i className="fa fa-check"></i>  Post Job</NavDropdown.Item>
                            <NavDropdown.Item href="/employers/dashboard/jobs" id="nav-dropdown-item"><i className="fa fa-briefcase"></i> Posted Jobs</NavDropdown.Item>
                            <NavDropdown.Item href="/employers/dashboard/payment" id="nav-dropdown-item"><i className="fa fa-shopping-cart"></i> Payments</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout} id="nav-dropdown-item"><i className="fa fa-sign-out"></i>  Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link exact='True' className="mr-1 " onClick={postJob}>Post Job</Nav.Link>
                        </>:""}

                    </Nav>
                </Navbar.Collapse>
                </Form>
            </Navbar>
            </>
        );
}

  