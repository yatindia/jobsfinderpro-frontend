import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FacebookLoginButton,
  InstagramLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";

import DialogBox from '../../components/dialogBox'

const Login =()=> {

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dialogShow, setDialogShow] = useState(false);
  const [errs,setErr] = useState('')
  const history = useHistory();

  const handleSubmit=(e) =>{
    e.preventDefault();
    if(userEmail==="" || password===""){
     setErr("** Enter the valid credentials")
    }
    else if (userEmail==="prsnthmailbox@gmail.com" && password==="prs"){
      const userDetails = {job_email: userEmail, Role_Type: "seeker"}
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      history.push('/users/dashboard');
      window.location.reload()
    }
    else if (userEmail==="bungalowarch3d@gmail.com" && password==="prs"){
      const userDetails = {job_email: userEmail, Role_Type: "employer"}
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
        history.push('/employers/dashboard');
        window.location.reload()
   }  
    else{
      setErr("** Login Failed")
    }
  }

 const forgetPassword=(e)=>{
    e.preventDefault();
    if(!userEmail){
     setErr('Enter the E-mail')
    }
    else{
      setErr('')
      setDialogShow(true)
    }
  }
const dialogClose=()=>{
  setDialogShow(false)
}

    return (<>
      <div className="App d-flex">
        <div className="appAside" >
        </div>
          <div className="appForm">
          <DialogBox show={dialogShow} title="Password Reset" 
        detail="A pasword reset link is sented to please check.. " dialogClose={dialogClose} button="success"/>
        
              <div label="Sign-In">
                <div className="formCenter">
                  <form className="formFields">
                    <div className="formField">
                      <label className="formFieldLabel" htmlFor="email">
                        E-Mail Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="formFieldInput"
                        placeholder="Enter your email"
                        name="email"
                        onChange={e => setUserEmail(e.target.value)}
                      />
                    </div>

                    <div className="formField">
                      <label className="formFieldLabel" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="formFieldInput"
                        placeholder="Enter your password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-danger mb-3">{errs}</div>

                    <div className="formField">
                      <button className="btn formFieldButton effect" onClick={handleSubmit}>Sign In</button>
                      <button className=" ml-4 btn btn-outline-secondary" onClick={forgetPassword}> <small>Forget Password</small></button>{" "}
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
                  </form>
                </div>
              </div>
      </div>
    </div>
    </>);
}

export default Login;
