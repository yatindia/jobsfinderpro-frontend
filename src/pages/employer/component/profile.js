import React, {useEffect, useState} from "react";
import axios from 'axios'

import { resizeFile, dataURIToBlob, API_URL, empformValid,getUser} from "../../../components/utils";
import {validating} from '../../auth/validating'

function EmpProfile() {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [imgData, setImgData] = useState(null);
    const [imgBtn, setImgBtn] = useState(true);
	const [imgShow, setImgShow] = useState(null);
    const [imgName, setImgName] = useState('');

    const [logoData, setLogoData] = useState(null);
    const [logoBtn, setLogoBtn] = useState(true);
	const [logoShow, setLogoShow] = useState(null);
    const [logoName, setLogoName] = useState('');

    const [errs,setErr] = useState({title: "",message: "",style:""})
    const [err2,setErr2] = useState({title: "",message: "",style:""})

    const [inputs, setInputs] = useState({
        firstName: profile_1.job_fname,
        lastName: profile_1.job_lname,
        email: profile_1.job_email,
        profileImage:profile_1.dpName,
        type:'employer'
      })

      const [pwd, setPwd] = useState({
        email: profile_1.job_email,
        oldPassword:"",
        password:"",
        type:'employer'
      })

    const [profile, setProfile] = useState({
    email: profile_1.job_email,
    type:"employer",
    orgPhone: profile_2.orgPhone,
    orgLogo:profile_2.orgLogo,
    orgName:profile_2.orgName,
    orgEmail:profile_2.orgEmail,
    orgAddress: profile_2.orgAddress,
    orgWebsite :profile_2.orgWebsite,
    orgCountry: profile_2.orgCountry,
    gstin:profile_2.gstin,
    pan:profile_2.pan
    })

//-------Input change-----------
const changeHandle = async e => {
    setInputs({...inputs,[e.target.name]: e.target.value})
    setPwd({...pwd,[e.target.name]: e.target.value})
    setProfile({...profile,[e.target.name]: e.target.value})
    }


//-------Profile Update-----------
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
    const formData = new FormData();
    formData.append("profile", imgData);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'authorization': `<Bearer> ${profile_1.Auth_token}`
        }
    };
    document.getElementById("message").innerText = "Loading.."
    try {
        if (profile_1.dpName === 'default.jpg'){
            const res = await axios.post(API_URL+"/account/uploaddp",formData,config)
            if(res.data.uploadStatus === true){
                setImgName(res.data.fileName)
                document.getElementById("message").innerText = "Uploaded, Click! Update"
            }else{
                document.getElementById("message").innerText = "Upload Failed"
            }  
        }
        else{
            formData.append('oldDp',profile_1.dpName)
            const res = await axios.post(API_URL+"/profile/updatedp",formData,config)
            if(res.data.uploadStatus === true){
                setImgName(res.data.fileName)
                document.getElementById("message").innerText = "Uploaded Click! Update"
            }else{
                document.getElementById("message").innerText = "Upload Failed"
            }  
        }
    }
    catch (ex) {
    console.log(ex);
        document.getElementById("message").innerText = "Network Error"
    }
}

const baseUpdate =async()=>{
    if(inputs.firstName!=='' && inputs.lastName !==''){
        // console.log(inputs)
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
        setErr({message:'** Enter Name',style:'text-danger'})
      }
}

//-------Company Profile Update-----------
const onLogoChange=async (e)=>{
    if (e.target.files[0]) {
        const file = e.target.files[0];
        const image = await resizeFile(file);
        const newFile = dataURIToBlob(image);
        setLogoShow(image)
        setLogoData(newFile)
        setLogoBtn(false)
    }
}

const logoUpload= async ()=>{
    const formData = new FormData();
    formData.append("profile", logoData);
    formData.append('oldDp',profile_2.orgLogo)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'authorization': `<Bearer> ${profile_1.Auth_token}`
        }
    };
    document.getElementById("mess").innerText = "Loading.."
    try {
        const res = await axios.post(API_URL+"/profile/updatedp",formData,config)
        if(res.data.uploadStatus === true){
            setLogoName(res.data.fileName)
            document.getElementById("mess").innerText = "Uploaded, Click! Update"
        }else{
            document.getElementById("mess").innerText = "Upload Failed"
        }
        } catch (ex) {
             console.log(ex);
             document.getElementById("mess").innerText = "Network Error"
        }
}
const profileUpdate =async()=>{
    const erro = empformValid(profile)
    if(erro.valid === true){
        setErr2({message:'Loading',style:'text-info'})
        try {
            const res = await axios.post(`${API_URL}/profile/updateprofile2`,profile,{headers:header})
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

const pswdUpdate=async()=>{
    if(pwd.oldPassword !== '' && pwd.password !== ''){
        document.getElementById('pswd').innerText="Loading.."
        try {
            const res = await axios.post(`${API_URL}/profile/updatepassword`,pwd,{headers:header})
            if(res.data.error === true){
                document.getElementById('pswd').innerText=res.data.status
                getUser()
            }else{
                document.getElementById('pswd').innerText=res.data.status
            }
        } catch (error) {
            document.getElementById('pswd').innerText= "Network Error"
        }
    }else{
        document.getElementById('pswd').innerText= "Enter the credentials"
      }
}

useEffect(()=>{
    setInputs({...inputs,profileImage:imgName||profile_1.dpName})
    setProfile({...profile,orgLogo:logoName||profile_2.orgLogo})
},[pwd,inputs,profile,imgName,profile_1.dpName,logoName,profile_2.orgLogo])

return (<>
<div className="container-flex m-3 border p-2">
    <div className="tab-pane active " id="password" role="tabpanel">
    <h3 className="mb-4 p-2 text-secondary"><small>Profile Update</small></h3>
        <div className='row border-top justify-content-center m-auto pt-4'>
            <div className ="col-md-4 align-items-center text-center">
                <div className="mb-2 p-2">
                    <div className="d-flex flex-column align-items-center text-center">
                        <div className="row img-circle">
                        {imgBtn?<img src={`${API_URL}/profile/profileImages/${profile_1.dpName}`}  className="shadow" alt="userImage"/>:
                            <img src={imgShow} className="shadow"  alt="ProfileImage"/>}
                        </div>
                        <div className="col mt-4">
                            <div className="dragBox btn" >Pick Image
                                <input type="file"  accept="image/*" onChange={onImageChange} id="uploadFile"  />
                            </div>
                            <div>
                                <button className="btn dragBox mt-2" onClick={imageUpload}>Upload</button>
                                <label className="m-auto text-info" id="message"></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col m-4">
                <div className="row">
                    <label>First Name</label>
                    <input type="text" className=" formFieldInput" name ="firstName" 
                        placeholder="Enter First Name" value={inputs.firstName} onChange={changeHandle}/>
                </div>
                <div className="row form-group">
                    <label>Last Name</label>
                    <input type="text" className=" formFieldInput" name ="lastName"  
                        placeholder="Enter Last Name"  value={inputs.lastName} onChange={changeHandle}/>
                </div>
                <div className ='row'>
                    <div className='col m-auto text-center'>
                        <label className={errs.style}>{errs.message}</label>
                    </div>
                    <div className ="col ml-auto text-right">
                        <button className="btn btn-outline-success m-2" type="button" onClick={baseUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div> 
        <div className="row ml-auto text-right float-end">
            <a className="btn-upload " type="button"  href="/employers/dashboard" >Back to Dashboard</a>
        </div>
            {/* <div className ="col-md-4 align-items-center text-center">
                <div className="mb-2 p-2">
                    <div className="d-flex flex-column align-items-center text-center">
                        <div className="row img-circle">
                        {imgBtn?<img src={`${API_URL}/profile/profileImages/${profile_1.dpName}`}  className="shadow" alt="dp"/>:
                            <img src={imgShow} className="shadow"  alt="ProfileImage"/>}
                        </div>
                        <div className="col mt-4">
                            <div className="dragBox btn" >Pick Image
                                <input type="file"  accept="image/*" onChange={onImageChange} id="uploadFile"  />
                            </div>
                            <div>
                                <button className="row btn dragBox m-2" onClick={imageUpload}>Upload</button>
                                <label className="m-auto text-info" id="message"></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        <div className="pt-4 border-top">
            <h4 className="p-2 text-secondary"><small><u>Security Change</u></small></h4>
        </div>
        <div className='row justify-content-center m-auto'>
            <div className="col form-group">
                <label>Existing Password</label>
                <input type="password" className="formFieldInput" name ="oldPassword"
                    placeholder="Existing Password" value={pwd.oldPassword} onChange={changeHandle}/>
            </div>
            <div className="col form-group">
                <label>New Password</label> 
                <input type="password" className=" formFieldInput" name ="password"
                    placeholder="New Password" value={pwd.password} onChange={changeHandle}/>
            </div>  
        </div>   
        <div className ='row'>
            <div className='col ml-auto text-center'>
                <label className="m-auto text-info" id="pswd"></label>
            </div>
            <div className ="col ml-auto text-right">
                <button className="btn btn-outline-success m-2" type="button" onClick={pswdUpdate}>Update</button>
            </div>
        </div> 
    </div>
    <div className="tab-pane fade show active border-top p-3">
            <h3 className="mb-4 p-2 border-bottom text-secondary"><small>Organization Profile Update</small></h3>
            <div className='row'>
                <div className="mb-2 p-2 col">
                    <div className="d-flex flex-column align-items-center text-center">
                        <div className="row img-circle">
                            {logoBtn?<img src={`${API_URL}/profile/profileImages/${profile_2.orgLogo}`}  className="shadow" alt="Logo"/>:
                            <img src={logoShow} className="shadow"  alt="ProfileImage"/>}
                        </div>
                    </div>
                </div>
                <div className="col mt-4">
                    <div className="bottom">
                        <div className="row dragBox btn" >Pick Logo
                            <input type="file"  accept="image/*" onChange={onLogoChange} id="uploadFile"  />
                        </div>
                        <div className="row mt-2">
                            <button className="btn dragBox mt-2" onClick={logoUpload}>Upload</button>
                        </div>
                        <div className="row mt-2">
                            <label className="text-info" id="mess"></label>
                        </div>
                    </div>
                </div>
            </div>   

            <div className='row mt-4'>
                <div className="col-md-10">
                    <div className="form-group">
                    <label>Organization Name</label>
                        <input type="text" className=" formFieldInput text-capitalize"  name="orgName"
                            placeholder="Enter Organization Name"  value={profile.orgName} onChange={changeHandle} />
                    </div>
                    {/* <div className="form-group">
                        <label>Organization E-mail</label>
                        <input type="text" className=" formFieldInput"  name="orgEmail"
                            placeholder="Enter Organization Mail"value={profile.orgEmail} onChange={changeHandle} />
                    </div> */}
                    <div className="form-group">
                        <label>Organization Contact Number</label>
                        <input type="text" className=" formFieldInput" name="orgPhone"
                            placeholder="Enter Organization Phone" value={profile.orgPhone} onChange={changeHandle} />
                    </div>
                    <div className="form-group">
                        <label>Organization PAN Number</label>
                        <input type="text" className=" formFieldInput" name="pan"
                            placeholder="Enter Organization PAN" value={profile.pan} onChange={changeHandle} />
                    </div>
                    <div className="form-group">
                        <label>Organization GSTIN Number</label>
                        <input type="text" className=" formFieldInput" name="gstin"
                            placeholder="Enter Organization GSTIN" value={profile.gstin} onChange={changeHandle} />
                    </div>
                    <div className="form-group">
                        <label>Organization Wesite</label>
                        <input type="text" className=" formFieldInput"  name="orgWebsite"
                            placeholder="Enter Organization Wesite" value={profile.orgWebsite} onChange={changeHandle} />
                    </div>
                    <div className="form-group">
                        <label>Organization Address</label>
                        <textarea type="text" className="formFieldInput text-capitalize"  row="4" name="orgAddress"
                        placeholder="Enter Organization Address"value={profile.orgAddress} onChange={changeHandle} />
                    </div>
                    <label>Organization Country</label>
                    <input type="text" className="formFieldInput text-capitalize "  name="orgCountry"
                        placeholder="Enter Organization Country" value={profile.orgCountry} onChange={changeHandle}/>
                </div>
            </div>
            <div className ='row mt-4'>
                <div className='col ml-auto text-center'>
                    <label className={err2.style}>{err2.message}</label>
                </div>
                <div className ="col ml-auto text-right">
                    <button className="btn btn-outline-success m-2" type="button" onClick={profileUpdate}>Update</button>
                    <a className="btn-upload m-2" type="button"  href="/employers/dashboard" >Back to Dashboard</a>
                </div>
            </div>
        </div>
    </div>
</>);
}

export default EmpProfile;