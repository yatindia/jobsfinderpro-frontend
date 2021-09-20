import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";

import EmpContent from "./component/empContent";
import PostJobs from "./component/postJob";
import Jobs from "./component/jobs";
import Applied from "./component/applied";
import Search from "./component/search";

import { resizeFile, dataURIToBlob, API_URL } from "../../components/utils";

const EmpLander = ()=> {

	const history = useHistory();
	const [imgData, setImgData] = useState(null);
    const [imgShow, setImgShow] = useState(null);
    const [imgBtn, setImgBtn] = useState(true);

	
// --------------On Mount------
	useEffect(()=> {
		const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));
        if(!userDetils){
			history.push('/')
        } else if(userDetils.Role_Type === "employer") {
			return null 
        }
    })

// ------- Image upload--------
const userDp = localStorage.getItem('userDp');

const onImageChange=async (e)=>{
	if (e.target.files[0]) {
		const file = e.target.files[0];
		const image = await resizeFile(file);
		const newFile = dataURIToBlob(image);
		setImgShow(image)
		setImgData(newFile)
		localStorage.setItem("userDp",  image);
		setImgBtn(false)
	}
}

const imageUpload= async ()=>{
	let imageData = ''
	if(!userDp){
		imageData = imgData
	}else {
		const newFile = dataURIToBlob(userDp);
		imageData = newFile
	}
	const formData = new FormData();
	formData.append("profile", imageData);
	const config = {
		headers: {
			'content-type': 'multipart/form-data',
		}
	};
	document.getElementById("message").innerText = "Loading.."
	try {
		const res = await axios.post(API_URL+"/account/uploaddp",formData,config)
		//console.log(res);
		document.getElementById("message").innerText = res.data.message
	  } catch (ex) {
	   // console.log(ex);
		document.getElementById("message").innerText = ex
	  }
}


// ------- Logout-------	
const handleLogout=()=>{
	localStorage.removeItem('userDetails')
	history.push('/')
}


    return (<>
    <section className="py-5 my-5">
		<div className="container-fluid">
			<div className="bg-white shadow rounded-lg d-block d-sm-flex">
				<div id="sidebar">
					<div className="profile-tab-nav border-right ">
						<div className="mb-3">
						<div className="d-flex flex-column align-items-center text-center">
							<div className="row img-circle">
							{imgBtn?<img src={userDp || imgShow}  className="shadow" alt="Logo"/>:
								<img src={imgShow} className="shadow"  alt="pic"/>}
							</div>
							<div className="col mt-4">
								<div className="dragBox" >Pick Image
									<input type="file"  accept="image/*" onChange={onImageChange} id="uploadFile"  />
								</div>
								<div>
									<button className="row dragBox m-2" onClick={imageUpload}>Upload</button>
									<label className="row text-danger" id="message"></label>
								</div>
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
					{/* <Route exact path="/employers/dashboard/profile" component={EmpProfile}/> */}
					<Route exact path="/employers/dashboard/newjobs" component={PostJobs}/>
					<Route exact path="/employers/dashboard/jobs" component={Jobs}/>
					<Route exact path="/employers/dashboard/search" component={Search}/>
					<Route exact path="/employers/dashboard/applied" component={Applied}/>
				</Switch>
				</div>
			</div>
		</div>
	</section>
    </>);
}

export default EmpLander;