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
import EditJob from "./component/editModal";
import Payment from './component/payment'
import Resumes from "./component/resumes";

import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

import {API_URL, userDp} from '../../components/utils'


const EmpLander = ()=> {

	const history = useHistory();

	const [dialogShow, setDialogShow] = useState(false);
	const [imgname,setimgname] = useState('')
	// const [points,setPoints] = useState('')

	const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));

	const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
	const formData = {email:profile_1.job_email,type:profile_1.Role_Type}

// --------------get User------
useEffect(() =>{
	const getUser = async()=>{
		try {
			const res = await axios.post(`${API_URL}/profile/getprofile`,formData,{headers:header})
			if(res.data.error === false){
				const datas = res.data.data
				setimgname(datas.part2.orgLogo)
				// setPoints(datas.part2.resumePoints)
				localStorage.setItem('userInfo', JSON.stringify(datas.part2));
				addToLocalStorageObject('userDetails','dpName',datas.part1.profileImage)
				addToLocalStorageObject('userDetails','job_fname',datas.part1.firstName)
				addToLocalStorageObject('userDetails','job_lname',datas.part1.lastName)
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
	<NavBar/>
    <section className="container p-1">
	<EmpRegister show={dialogShow} title="Complete Organization Profile" dialogClose={dialogClose} button="success"/>
		<div className="container-fluid">
			<div className="bg-white rounded-lg d-block d-sm-flex">
				<div id="sidebar">
					<div className="profile-tab-nav border-right">
						<div className="mb-3">
						<div className="d-flex flex-column align-items-center text-center">
							<div className="row img-circle">
							<img src={`${API_URL}/profile/profileImages/${imgname}` || userDp}  className="shadow" alt="OrgLogo"/>
							</div>
						</div>
						</div>
						<div className="nav flex-column nav-pills mb-4" aria-orientation="vertical">
							{/* <p className='text-center'>Balance Points: # {points}</p> */}
							<a className="nav-link" href="/employers/dashboard">
								<i className="fa fa-home text-center mr-1"></i> 
								Dashboard
							</a>
							<a className="nav-link" href="/employers/dashboard/payment">
								<i className="fa fa-shopping-cart text-center mr-1"></i> 
								Payments
							</a>
							<a className="nav-link" href="/employers/dashboard/newjobs">
								<i className="fa fa-check text-center mr-1"></i> 
								Post Job
							</a>
							<a className="nav-link" href="/employers/dashboard/jobs">
								<i className="fa fa-briefcase text-center mr-1"></i> 
								Posted Jobs
							</a>
              					<a className="nav-link" href="/employers/dashboard/search">
								<i className="fa fa-search text-center mr-1"></i> 
								Resume Search
							</a>
							<a className="nav-link" href="/" onClick={handleLogout}>
								<i className="fa fa-sign-out text-center mr-1"></i> 
								Logout
							</a>
						</div>
					</div>
				</div>

				<div className="tab-content " id="v-pills-tabContent">
				<Switch>
					<Route exact path="/employers/dashboard" component={EmpContent}/>
					<Route exact path="/employers/dashboard/profile" component={EmpProfile}/>
					<Route exact path="/employers/dashboard/newjobs" component={PostJobs}/>
					<Route exact path="/employers/dashboard/jobs" component={Jobs}/>
					<Route exact path="/employers/dashboard/jobs/:id" component={EditJob}/>
					<Route exact path="/employers/dashboard/search" component={Search}/>
					<Route exact path="/employers/dashboard/resumes" component={Resumes}/>
					<Route exact path="/employers/dashboard/payment" component={Payment}/>
					<Route exact path="/employers/dashboard/jobs/applied/:id" component={Applied}/>
					<Route exact path="*" component={ErrorPage}/>
				</Switch>
				</div>
			</div>
		</div>
	</section>
	<Footer/>
    </>);
}

export default EmpLander;