import React, { useEffect, useState} from "react";
import axios from 'axios'

import { resizeFile, dataURIToBlob, API_URL} from "../../../components/utils";
import DynamicInput from "../../../components/dynamicInputs";


function UserProfile() {
    const [imgData, setImgData] = useState(null);
    const [imgBtn, setImgBtn] = useState(true);
	const [imgShow, setImgShow] = useState(null);

    const [pastJob, setpastJob] =useState([])
    const [edu, setEdu] =useState([])

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        profileImage:"",
        type:'seeker'
      })
    const userDp = localStorage.getItem('userDp');
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
 
useEffect(()=>{
    setInputs({...inputs,firstName:profile_1.job_fname,lastName:profile_1.job_lname,password:profile_1.job_email})
})


    const changeHandle = async e => {
        setInputs({...inputs,[e.target.name]: e.target.value})
      }


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
	
const baseUpdate =()=>{
    console.log(inputs)
}


    return (<>
    <div className="tab-content border">
        <div className="tab-pane fade show active m-5">
            <h3 className="mb-4">Profile Update</h3>
            <div className='row border-top'>
                    <div className="mb-2 p-2">
                        <div className="d-flex flex-column align-items-center text-center">
                            <div className="row img-circle">
                            {imgBtn?<img src={userDp || imgShow}  className="shadow" alt="Logo"/>:
                                <img src={imgShow} className="shadow"  alt="ProfileImage"/>}
                            </div>
                            <div className="col mt-4">
                                <div className="dragBox" >Change Image
                                    <input type="file"  accept="image/*" onChange={onImageChange} id="uploadFile"  />
                                </div>
                                <div>
                                    <button className="row dragBox m-2" onClick={imageUpload}>Upload</button>
                                    <label className="row text-danger" id="message"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" name ="firstName" value={inputs.firstName} onChange={changeHandle}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" name ="lastName" value={inputs.lastName} onChange={changeHandle}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Change Password</label>
                        <input type="password" className="form-control" name ="password"  value={inputs.password} onChange={changeHandle}/>
                    </div>
                </div>
                <div className ='row'>
                    <div className ="col">
                        <button className="btn btn-findJob m-2" type="button" onClick={baseUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="tab-pane fade show active border-top m-5">
            <h3 className="mb-4 p-2 border-bottom"><small>Employment Update</small></h3>
            <div className='row'>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Qualifications</label>
                        <div className="">
                            <DynamicInput get={setEdu}></DynamicInput>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Past Jobs</label>
                        <div className="">
                            <DynamicInput get={setpastJob}></DynamicInput>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
            <div className="col-md-4">
                    <div className="form-group">
                    <label>Date of Birth</label>
                        <input type="date" name="dateOfBirth" className="form-control" placeholder="dd-mm-yyyy" 
                            min="1980-01-01" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input type="text" className="form-control" defaultValue="Kiran"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" className="form-control" defaultValue="Kiran"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>State</label>
                        <input type="text" className="form-control" defaultValue="Kiran"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" defaultValue="Kiran"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <label>Gender</label>
                    <div className="input-group">
                        <input className="form-control" type="text" name ="gender" placeholder="Select.." 
                        list="gender"/>
                        <datalist id = "gender">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Transgender</option>
                        </datalist>
                    </div>
                </div>
            </div>
            <div className ='row'>
                    <div className ="col">
                        <button className="btn btn-findJob m-2">Update</button>
                    </div>
                </div>
        </div>
    </div>
    </>);
}

export default UserProfile;
