import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// import {
//   FacebookLoginButton,
//   InstagramLoginButton,
//   GoogleLoginButton
// } from "react-social-login-buttons";

import axios from 'axios'

import { API_URL } from "../../components/utils";
import DialogBox from '../../components/dialogBox'
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

import { validateMail } from "./validating";

const Login =()=> {

  const [dialogShow, setDialogShow] = useState(false);
  const [errs,setErr] = useState({
    title: "",
    message: "",
    style:""
  })

  const [btnVerify, setBtnVerify] = useState(false);
  const history = useHistory();
  const [inputs, setInputs] = useState({
    password: "",
    email: "",
  })

    const changeHandle = e => {
      setInputs({...inputs,[e.target.name]: e.target.value})
    }

  // -----Login function----
    const validateemail = validateMail(inputs)

    const handleSubmit= async(e) =>{
      e.preventDefault();
      if(validateemail.valid===false){
        setErr({message:"*"+ validateemail.error,style:'text-danger'})
      }
      else if(!inputs.password){setErr({message:"**Enter the Password",style:'text-danger'});}
      else{
      try {
        setErr({message:"Loading..",style:'text-primary'})
        const res = await axios.post(`${API_URL}/account/login`,inputs)
        if(res.data.error===false){
          const datas = res.data.data
          const userDetails = {job_email: inputs.email, Role_Type: datas.type, userdp:'', dpName:'',
              Auth_token:datas.authToken, job_fname:datas.firstName,job_lname:datas.lastName, job_id:datas.authid}
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
            if(datas.type === "employer"){
              history.push('/employers/dashboard');
              window.location.reload()
            }
            else if(datas.type === "seeker"){
              history.push('/users/dashboard');
             window.location.reload()
            }
            else{window.location.reload()
            }

          setBtnVerify(false)
        }else if(res.data.error===true && res.data.message==="Please confirm your verification e-mail"){
          setBtnVerify(true)
          setErr({message:"Please verify your e-mail",style:'text-info'})
        }
        else{
          setBtnVerify(false)
          setErr({message:res.data.message,style:'text-danger'})
        }
      } catch (ex) {
        console.log(ex)
        setErr({message:'**Network Error',style:'text-warning'})
      }
      }
    }

// -----Reset Password function----
 const forgetPassword=async()=>{
    if(!inputs.email){
     setErr({message:'*Enter valid E-mail',style:'text-danger'}) }
    else{
      try {
        setErr({title:'',message:'Loading..',style:'text-primary'})
        const res = await axios.post(`${API_URL}/account/recoverPassword`,inputs)
        if(res.data.error===false){
          setErr({title:'Reset Password',message:'Check Your mail for Recovery password',style:'text-success'})
          setDialogShow(true)
        }
        else{setErr({message:res.data.Message,style:'text-danger'})}
      } catch (error) {
        console.log(error)
      }
    }
  }

// -----Resent Confirmation function----
  const verifyMail=async (e)=>{
    e.preventDefault();
    if(!inputs.email){
      setErr({message:'*Enter valid E-mail',style:'text-danger'}) }
    else{
      try {
        setErr({title:'',message:'Loading..',style:'text-primary'})
        const res = await axios.post(`${API_URL}/account/reconfirm`,{email:inputs.email})
        if(res.data.error===false){
          setErr({title:'Verify E-mail',message:'Check Your mail for new Verification link, Valid only for 4 Hours',style:'text-success'})
          setDialogShow(true)
        }
        else{setErr({message:res.data.Message,style:'text-danger'})}
      } catch (error) {
        console.log(error)
      }
    }
  }

  const dialogClose=()=>{
    setDialogShow(false)
  }

  return (<>
  <DialogBox show={dialogShow} title={errs.title} detail={errs.message} dialogClose={dialogClose}/>
  <NavBar/>
  <div className="App d-flex p-4">
      <div className="appForm mx-auto shadow align-center">
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
                <div className="p-3"><span className={errs.style}>{errs.message}</span></div>

                <div className="formField">
                  <button className="btn formFieldButton effect" onClick={handleSubmit}>Sign In</button>
                  {btnVerify === false ? 
                    <button className=" m-2 btn btn-outline-secondary effect" onClick={forgetPassword}> <small>Forget Password</small></button> :""}
                  {btnVerify === true ? 
                  <button className=" m-2 btn btn-outline-secondary effect" onClick={verifyMail}> <small>Sent new Verify Link</small></button>:""}
                  <label className="links m-1 float-right">New User ? <a href="/register">Sign-Up</a> here.</label>
                </div>
                {/* <div className="socialMediaButtons">
                <div className="googleButton m-2">
                    <GoogleLoginButton onClick={() => alert("Hello")} />
                  </div>
                  <div className="facebookButton m-2">
                    <FacebookLoginButton onClick={() => alert("Hello")} />
                  </div>

                  <div className="instagramButton m-2">
                    <InstagramLoginButton onClick={() => alert("Hello")} />
                  </div>
                </div> */}
              
            </div>
          </div>
      </div>
    </div>
    <Footer/>
  </>);
}

export default Login;
