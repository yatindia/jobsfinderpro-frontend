import React, {useEffect,useState} from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";

import UserProfile from "./component/profile";
import UserContent from "./component/userContent";
import MyJobs from "./component/myJobs";
import Registration from "./component/register";
import NavBar from "../../components/navBar";
import Footer from '../../components/footer'

import {API_URL} from '../../components/utils'

function  UserLander () {

	const [dialogShow, setDialogShow] = useState(false);
	const [imgname,setimgname] = useState('')
	const history = useHistory()

	const userDetils = JSON.parse(localStorage.getItem( 'userDetails'))

	const header = {'authorization': `<Bearer> ${userDetils.Auth_token}`}
	const formData = {email:userDetils.job_email,type:userDetils.Role_Type}

// --------------get User------
useEffect(() =>{
    const getuser= async()=>{
        try {
			const res = await axios.post(`${API_URL}/profile/getprofile`,formData,{headers:header})
			//console.log(res)
			if(res.data.error === false){
				const datas = res.data.data
				setimgname(datas.part1.profileImage)
				localStorage.setItem('userInfo', JSON.stringify(datas.part2));
				addToLocalStorageObject('userDetails','dpName',datas.part1.profileImage)
				addToLocalStorageObject('userDetails','job_fname',datas.part1.firstName)
				addToLocalStorageObject('userDetails','job_lname',datas.part1.lastName)
				// setDialogShow(true)
			}
			else{
				setDialogShow(true)
			}
		} catch (error) {
			console.log(error)
		}

    }
    getuser()
},[header,formData])

var addToLocalStorageObject = function (name, key, value) {
	var existing = localStorage.getItem(name);
	existing = existing ? JSON.parse(existing) : {};
	existing[key] = value;
	localStorage.setItem(name, JSON.stringify(existing));

};


const handleLogout=()=>{
	history.push('/')
	localStorage.removeItem('userDetails')
}
const dialogClose=()=>{
    setDialogShow(false)
  }


    return (<>
	<NavBar/>
    <section className="container">
		<div className="container-fluid">
		<Registration show={dialogShow} title="Complete Your Profile" dialogClose={dialogClose} button="success"/>
			<div className="bg-white rounded-lg d-block d-sm-flex">

				{/* -------Sidebar-------- */}
				<div id="sidebar">
					<div className="profile-tab-nav border-right ">
						<div className="p-4">
						{/* <h4 className="text-center h5">{userDetils.job_fname} {userDetils.job_lname}</h4> */}
							<div className="mb-2">
								<div className="d-flex flex-column align-items-center text-center">
                                	<div className="row img-circle">
                                    <img src={`${API_URL}/profile/profileImages/${imgname}`} className="shadow" alt="Profile"/>
                                    </div>
                                </div>
                            </div>
						</div>
						<div className="nav flex-column nav-pills mb-4"   aria-orientation="vertical">
							<a className="nav-link" href="/users/dashboard" >
								<i className="fa fa-home text-center mr-1"></i> 
								Dashboard
							</a>
							<a className="nav-link"  href="/users/dashboard/myjobs" >
								<i className="fa fa-briefcase text-center mr-1"></i> 
								Applied Jobs
							</a>
							<a className="nav-link"  href="/users/dashboard/profile" >
								<i className="fa fa-cogs text-center mr-1"></i> 
								Edit Profile
							</a>
							<a className="nav-link"  href={`/jobs?kwds=&loc `}>
								<i className="fa fa-search text-center mr-1"></i> 
								Search Job
							</a>
							<a className="nav-link"  onClick={handleLogout} href="/" >
								<i className="fa fa-sign-out text-center mr-1"></i> 
								Logout
							</a>
						</div>
					</div>
				</div>

				{/* -------Content body-------- */}
				<div className="tab-content ">
					<Switch>
						<Route exact path="/users/dashboard" component={UserContent}/>
						<Route exact path="/users/dashboard/profile" component={UserProfile}/>
						<Route exact path="/users/dashboard/myjobs" component={MyJobs}/>
					</Switch>
				</div>
			</div>
		</div>
	</section>
	<Footer/>
    </>);
  }

export default UserLander;
