import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import EmpContent from "./component/empContent";
// import EmpProfile from "./component/profile";
import PostJobs from "./component/postJob";
import Jobs from "./component/jobs";
import Applied from "./component/applied";

class EmpLander extends Component {

	constructor(){
		super();
		this.handleLogout = this.handleLogout.bind(this);
	}
	
	componentDidMount() {
		const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));
        if(!userDetils){
			this.props.history.push('/')
        } else if(userDetils.Role_Type === "employer") {
			return null 
        }
    }

handleLogout(){
	localStorage.removeItem('userDetails')
	this.props.history.push('/')
}


  render() {
    return (<>
    <section className="py-5 my-5">
		<div className="container-fluid">
			<div className="bg-white shadow rounded-lg d-block d-sm-flex">
				<div id="sidebar">
					<div className="profile-tab-nav border-right ">
						<div className="p-4 ">
							<div className="img-circle mx-auto text-center mb-3">
								<img src={localStorage.getItem('Cmpny_Logo')} alt="usermomo" className="shadow d-block"/>
							</div>
							<h4 className="text-center">Accenture</h4>
						</div>
						<div className="nav flex-column nav-pills mb-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">
							<a className="nav-link" id="account-tab" data-toggle="pill" href="/employers/dashboard" role="tab" aria-controls="account" aria-selected="true">
								<i className="fa fa-home text-center mr-1"></i> 
								Account
							</a>
							<a className="nav-link" id="security-tab" data-toggle="pill" href="/employers/dashboard/newjobs" role="tab" aria-controls="security" aria-selected="false">
								<i className="fa fa-check text-center mr-1"></i> 
								Post Job
							</a>
							<a className="nav-link" id="security-tab" data-toggle="pill" href="/employers/dashboard/jobs" role="tab" aria-controls="security" aria-selected="false">
								<i className="fa fa-briefcase text-center mr-1"></i> 
								Posted Jobs
							</a>
              					<a className="nav-link" id="security-tab" data-toggle="pill" href="/employers/dashboard/applied" role="tab" aria-controls="security" aria-selected="false">
								<i className="fa fa-check-square-o text-center mr-1"></i> 
								Interested
							</a>
							<a className="nav-link" id="security-tab" data-toggle="pill" href="/" onClick={this.handleLogout} role="tab" aria-controls="security" aria-selected="false">
								<i className="fa fa-sign-out text-center mr-1"></i> 
								Logout
							</a>
						</div>
					</div>
				</div>

				<div className="tab-content p-2 p-md-5" id="v-pills-tabContent">
				<Switch>
					<Route exact path="/employers/dashboard" component={EmpContent}/>
					{/* <Route exact path="/employers/dashboard/profile" component={EmpProfile}/> */}
					<Route exact path="/employers/dashboard/newjobs" component={PostJobs}/>
					<Route exact path="/employers/dashboard/jobs" component={Jobs}/>
					<Route exact path="/employers/dashboard/applied" component={Applied}/>
				</Switch>
				</div>
			</div>
		</div>
	</section>
    </>);
  }
}

export default EmpLander;