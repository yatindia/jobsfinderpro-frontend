import React, {useEffect,useState} from "react";
import { Route, Switch, useHistory } from "react-router-dom";


import UserProfile from "./component/profile";
import UserContent from "./component/userContent";
import MyJobs from "./component/myJobs";
import Registration from "./component/register";

function  UserLander () {

	const [dialogShow, setDialogShow] = useState(false);
	const history = useHistory()

	
	useEffect(() =>{
		const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));
        if(!userDetils){
			history.push('/')
        } else if(userDetils.Role_Type === "seeker"){
			if(userDetils.Profile === "False") {
				setDialogShow(true)
			}
			else{
				history.push('/users/dashboard');
            	window.location.reload()
			}
		}
    },[history])
	
const handleLogout=()=>{
	localStorage.removeItem('userDetails')
	history.push('/')
	window.location.reload()
}
const dialogClose=()=>{
    setDialogShow(false)
  }


    return (<>
    <section className="py-5 my-5">
		<div className="container-fluid">
		<Registration show={dialogShow} title="Complete Your Profile" dialogClose={dialogClose} button="success"/>
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
							<a className="nav-link"  onClick={handleLogout} href="/" >
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

export default UserLander;
