import React, {useEffect, useState} from "react";
import axios from 'axios'

import { resizeFile, dataURIToBlob, API_URL, formValid , getUser} from "../../../components/utils";
import DynamicInput from "../../../components/dynamicInputs";
import {validating} from '../../auth/validating'


function UserProfile() {

    const userDp = localStorage.getItem('userDp');
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [imgData, setImgData] = useState(null);
    const [imgBtn, setImgBtn] = useState(true);
	const [imgShow, setImgShow] = useState(null);
    const [imgName, setImgName] = useState('');

    const [pastJob, setpastJob] =useState([])
    const [edu, setEdu] =useState([])
    const [errs,setErr] = useState({title: "",message: "",style:""})
    const [err2,setErr2] = useState({title: "",message: "",style:""})

    const [inputs, setInputs] = useState({
        firstName: profile_1.job_fname,
        lastName:profile_1.job_lname,
        password: "",
        cpassword: "",
        email: profile_1.job_email,
        profileImage:profile_1.dpName,
        type:'seeker'
      })
      const [profile, setProfile] = useState({
        email: profile_1.job_email,
        mobile: profile_2.mobile,
        dateOfBirth: profile_2.dateOfBirth,
        jobTitle: profile_2.jobTitle,
        pastJob: profile_2.pastJobs,
        gender:profile_2.gender,
        qualifications:profile_2.qualifications,
        state:profile_2.state,
        city:profile_2.city,
        type:'seeker'
      })

 
//-------Input change-----------
    const changeHandle = async e => {
        setInputs({...inputs,[e.target.name]: e.target.value})
        setProfile({...profile,[e.target.name]: e.target.value})
      }



//-------Image Upload-----------
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
                'authorization': `<Bearer> ${profile_1.Auth_token}`
            }
        };
        document.getElementById("message").innerText = "Loading.."
        try {
            const res = await axios.post(API_URL+"/profile/updatedp",formData,config)
            console.log(res);
            setImgName(res.data.fileName)
            document.getElementById("message").innerText = res.data.message
          } catch (ex) {
           console.log(ex);
            document.getElementById("message").innerText = ex
          }
    }


//-------Profile Update-----------
const baseUpdate =async()=>{
    // console.log(inputs)
    const erro = validating(inputs)
    if(erro.valid === true){
        setErr({message:'Loading',style:'text-info'})
        try {
            const res = await axios.post(`${API_URL}/profile/updateprofile1`,inputs,{headers:header})
            //console.log(res)
            if(res.data.error === true){
                setErr({message:res.data.status,style:'text-success'})
                getUser()
            }else{
                setErr({message:res.data.status,style:'text-danger'})
            }
        } catch (error) {
            
        }
    }else{
        setErr({message:erro.error,style:'text-danger'})
      }
 }

//-------Profile 2 Update-----------
const detailUpdate =async()=>{
     //console.log(profile)
    const erro = formValid(profile)
     if(erro.valid === true){
        setErr2({message:'Loading',style:'text-info'})
        try {
            const res = await axios.post(`${API_URL}/profile/updateprofile2`,profile,{headers:header})
            //console.log(res)
            if(res.data.error === true){
                setErr2({message:res.data.message,style:'text-success'})
                getUser()
            }else{
                setErr2({message:res.data.message,style:'text-danger'})
            }
        } catch (error) {
            
        }
     }else{
         setErr2({message:erro.error,style:'text-danger'})
       }
}

useEffect(()=>{
    setInputs({...inputs,profileImage:imgName||profile_1.dpName})
    setProfile({...profile,qualifications:[...edu,...profile_2.qualifications],pastJob:[...pastJob,...profile_2.pastJobs]})
},[inputs,profile,edu,pastJob,imgName,profile_1.dpName,profile_2.qualifications,profile_2.pastJobs])

    return (<>
    <div className="border tab-content">
        <div className="tab-pane fade show active m-4">
            <h3 className="mb-1 text-secondary">Profile Update</h3>
            <div className='row border-top'>
                <div className ='col-md-4'>
                    <div className="mb-2 p-2">
                        <div className="d-flex flex-column align-items-center text-center">
                            <div className="row img-circle">
                            {imgBtn?<img src={`${API_URL}/profile/profileImages/${profile_1.dpName}`}  className="shadow" alt="dp"/>:
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
                <div className="col-md-6 p-2 mt-3">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="formFieldInput" name ="firstName" 
                                    placeholder={profile_1.job_fname} value={inputs.firstName} onChange={changeHandle}/>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="formFieldInput" name ="lastName"  
                                    placeholder={profile_1.job_lname} value={inputs.lastName} onChange={changeHandle}/>
                            </div>
                            <div className="form-group">
                            <label>Change Password</label>
                                <input type="password" className="formFieldInput" name ="password"
                                    placeholder="New Password" value={inputs.password} onChange={changeHandle}/>
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label> 
                                <input type="password" className="formFieldInput" name ="cpassword"
                                    placeholder="Confirm Password" value={inputs.cpassword} onChange={changeHandle}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className ='row'>
                <div className='col ml-auto text-center'>
                    <label className={errs.style}>{errs.message}</label>
                </div>
                <div className ="col ml-auto text-right">
                    <button className="btn btn-findJob m-2" type="button" onClick={baseUpdate}>Update</button>
                    <a className="btn btn-outline-danger m-2" type="button"  href="/users/dashboard" >Cancel</a>
                </div>
            </div>
        </div>
        <div className="tab-pane fade show active m-4">
            <h3 className="mb-4 p-2 border-bottom text-secondary"><small>Employment Update</small></h3>
            <div className='row'>
                <div className="col-md-10">
                    <div className="form-group">
                        <label>Qualifications</label>
                        {profile_2.qualifications.length>0 ? (<div>
                            {profile_2.qualifications.map((item, i)=>(
                                <input className="m-2" key={i} value={item} disabled/>
                            ))}
                        </div>):null}
                        <div className="">
                            <DynamicInput get={setEdu}></DynamicInput>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-10">
                    <div className="form-group">
                        <label>Past Jobs</label>
                        {profile_2.pastJobs.length>0 ? (<div>
                            {profile_2.pastJobs.map((item, i)=>(
                                <input className="m-2" key={i} value={item} disabled/>
                            ))}
                        </div>):null}
                        <div className="">
                            <DynamicInput  get={setpastJob}></DynamicInput>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                    <label>Date of Birth</label>
                        <input type="date" name="dateOfBirth" className="formFieldInput"
                          value={profile.dateOfBirth} onChange={changeHandle}  min="1980-01-01" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input type="text" className="formFieldInput" placeholder={profile_2.mobile}
                          name ="mobile"  value={profile.mobile} onChange={changeHandle}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" className="formFieldInput"  placeholder={profile_2.jobTitle}
                            name ="jobTitle" value={profile.jobTitle} onChange={changeHandle}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>State</label>
                        <input type="text" className="formFieldInput" placeholder={profile_2.state}
                            name ="state" value={profile.state} onChange={changeHandle}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="formFieldInput" placeholder={profile_2.city}
                            name ="city" value={profile.city} onChange={changeHandle}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <label>Gender</label>
                    <div className="input-group">
                        <input className="formFieldInput" type="text" name ="gender" placeholder={profile_2.gender} 
                        list="gender" onChange={changeHandle} value={profile.gender}/>
                        <datalist id = "gender">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Transgender</option>
                        </datalist>
                    </div>
                </div>
            </div>
            <div className ='row'>
                <div className='col ml-auto text-center'>
                    <label className={err2.style}>{err2.message}</label>
                </div>
                <div className ="col ml-auto text-right">
                    <button className="btn btn-findJob m-2" type="button" onClick={detailUpdate}>Update</button>
                    <a className="btn btn-outline-danger m-2" type="button"  href="/users/dashboard" >Cancel</a>
                </div>
            </div>
        </div>
    </div>
    </>);
}

export default UserProfile;
