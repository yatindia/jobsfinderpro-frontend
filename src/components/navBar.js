import React, { Component } from 'react';
import {Navbar, Nav, Form,NavDropdown} from 'react-bootstrap'


export default class NavBar extends Component{
    constructor() {
        super();
        this.state={islogEmp: false,islogged: false};
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    componentDidMount() {
        const userDetails = JSON.parse(localStorage.getItem( 'userDetails'));
        if(!userDetails){
            return null
        } 
        else if(userDetails.Role_Type === "employer"){
            this.setState({islogEmp: true}); 
        }
        else if(userDetails.Role_Type === "seeker"){
            this.setState({islogged: true}); 
        }
    }
      
    async handleLogout() {
            localStorage.clear()
            window.location.reload();
    };

    render(){
        return(
            <>         
            <Navbar expand="lg" className="navbar shadow rounded-lg mt-3">
                <Form className="container-fluid">
                    <Navbar.Brand><a className="navbar-brand" href="/">LOGO</a>  </Navbar.Brand>
                <Navbar.Toggle  aria-controls = "navbar_toggle"/>
                <Navbar.Collapse id = "navbar_toggle"> 
                    <Nav className="ml-auto navbar-nav mr-5" activeKey={window.location.pathname}>
                        <Nav.Link exact='True' className="mr-1 " href="/" > Home</Nav.Link>

                        {this.state.islogged === false ? <Nav.Link   href="/login"  >Login</Nav.Link> :""}
                        {this.state.islogged === true ?  
                            <NavDropdown title="Profile" id="nav-dropdown" renderMenuOnMount={true}> 
                                <NavDropdown.Item href="/users/dashboard" id="nav-dropdown-item"><i className="fa fa-home"></i>  Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="/users/dashboard/profile" id="nav-dropdown-item"><i className="fa fa-key"></i>  Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/users/dashboard/myjobs" id="nav-dropdown-item"><i className="fa fa-briefcase"></i>  My Jobs</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.handleLogout} id="nav-dropdown-item"><i className="fa fa-sign-out"></i>  Logout</NavDropdown.Item>
                            </NavDropdown> :""}

                        <Nav.Link exact='True' className="mr-1 " href="/register">/  Register</Nav.Link>
                        
                        {this.state.islogEmp === false ? <Nav.Link  href="/login">Post Job</Nav.Link> :""}
                        {this.state.islogEmp === true ?  
                            <NavDropdown title="Profile" id="nav-dropdown" renderMenuOnMount={true}> 
                                <NavDropdown.Item href="/employers/dashboard" id="nav-dropdown-item"><i className="fa fa-home"></i>  Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="/employers/dashboard/newjobs" id="nav-dropdown-item"><i className="fa fa-check"></i>  Post Job</NavDropdown.Item>
                                <NavDropdown.Item href="/employers/dashboard/jobs" id="nav-dropdown-item"><i className="fa fa-briefcase"></i>  Posted</NavDropdown.Item>
                                <NavDropdown.Item href="/employers/dashboard/applied" id="nav-dropdown-item"><i className="fa fa-check-square"></i> Interest</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.handleLogout} id="nav-dropdown-item"><i className="fa fa-sign-out"></i>  Logout</NavDropdown.Item>
                            </NavDropdown> :""}
                    </Nav>
                </Navbar.Collapse>
                </Form>
            </Navbar>
            </>
        );
    }
}

  