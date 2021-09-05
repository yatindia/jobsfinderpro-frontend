import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FacebookLoginButton,
  InstagramLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import axios from 'axios'

import { API_URL } from "../../components/utils";
import DialogBox from '../../components/dialogBox'
import { validateMail } from "./validating";

const Login =()=> {

  const [dialogShow, setDialogShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [errs,setErr] = useState('')
  const history = useHistory();
  const [inputs, setInputs] = useState({
    password: "",
    email: "",
  })

  const handleSubmit=(e) =>{
    e.preventDefault();
    if(inputs.email==="" || inputs.password===""){
     setErr("** Enter the valid credentials")
    }
    else if (inputs.email==="prsnthmailbox@gmail.com" && inputs.password==="prs"){
      const userDetails = {job_email: inputs.email, Role_Type: "seeker"}
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      history.push('/users/dashboard');
      window.location.reload()
    }
    else if (inputs.email==="bungalowarch3d@gmail.com" && inputs.password==="prs"){
      const userDetails = {job_email: inputs.email, Role_Type: "employer"}
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
        history.push('/employers/dashboard');
        window.location.reload()
   }  
    else{
      setErr("** Login Failed")
    }
  }

    const changeHandle = e => {
      setInputs({...inputs,[e.target.name]: e.target.value})
    }

    // -----Login function----
    const validateemail = validateMail(inputs)

    // const handleSubmit= async(e) =>{
    //   e.preventDefault();
    //   if(validateemail.valid===false){
    //     setErr("**"+ validateemail.error)
    //   }else if(!inputs.password){setErr("**Enter the Password"); setConfirm(true)}

    //   else{
    //   try {
    //     const res = await axios.post(API_URL+"/account/login",inputs)
    //     console.log(res);
    //     if(res.data.error===false){
    //       setErr(res.data.Message)
    //       setConfirm(false)
    //     }else{
    //       setErr(res.data.Message)
    //     }
    //   } catch (ex) {
    //     setErr(ex)
    //   }
    //   }
    // }

// -----Reset Password function----
 const forgetPassword=(e)=>{
    e.preventDefault();
    if(!inputs.email){
     setErr('*Enter the E-mail') }
    else{
      setErr('')
      setDialogShow(true)}
  }

// -----Resent Confirmation function----
  const verifyMail=(e)=>{
    e.preventDefault();
    if(!inputs.email){
     setErr('*Enter the E-mail') }
    else{
      setErr('')}
  }

  const dialogClose=()=>{
    setDialogShow(false)
  }

  return (<>
  <div className="App d-flex">
      <div className="appForm mx-auto  align-center">
      <DialogBox show={dialogShow} title="Password Reset" 
          detail="A pasword reset link is sented to please check.. " dialogClose={dialogClose} button="success"/>
          <div label="Sign-In">
            <div className="formCenter">
              <form className="">
                <div className="formField ">
                  <label className="formFieldLabel" htmlFor="email">
                    E-Mail Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="formFieldInput"
                    placeholder="Enter your email"
                    name="email" required={true}
                    onChange={changeHandle}
                  />
                </div>

                <div className="formField ">
                  <label className="formFieldLabel" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="formFieldInput"
                    placeholder="Enter your password"
                    name="password"
                    onChange={changeHandle}
                  />
                </div>
              </form>
                <div className="text-danger mb-3" id="err_message">{errs}</div>

                <div className="formField">
                  <button className="btn formFieldButton effect" onClick={handleSubmit}>Sign In</button>
                  {confirm === false ? 
                    <button className=" m-2 btn btn-outline-secondary" onClick={forgetPassword}> <small>Forget Password</small></button> :""}
                  {confirm === true ? 
                  <button className=" m-2 btn btn-outline-secondary" onClick={verifyMail}> <small>Verify E-mail</small></button>:""}
                </div>
                
                <div className="socialMediaButtons">
                <div className="googleButton m-2">
                    <GoogleLoginButton onClick={() => alert("Hello")} />
                  </div>
                  <div className="facebookButton m-2">
                    <FacebookLoginButton onClick={() => alert("Hello")} />
                  </div>

                  <div className="instagramButton m-2">
                    <InstagramLoginButton onClick={() => alert("Hello")} />
                  </div>
                </div>
              
            </div>
          </div>
      </div>
    </div>
  </>);
}

export default Login;
