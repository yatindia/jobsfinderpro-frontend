import React, {useEffect,useState} from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import UserProfile from "./component/profile";
import UserContent from "./component/userContent";
import MyJobs from "./component/myJobs";
import Registration from "./component/register";

function  UserLander () {

	const [dialogShow, setDialogShow] = useState(false);
	const history = useHistory()

	const userDp = localStorage.getItem('userDp');
	
	useEffect(() =>{
		const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));
        if(!userDetils){
			history.push('/')
        } else if(userDetils.Role_Type === "seeker"){
			setDialogShow(true)
			if(userDetils.Profile === "False") {
				setDialogShow(true)
			}
			else{
				history.push('/users/dashboard');
            	//window.location.reload()
			}
		}
    },[history])

	
	
const handleLogout=()=>{
	history.push('/')
	localStorage.removeItem('userDetails')
}
const dialogClose=()=>{
    setDialogShow(false)
  }


    return (<>
    <section className="py-5 my-5">
		<div className="container-fluid">
		<Registration show={dialogShow} title="Complete Your Profile" dialogClose={dialogClose} button="success"/>
			<div className="bg-white shadow rounded-lg d-block d-sm-flex">

				{/* -------Sidebar-------- */}
				<div id="sidebar">
					<div className="profile-tab-nav border-right ">
						<div className="p-4">
						<h4 className="text-center h5">Kiran Acharya</h4>
							<div className="mb-2">
								<div className="d-flex flex-column align-items-center text-center">
                                	<div className="row img-circle">
                                    <img src={userDp}  className="shadow" alt="Logo"/>
                                    </div>
                                </div>
                            </div>
						</div>
						<div className="nav flex-column nav-pills mb-4"   aria-orientation="vertical">
							<a className="nav-link " href="/users/dashboard" >
								<i className="fa fa-home text-center mr-1"></i> 
								Dashboard
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

				{/* -------Content body-------- */}
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
