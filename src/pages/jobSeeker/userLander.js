import React, {useEffect,useState} from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from 'axios'

import UserProfile from "./component/profile";
import UserContent from "./component/userContent";
import MyJobs from "./component/myJobs";
import Registration from "./component/register";
import { resizeFile, dataURIToBlob, API_URL} from "../../components/utils";

function  UserLander () {

	const [dialogShow, setDialogShow] = useState(false);
	const [imgData, setImgData] = useState(null);
    const [imgBtn, setImgBtn] = useState(true);
	const [imgShow, setImgShow] = useState(null);
	const history = useHistory()

	const userDp = localStorage.getItem('userDp');
	
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
            	//window.location.reload()
			}
		}
    },[history])

	const onImageChange=async (e)=>{
		if (e.target.files[0]) {
			const file = e.target.files[0];
			const image = await resizeFile(file);
			const newFile = dataURIToBlob(image);
			setImgShow(image)
			localStorage.setItem("userDp",  image);
			setImgData(newFile)
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
            console.log(res);
            document.getElementById("message").innerText = res.data.message
          } catch (ex) {
           console.log(ex);
            document.getElementById("message").innerText = ex
          }
    }
	
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
                                    {imgBtn?<img src={userDp || imgShow}  className="shadow" alt="Logo"/>:
                                        <img src={imgShow} className="shadow"  alt="ProfileImage"/>}
                                    </div>
									<div className="col mt-4">
										<div className="dragBox" >Pick Image
											<input type="file"  accept="image/*" onChange={onImageChange} id="uploadFile"  />
										</div>
										<div>
											<button className="row dragBox m-2" onClick={imageUpload}>Upload</button>
											<label className="row text-danger" id="message">**First Upload Dp...</label>
										</div>
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
