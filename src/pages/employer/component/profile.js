import React, {useEffect, useState} from "react";
import axios from 'axios'

import { resizeFile, dataURIToBlob, API_URL, empformValid} from "../../../components/utils";
import {validating} from '../../auth/validating'
import TabView from "../../../components/tabView";

function EmpProfile() {

    const userDp = localStorage.getItem('userDp');
    const userlogo = localStorage.getItem('userlogo')
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
        password: "",
        cpassword: "",
        email: profile_1.job_email,
        profileImage:profile_1.dpName,
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
    })

//-------Input change-----------
const changeHandle = async e => {
    setInputs({...inputs,[e.target.name]: e.target.value})
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
    setErr({title:'',message:'Loading..',style:'text-primary'})
    try {
        const res = await axios.post(API_URL+"/profile/updatedp",formData,config)
            setImgName(res.data.fileName)
            setErr({title:'',message:res.data.message,style:'text-success'})
            setInputs({...inputs,profileImage:imgName})
        } catch (ex) {
        // console.log(ex);
    setErr({title:'',message:ex,style:'text-warning'})
        }
}

const baseUpdate =async()=>{
    //console.log(inputs)
    const erro = validating(inputs)
    if(erro.valid === true){
        setErr({message:'Loading',style:'text-info'})
        try {
            const res = await axios.post(`${API_URL}/profile/updateprofile1`,inputs,{headers:header})
            //console.log(res)
            if(res.data.error === true){
                setErr({message:res.data.status,style:'text-success'})
                window.location.reload()
            }else{
                setErr({message:res.data.status,style:'text-danger'})
            }
        } catch (error) {
            
        }
    }else{
        setErr({message:erro.error,style:'text-danger'})
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
        localStorage.setItem("userlogo",  image);
        setLogoBtn(false)
    }
}

const logoUpload= async ()=>{
    let imageData = ''
    if(!userlogo){
        imageData = logoData
    }else {
        const newFile = dataURIToBlob(userlogo);
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
    setErr2({title:'',message:'Loading..',style:'text-primary'})
    try {
        const res = await axios.post(API_URL+"/profile/updatedp",formData,config)
            setLogoName(res.data.fileName)
            setErr2({title:'',message:res.data.message,style:'text-success'})
        } catch (ex) {
        // console.log(ex);
    setErr2({title:'',message:ex,style:'text-warning'})
        }
}
const profileUpdate =async()=>{
    // console.log(profile)
    const erro = empformValid(profile)
    if(erro.valid === true){
        setErr2({message:'Loading',style:'text-info'})
        try {
            const res = await axios.post(`${API_URL}/profile/updateprofile2`,profile,{headers:header})
            //console.log(res)
            if(res.data.error === true){
                setErr2({message:res.data.message,style:'text-success'})
                window.location.reload()
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
    setProfile({...profile,orgLogo:logoName||profile_2.orgLogo})
},[inputs,profile,imgName,profile_1.dpName,logoName,profile_2.orgLogo])

return (<>
<div className="border p-3">
    <div className="tab-pane active " id="password" role="tabpanel">
    <h3 className="mb-4 p-2 text-secondary"><small>Profile Update</small></h3>
        <div className='row border-top'>
            <div className ="col-md-4 align-items-center text-center">
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
                            <input type="text" className=" formFieldInput" name ="firstName" 
                                placeholder={profile_1.job_fname} value={inputs.firstName} onChange={changeHandle}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className=" formFieldInput" name ="lastName"  
                                placeholder={profile_1.job_lname} value={inputs.lastName} onChange={changeHandle}/>
                        </div>
                        <div className="form-group">
                        <label>Change Password</label>
                            <input type="password" className="formFieldInput" name ="password"
                                placeholder="New Password" value={inputs.password} onChange={changeHandle}/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label> 
                            <input type="password" className=" formFieldInput" name ="cpassword"
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
                <a className="btn btn-outline-danger m-2" type="button"  href="/employers/dashboard" >Cancel</a>
            </div>
        </div>
    </div>
    <div className="tab-pane fade show active border-top p-3">
            <h3 className="mb-4 p-2 border-bottom text-secondary"><small>Organization Profile Update</small></h3>
            <div className='row'>
                <div className='col-md-4'>
                    <div className="mb-2 p-2">
                        <div className="d-flex flex-column align-items-center text-center">
                            <div className="row img-circle">
                                {logoBtn?<img src={`${API_URL}/profile/profileImages/${profile_2.orgLogo}`}  className="shadow" alt="Logo"/>:
                                <img src={logoShow} className="shadow"  alt="ProfileImage"/>}
                            </div>
                            <div className="col mt-4">
                                <div className="dragBox" >Change Logo
                                    <input type="file"  accept="image/*" onChange={onLogoChange} id="uploadFile"  />
                                </div>
                                <div>
                                    <button className="row dragBox m-2" onClick={logoUpload}>Upload</button>
                                    <label className="row text-danger" id="message"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">                 
                    <div className='row'>
                        <div className="col">
                            <div className="form-group">
                            <label>Organization Name</label>
                                <input type="text" className=" formFieldInput" placeholder={profile_2.orgName} name="orgName"
                                    value={profile.orgName} onChange={changeHandle} />
                            </div>
                            <div className="form-group">
                                <label>Organization E-mail</label>
                                <input type="text" className=" formFieldInput" placeholder={profile_2.orgEmail} name="orgEmail"
                                    value={profile.orgEmail||profile_2.orgEmail} onChange={changeHandle} />
                            </div>
                            <div className="form-group">
                                <label>Organization Contact Number</label>
                                <input type="text" className=" formFieldInput" placeholder={profile_2.orgPhone} name="orgPhone"
                                    value={profile.orgPhone||profile_2.orgPhone} onChange={changeHandle} />
                            </div>
                            <div className="form-group">
                                <label>Organization Wesite</label>
                                <input type="text" className=" formFieldInput" placeholder={profile_2.orgWebsite} name="orgWebsite"
                                    value={profile.orgWebsite||profile_2.orgWebsite} onChange={changeHandle} />
                            </div>
                            <div className="form-group">
                                <label>Organization Address</label>
                                <textarea type="text" className="formFieldInput " placeholder={profile_2.orgAddress} row="4" name="orgAddress"
                                    value={profile.orgAddress||profile_2.orgAddress} onChange={changeHandle} />
                            </div>
                            <label>Organization Landmark</label>
                            <input type="text" className="formFieldInput " placeholder={profile_2.orgCountry} name="orgCountry"
                                value={profile.orgCountry||profile_2.orgCountry} onChange={changeHandle} />
                        </div>
                    </div>
                </div>
            </div>
            <div className ='row'>
                <div className='col ml-auto text-center'>
                    <label className={err2.style}>{err2.message}</label>
                </div>
                <div className ="col ml-auto text-right">
                    <button className="btn btn-findJob m-2" type="button" onClick={profileUpdate}>Update</button>
                    <a className="btn btn-outline-danger m-2" type="button"  href="/employers/dashboard" >Cancel</a>
                </div>
            </div>
        </div>
    </div>
</>);
}

export default EmpProfile;