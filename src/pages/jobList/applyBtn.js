import React,{useState, useEffect} from "react";
import axios from "axios";
import {Button} from 'react-bootstrap'

import { API_URL } from "../../components/utils";

function ApplyBtn({job}) {


  const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
  const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

const [btnFun,setBtnFun]=useState(true)
const [btnText,setBtnText]=useState("")
const [btnStyle,setBtnStyle]=useState("")
const [unbtn,setunbtn] = useState(false)


useEffect(() => {
  const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));
    if(!userDetils){
        setBtnFun(true)
        setBtnText('Login to Apply')
        setBtnStyle('text')
    }else if(userDetils.Role_Type === "seeker"){
      setBtnFun(false)
      const name = 'Apply'
      setBtnText(name)
      setBtnStyle('outline-info')
      checkApply()
  }else if(userDetils.Role_Type === "employer"){
    setBtnFun(true)
    const name = ''
    setBtnText(name)
    setBtnStyle('text')
  }
},[job]);


// ----Apply Job------
  const  handleClick =async()=>{
    const formData = {seekerid:profile_1.job_id,jobid:job._id}
    try {
      const res = await axios.post(`${API_URL}/job/apply`,formData,{headers:header})
      if (res.data.error === false){
        checkApply()
      }
    } catch (error) {
      console.log(error)
    }
  }

// ----Un Apply Job------
  const unApply = async()=>{
    const formData = {seekerid:profile_1.job_id,jobid:job._id}
    try {
      const res = await axios.post(`${API_URL}/job/unapply`,formData,{headers:header})
      if (res.data.error === false){
        checkApply()
        setunbtn(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

// ----Check Applied job------
  const checkApply = async()=>{
    try {
      const formData = {jobid:job._id}
      const res = await axios.post(`${API_URL}/job/searchone`,formData,{headers:header})
      if(res.data.error===false){
        const aplyId = res.data.data.job.appliedBy
        if(aplyId.includes(profile_1.job_id)){
        setunbtn(true)
        }
      }
    } catch (error) {
      
    }
  }

    return (
      <div>{!unbtn ?
        <Button className="m-2"
        onClick={handleClick}
        variant={btnStyle}
        disabled={btnFun}>
          {btnText}
      </Button>:
      <Button className="m-2"
        onClick={unApply}
        variant= 'outline-danger'
        disabled={false}>
          UnApply
      </Button>}
      
      </div>
    );
   }

export default ApplyBtn;