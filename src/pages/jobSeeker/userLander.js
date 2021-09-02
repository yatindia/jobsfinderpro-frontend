import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";


import UserProfile from "./component/profile";
import UserContent from "./component/userContent";
import MyJobs from "./component/myJobs";


class UserLander extends Component {

	constructor(){
		super();
		this.handleLogout = this.handleLogout.bind(this);
	}
	
	componentDidMount() {
		const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));
        if(!userDetils){
			this.props.history.push('/')
        } else if(userDetils.Role_Type === "seeker") {
			return null 
        }
    }
	
handleLogout(){
	localStorage.removeItem('userDetails')
	this.props.history.push('/')
	window.location.reload()
}


  render() {
    return (<>
    <section className="py-5 my-5">
		<div className="container-fluid">
			<div className="bg-white shadow rounded-lg d-block d-sm-flex">
				<div id="sidebar">
					<div className="profile-tab-nav border-right ">
						<div className="p-4">
							<div className="img-circle text-center mb-3">
								<img src="img/user2.jpg" alt="usermomo" className="shadow"/>
							</div>
							<h4 className="text-center">Kiran Acharya</h4>
						</div>
						<div className="nav flex-column nav-pills mb-4"   aria-orientation="vertical">
							<a className="nav-link " href="/users/dashboard" >
								<i className="fa fa-home text-center mr-1"></i> 
								Home
							</a>
							<a className="nav-link" href="/users/dashboard/profile" >
								<i className="fa fa-key text-center mr-1"></i> 
								Update Profile
							</a>
							<a className="nav-link"  href="/users/dashboard/myjobs" >
								<i className="fa fa-user text-center mr-1"></i> 
								My Jobs
							</a>
							<a className="nav-link"  onClick={this.handleLogout} href="/" >
								<i className="fa fa-sign-out text-center mr-1"></i> 
								Logout
							</a>
						</div>
					</div>
				</div>
				<div className="tab-content p-4 p-md-5">
					<Switch>
						<Route exact path="/users/dashboard" component={UserContent}/>
						<Route exact path="/users/dashboard/profile" component={UserProfile}/>
						<Route exact path="/users/dashboard/myjobs" component={MyJobs}/>
					</Switch>
				</div>
			</div>
		</div>
	</section>
    </>);
  }
}

export default UserLander;
