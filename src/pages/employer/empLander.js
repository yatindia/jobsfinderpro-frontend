import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import EmpContent from "./component/empContent";
import PostJobs from "./component/postJob";
import Jobs from "./component/jobs";
import Applied from "./component/applied";
import Search from "./component/search";
import EmpRegister from "./component/empRegister";
import ErrorPage from "../../components/errorPage";


const EmpLander = ()=> {

	const history = useHistory();

	const [dialogShow, setDialogShow] = useState(false);

	
// --------------On Mount------
useEffect(() =>{
	const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));
	if(!userDetils){
		history.push('/')
	} else if(userDetils.Role_Type === "employer"){
		if(userDetils.Profile === "False") {
			setDialogShow(true)
		}
		else{
			history.push('/employers/dashboard');
			//window.location.reload()
		}
	}
},[history])

// ------- Image load--------
const userDp = localStorage.getItem('userDp');


// ------- Logout-------	
const handleLogout=()=>{
	localStorage.removeItem('userDetails')
	history.push('/')
}
const dialogClose=()=>{
    setDialogShow(false)
  }

    return (<>
    <section className="py-5 my-5">
	<EmpRegister show={dialogShow} title="Complete Organization Profile" dialogClose={dialogClose} button="success"/>
		<div className="container-fluid">
			<div className="bg-white shadow rounded-lg d-block d-sm-flex">
				<div id="sidebar">
					<div className="profile-tab-nav border-right ">
						<div className="mb-3">
						<div className="d-flex flex-column align-items-center text-center">
							<div className="row img-circle">
							<img src={userDp}  className="shadow" alt="Logo"/>
							</div>
						</div>
						</div>
						<div className="nav flex-column nav-pills mb-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">
							<a className="nav-link" id="account-tab" data-toggle="pill" href="/employers/dashboard" role="tab" aria-controls="account" aria-selected="true">
								<i className="fa fa-home text-center mr-1"></i> 
								Dashboard
							</a>
							<a className="nav-link" id="security-tab" data-toggle="pill" href="/employers/dashboard/newjobs" role="tab" aria-controls="security" aria-selected="false">
								<i className="fa fa-check text-center mr-1"></i> 
								Post Job
							</a>
							<a className="nav-link" id="security-tab" data-toggle="pill" href="/employers/dashboard/jobs" role="tab" aria-controls="security" aria-selected="false">
								<i className="fa fa-briefcase text-center mr-1"></i> 
								Posted Jobs
							</a>
              					<a className="nav-link" id="security-tab" data-toggle="pill" href="/employers/dashboard/search" role="tab" aria-controls="security" aria-selected="false">
								<i className="fa fa-search text-center mr-1"></i> 
								Search
							</a>
              					<a className="nav-link" id="security-tab" data-toggle="pill" href="/employers/dashboard/applied" role="tab" aria-controls="security" aria-selected="false">
								<i className="fa fa-check-square-o text-center mr-1"></i> 
								Interested
							</a>
							<a className="nav-link" id="security-tab" data-toggle="pill" href="/" onClick={handleLogout} role="tab" aria-controls="security" aria-selected="false">
								<i className="fa fa-sign-out text-center mr-1"></i> 
								Logout
							</a>
						</div>
					</div>
				</div>

				<div className="tab-content p-2 p-md-5" id="v-pills-tabContent">
				<Switch>
					<Route exact path="/employers/dashboard" component={EmpContent}/>
					<Route exact path="/employers/dashboard/newjobs" component={PostJobs}/>
					<Route exact path="/employers/dashboard/jobs" component={Jobs}/>
					<Route exact path="/employers/dashboard/search" component={Search}/>
					<Route exact path="/employers/dashboard/applied" component={Applied}/>
					<Route exact path="*" component={ErrorPage}/>
				</Switch>
				</div>
			</div>
		</div>
	</section>
    </>);
}

export default EmpLander;