import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";

import EmpContent from "./component/empContent";
import PostJobs from "./component/postJob";
import Jobs from "./component/jobs";
import Applied from "./component/applied";
import Search from "./component/search";
import EmpRegister from "./component/empRegister";
import ErrorPage from "../../components/errorPage";
import EmpProfile from "./component/profile";

import {API_URL, rawImg} from '../../components/utils'


const EmpLander = ()=> {

	const history = useHistory();

	const [dialogShow, setDialogShow] = useState(false);
	const [userimg, setUserImg]=useState('')

	const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));

	const header = {'authorization': `<Bearer> ${userDetils.Auth_token}`}
	const formData = {email:userDetils.job_email,type:userDetils.Role_Type}

	const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
// --------------get User------
useEffect(() =>{
	const getUser = async()=>{
		try {
			const res = await axios.post(`${API_URL}/profile/getprofile`,formData,{headers:header})
			if(res.data.error === false){
				const datas = res.data.data
				localStorage.setItem('userInfo', JSON.stringify(datas.part2));
				addToLocalStorageObject('userDetails','dpName',datas.part1.profileImage)
				addToLocalStorageObject('userDetails','job_fname',datas.part1.firstName)
				addToLocalStorageObject('userDetails','job_lname',datas.part1.lastName)
				//const resdp = await axios.get(`${API_URL}/profile/profileImages/${datas.part1.profileImage}`,{headers:header})
				//console.log(datas.part1)
				setUserImg(datas.part1.profileImage)
				// const imguri = rawImg(resdp.data)
				// addToLocalStorageObject('userDetails','userdp',imguri)
			}
			else{
				setDialogShow(true)
			}
		} catch (error) {
			console.log(error)
		}
	}
	getUser()
},[header,formData])

var addToLocalStorageObject = function (name, key, value) {
	var existing = localStorage.getItem(name);
	existing = existing ? JSON.parse(existing) : {};
	existing[key] = value;
	localStorage.setItem(name, JSON.stringify(existing));

};

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
							<img src={profile_1.userdp}  className="shadow" alt="imagess"/>
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
					<Route exact path="/employers/dashboard/profile" component={EmpProfile}/>
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