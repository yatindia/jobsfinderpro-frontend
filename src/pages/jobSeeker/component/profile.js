import React, {useEffect, useState} from "react";
import axios from 'axios'

import { resizeFile, dataURIToBlob, API_URL, formValid , getUser, userDp} from "../../../components/utils";
import {validating} from '../../auth/validating'
import cities from '../../../components/asserts/ind_cities.json'


function UserProfile() {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [imgData, setImgData] = useState(null);
    const [imgBtn, setImgBtn] = useState(true);
	const [imgShow, setImgShow] = useState(null);
    const [imgName, setImgName] = useState('null');
    const [resume, setResume] = useState('')
    const [resumeName, setResumeName] = useState(profile_2.resume)

    const [newJob, setNewJob] =useState()
    const [newEdu, setNewEdu] =useState()
    const [skill,setSkill] = useState({skill:"",experience:""})
    const [exp,setExp] = useState()
    const [errs,setErr] = useState({title: "",message: "",style:""})
    const [err2,setErr2] = useState({title: "",message: "",style:""})
    const [mess,setMess] = useState({message: "",style:""})

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
        resume:profile_2.resume,
        techQualifications:profile_2.techQualifications,
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
			setImgData(newFile)
			setImgBtn(false)
		}
	}
	const imageUpload= async ()=>{
        const formData = new FormData();
        formData.append("profile", imgData);
        formData.append('oldDp',profile_1.dpName)
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
    //  console.log(profile)
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

// -------Resume update------
const resumeClick = (e)=>{
    if (e.target.files[0]) {
        const file = e.target.files[0];
        document.getElementById("fileName").innerText = file.name
        setResume(file)
    }
}
 
const uploadResume=async()=>{
    if(resume === ''){
        setMess({message:'Select the Resume',style:'text-info'})
    }else{
        const formdata = new FormData()
        formdata.append('resume',resume)
        formdata.append('oldResume',profile_2.resume)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': `<Bearer> ${profile_1.Auth_token}`
            }
        };
        try {
            setMess({message:'Loading..',style:'text-primary'})
            const res = await axios.post(`${API_URL}/profile/updateresume`,formdata,config)
            if(res.data.uploadStatus === true){
                setResumeName(res.data.fileName)
                setMess({message:res.data.message,style:'text-info'})
            }else{
                setMess({message:res.data.message,style:'text-danger'})
            }        
        } catch (ex) {
        console.log(ex);
        setMess({message:"Network error",style:'text-warning'})
        }
    }
}
const changeSkill =(e)=>{
    setSkill({...skill,[e.target.name]: e.target.value})
}

const skillNew = ()=>{
    let arr = profile.techQualifications.concat(skill)
    setProfile({...profile,techQualifications:arr})
}

const deleteSkill=(e,i)=>{
    const items = Object.assign([],profile.techQualifications)
    items.splice(i,1)
    setProfile({...profile,techQualifications:items})
}

const skillChange=(i,e)=>{
    const items = Object.assign([],profile.techQualifications)
    const {name, value} = e.target
    items[i][name] = value
    setProfile({...profile,techQualifications:items})
}

const deleteJob=(i,e)=>{
    const job = e.target.value
    const filtered = profile.pastJob.filter(jb => jb !== job);
    setProfile({...profile,pastJob:filtered})
}

const jobAdd =()=>{
   let arr = profile.pastJob.concat(newJob)
   setProfile({...profile,pastJob:arr})
}

const jobChange=(i,e)=>{
    const items = Object.assign([],profile.pastJob)
    items.splice(i, 1, e.target.value)
    setProfile({...profile,pastJob:items})
}

const deleteEdu=(e)=>{
    const eduId = e.target.value
    const items = Object.assign([],profile.qualifications)
    items.splice(eduId,1)
    setProfile({...profile,qualifications:items})
}

const eduAdd =()=>{
   let arr = profile.qualifications.concat(newEdu)
   setProfile({...profile,qualifications:arr})
}

const eduChange=(i,e)=>{
    const items = Object.assign([],profile.qualifications)
    items.splice(i, 1, e.target.value)
    setProfile({...profile,qualifications:items})
}

useEffect(()=>{
    setInputs({...inputs,profileImage:imgName})
    setProfile({...profile,qualifications:[...profile.qualifications],pastJob:[...profile.pastJob],techQualifications:[...profile.techQualifications],resume:resumeName,})
},[inputs,profile,imgName,resumeName])

    return (<>
    <div className="conatiner-flex m-3 p-2 border tab-content">
        <div className="tab-pane fade show active m-2">
            <h3 className="mb-4 p-2 border-bottom text-secondary"><small>Profile Update</small></h3>
            <div className='row'>
                <div className ='col-md-4'>
                    <div className="mb-2 p-2">
                        <div className="d-flex flex-column align-items-center text-center">
                            <div className="row img-circle">
                            {imgBtn?<img src={`${API_URL}/profile/profileImages/${profile_1.dpName}` || userDp}  className="shadow" alt="dp"/>:
                                <img src={imgShow} className="shadow"  alt="ProfileImage"/>}
                            </div>
                            <div className="col mt-4">
                                <div className="dragBox btn" >Change Image
                                    <input type="file"  accept="image/*" onChange={onImageChange} id="uploadFile"  />
                                </div>
                                <div>
                                    <button className="row dragBox btn m-2" onClick={imageUpload}>Upload</button>
                                    <label className="row text-info" id="message"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 p-2 mt-3">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label className="formFieldLabel">First Name</label>
                                <input type="text" className="formFieldInput" name ="firstName" 
                                    placeholder={profile_1.job_fname} value={inputs.firstName} onChange={changeHandle}/>
                            </div>
                            <div className="form-group">
                                <label className="formFieldLabel">Last Name</label>
                                <input type="text" className="formFieldInput" name ="lastName"  
                                    placeholder={profile_1.job_lname} value={inputs.lastName} onChange={changeHandle}/>
                            </div>
                            <div className="form-group">
                            <label className="formFieldLabel">Change Password</label>
                                <input type="password" className="formFieldInput" name ="password"
                                    placeholder="New Password" value={inputs.password} onChange={changeHandle}/>
                            </div>
                            <div className="form-group">
                                <label className="formFieldLabel">Confirm Password</label> 
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
            <div className="row ">
                <div>
                    <div className='col'>
                    {profile_2.resume === 'null' ?<label className="file-name text-info">Upload Resume</label>:<>
                                <label className="formFieldLabel">Current Resume: </label>
                                <label className="file-name">{profile_2.resume}</label></>}
                        <div className="resume-container">
                            <div className="btn-wrap">
                            {profile_2.resume === 'null' ?<label className="btn-resume" htmlFor="upload">Get Resume</label>:
                                        <label className="btn-resume" htmlFor="upload">Change Resume</label>}
                                <input id="upload" type="file" accept="application/pdf" onChange={resumeClick}/>
                                <label className="file-name" id="fileName"></label>
                                <button className="btn btn-resume m-2" type='button' onClick={uploadResume}>Upload</button>
                                <label className={mess.style}>{mess.message}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-10">
                    <div className="form-group">
                        <label className="formFieldLabel">Qualifications</label>
                        <div className="row">
                            <div className='col'>
                                <input className="form-control" onChange={(e) => setNewEdu(e.target.value)}/>
                            </div>
                            <div className='col-sm'>
                                <button className="btn btn-resume" onClick={eduAdd}>Add New</button>
                            </div>
                        </div>
                        {profile_2.qualifications.length>0 ? (
                        <div className='row p-2'>
                            {profile.qualifications.map((item, i)=>(
                            <div key={i} className="d-flex">
                                <input className="m-2 p-1 form-control" type="text" defaultValue={item} onChange={(e)=>eduChange(i,e)}/>
                                <button className="m-2 btn btn-outline-danger" value={i} onClick={(e)=>deleteEdu(e)}>X</button>
                            </div>
                            ))}
                        </div>):null}
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-10">
                    <div className="form-group">
                        <label className="formFieldLabel">Previous Jobs</label>
                        <div className="row">
                            <div className='col'>
                                <input className="form-control" onChange={(e) => setNewJob(e.target.value)}/>
                            </div>
                            <div className='col-sm'>
                                <button className="btn btn-resume" onClick={jobAdd}>Add Job</button>
                            </div>
                        </div>
                        {profile_2.pastJobs.length>0 ? (
                        <div className='row p-2'>
                            {profile.pastJob.map((item, i)=>(
                            <div key={i} className="d-flex">
                                <input className="m-2 p-1 form-control" type="text" defaultValue={item} onChange={(e)=>jobChange(i,e)}/>
                                <button className="m-2 btn btn-outline-danger" value={item} onClick={(e)=>deleteJob(i,e)}>X</button>
                            </div>
                            ))}
                        </div>):null}
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-10">
                    <div className="form-group">
                        <label className="formFieldLabel">Technical Skills</label>
                        <div className="row p-2">
                            <div className='d-flex'>
                                <input className="form-control m-2 p-1 " name="skill" onChange={changeSkill}/>
                                <select className="form-control m-2 p-1 " name="experience" onChange={changeSkill}>
                                    <option value=''>Experience</option>
                                    <option value='1'>Below 1 Year</option>
                                    <option value='2'>2 Years</option>
                                    <option value='3'>3 Years</option>
                                    <option value='4'>4 Years</option>
                                    <option value='5'>5 Years</option>
                                    <option value='6'>6 Years</option>
                                    <option value='7'>7 Years</option>
                                    <option value='8'>8 Years</option>
                                    <option value='9'>9 Years</option>
                                    <option value='10'>10 Years</option>
                                    <option value='11'>10 + Years</option>
                                </select>
                            </div>
                            <div className='col-sm'>
                                <button className="m-2 p-1 btn btn-resume" onClick={skillNew}>Add Skills</button>
                            </div>
                        </div>
                        {profile.techQualifications ? (
                        <div className='row p-2'>
                            {profile.techQualifications.map((item, i)=>(
                            <div key={i} className="d-flex">
                                <input className="m-2 p-1 form-control" name="skill" defaultValue={item.skill} onChange={(e)=>skillChange(i,e)}/>
                                <select className="m-2 p-1 form-control" name="experience" defaultValue={item.experience} onChange={(e)=>skillChange(i,e)}>
                                    <option value='1'>Below 1 Year</option>
                                    <option value='2'>2 Years</option>
                                    <option value='3'>3 Years</option>
                                    <option value='4'>4 Years</option>
                                    <option value='5'>5 Years</option>
                                    <option value='6'>6 Years</option>
                                    <option value='7'>7 Years</option>
                                    <option value='8'>8 Years</option>
                                    <option value='9'>9 Years</option>
                                    <option value='10'>10 Years</option>
                                    <option value='11'>10 + Years</option>
                                </select>
                                <button className="m-2 btn btn-outline-danger" value={i} onClick={(e)=>deleteSkill(e,i)}>X</button>
                            </div>
                            ))}
                        </div>):null}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                    <label className="formFieldLabel">Date of Birth</label>
                        <input type="date" name="dateOfBirth" className="formFieldInput"
                          value={profile.dateOfBirth} onChange={changeHandle} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="formFieldLabel">Contact Number</label>
                        <input type="text" className="formFieldInput" placeholder={profile_2.mobile}
                          name ="mobile"  value={profile.mobile} onChange={changeHandle}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="formFieldLabel">Job Title</label>
                        <input type="text" className="formFieldInput"  placeholder={profile_2.jobTitle}
                            name ="jobTitle" value={profile.jobTitle} onChange={changeHandle}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="formFieldLabel">Gender</label>
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
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="formFieldLabel">State</label>
                        <input type="text" className="formFieldInput text-capitalize"
                            name ="state" value={profile.state} onChange={changeHandle}  list='state'/>
                            <datalist id ='state'>
                                {Array.from(new Set(cities.map(item=>item.state))).map((state,i)=>(<option key={i} value={state}>{state}</option>))}
                            </datalist>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="formFieldLabel">City</label>
                        <input type="text" className="formFieldInput text-capitalize"
                            name ="city" value={profile.city} onChange={changeHandle} list='city'/>
                             <datalist id ='city'>
                                {Array.from(new Set(cities.filter(selec => selec.state === profile.state).map(item=>item.name)))
                                    .map((name,i)=>(<option key={i} value={name}>{name}</option>))}
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
