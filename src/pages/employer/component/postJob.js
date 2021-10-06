import React, {useState } from "react";
import axios from 'axios'

import { API_URL, formPostJob } from "../../../components/utils";

const PostJobs =()=> {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [btn,setbtn] = useState(true)
    const [inputs, setInputs] = useState({
        authid: profile_1.job_id,
        jobTitle: "",
        jobDescription: "",
        jobCity: "",
        jobSalary: "",
        jobRequirement: "",
        jobType: "",
        jobApplyEnd: ""
    })
    const [errs,setErr] = useState({title: "",message: "",style:""})

const changeHandle = e => {
    setInputs({...inputs,[e.target.name]: e.target.value})
}

const handleCheck=(e)=>{
    const checked = e.target.checked
    if(checked){
        setbtn(false)
    }else{
       setbtn(true)
    }
   }
   
// ----Post Job-----------
const postJob =async()=>{
    const validate = formPostJob(inputs)
    setErr({title: "",message:"Loading..",style:"text-primary"})
    if (validate.valid===true){
        try {
            const res = await axios.post(`${API_URL}/job/create`,inputs,{headers:header})
            if(res.data.error === false){
                setErr({message:res.data.message,style:'text-success'})
            }else{
                setErr({message:res.data.message,style:'text-danger'})
            }
        } catch (error) {
            
        }
    }
    else{
        setErr({title: "",message:validate.error,style:"text-danger"})
    }
}


    return (<>
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-12 col-lg-12 col-md-12">
                <div>
                    <div className="section row">
                        <div className="col-md-10 col-sm">
                            <label>Job Title</label>
                            <div className=" form-group">
                                <input type="text" className="inputStyle" placeholder="Job Position Title" name="jobTitle" 
                                    value={inputs.jobTitle} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm">
                            <label>Job Description</label>
                            <div className="form-group">
                                <textarea type="text" className="inputStyle" placeholder="Write few lines about the Job Discription"name="jobDescription" 
                                    value={inputs.jobDescription} onChange={changeHandle}/>
                            </div>
                        </div>

                        <div className="col-md-10 col-sm">
                            <label>Job Location</label>
                            <div className="form-group">
                                <div className="form-group">
                                    <input type="text" className="inputStyle" placeholder="Job Location" name="jobCity" 
                                        value={inputs.jobCity} onChange={changeHandle}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm">
                            <label>Salary Information</label>
                            <div className="form-group">
                                <input type="text" className="inputStyle" placeholder="Salary Info" name="jobSalary" 
                                    value={inputs.jobSalary} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm">
                            <label>Job Requirement</label>
                            <div className="form-group">
                                <textarea type="text" className="inputStyle" placeholder="Write few lines about the Job Requirement"name="jobRequirement" 
                                    value={inputs.jobRequirement} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm">
                            <label>Application Deadline</label>
                            <div className="form-group">
                                <div className="calendar">
                                    <input type="date" className="form-control" name="jobApplyEnd" value={inputs.jobApplyEnd} onChange={changeHandle}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm">
                            <label>Exprience Level</label>
                            <div className="input-group">
                                <select className="inputStyle" type="text" placeholder="Select a Level" list="level"
                                name="jobType" value={inputs.jobType} onChange={changeHandle}>
                                    <option value=''>Select ...</option>
                                    <option>Entry Level</option>
                                    <option>Mid Level</option>
                                    <option>Mid-Senior Level</option>
                                    <option>Top Level</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section p-2">
                    <label className='row'>
                        <input className="m-2 formFieldCheckbox" type="checkbox" name="hasAgreed" onClick = {handleCheck}/>{"  "}
                            I agree to your <a href="none">Terms of Conditions</a> and <a href="none">Privacy Policy.</a>
                    </label>
                    <div className='row'>
                        <label className={errs.style}>{errs.message}</label>
                    </div>
                    <div className="buttons row">
                        <button onClick={postJob} className="btn btn-findJob mr-3" disabled={btn}>Post Job</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>);
  }

export default PostJobs;
