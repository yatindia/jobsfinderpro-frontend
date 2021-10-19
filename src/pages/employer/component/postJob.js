import React, {useEffect, useState } from "react";
import axios from 'axios'

import { API_URL, formPostJob } from "../../../components/utils";
import cities from '../../../components/asserts/ind_cities.json'
import category from '../../../components/asserts/category.json'

const PostJobs =()=> {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [btn,setbtn] = useState(true)
    const [cat,setcat] = useState()
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

const changeCate =(e)=>{
    const cate = e.target.value
    if(e==='Select..' || e ===''){
        setcat('')
    }
    else{
        try {
            let subData = require('../../../components/asserts/subCategory/'+cate+'.json');
            setcat(subData)
        } catch (error) {
            setcat('')
            console.log(error)
        }
    }
}

    return (<>
    <div className="container-flex m-2 p-2 ">
        <div className="row p-3 m-2">
            <div className="col-md-12 col-lg-12 col-md-12">
                <div>
                    <div className="section row">
                        <div className="col-md-10 col-sm-10">
                            <label>Job Title</label>
                            <div className=" form-group">
                                <input type="text" className="inputStyle text-capitalize" placeholder="Job Position Title" name="jobTitle" 
                                    value={inputs.jobTitle} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-5">
                            <label>Category</label>
                            <div className="form-group">
                                <div className="form-group">
                                    <select type="text" className="inputStyle text-capitalize" placeholder="Category" name="jobCity" 
                                        onChange={(e)=>changeCate(e)}>
                                            <option value=''>Select Category</option>
                                            {category.map((name,i)=>(<option key={i} value={name}>{name}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-5">
                            <label>Sub Category</label>
                            <div className="form-group">
                                <div className="form-group">
                                    <select type="text" className="inputStyle text-capitalize" placeholder="Category" name="jobCity">
                                        {!cat ? <option value=''>Select Category</option>:cat.map((name,i)=>(<option key={i} value={name}>{name}</option>))}
                                            
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm-10">
                            <label>Job Description</label>
                            <div className="form-group">
                                <textarea type="text" className="inputStyle" placeholder="Write few lines about the Job Discription"name="jobDescription" 
                                    rows="6" value={inputs.jobDescription} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm-10">
                            <label>Job Location</label>
                            <div className="form-group">
                                <div className="form-group">
                                    <input type="text" className="inputStyle text-capitalize" placeholder="Job Location" name="jobCity" 
                                        value={inputs.jobCity} onChange={changeHandle} list='city'/>
                                        <datalist id ='city'>
                                            {Array.from(new Set(cities.map(item=>item.name))).map((name,i)=>(<option key={i} value={name}>{name}</option>))}
                                        </datalist>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm-10">
                            <label>Salary Information</label>
                            <div className="form-group">
                                <input type="text" className="inputStyle" placeholder="Salary Info" name="jobSalary" 
                                    value={inputs.jobSalary} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm-10">
                            <label>Job Requirement</label>
                            <div className="form-group">
                                <textarea type="text" className="inputStyle" placeholder="Write few lines about the Job Requirement"name="jobRequirement" 
                                   rows="3" value={inputs.jobRequirement} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-5">
                            <label>Application Deadline</label>
                            <div className="form-group">
                                <div className="calendar">
                                    <input type="date" className="form-control" name="jobApplyEnd" value={inputs.jobApplyEnd} onChange={changeHandle}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-5">
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
                    <label className='row align-items-center m-auto'>
                        <input className="m-2 formFieldCheckbox" type="checkbox" name="hasAgreed" onClick = {handleCheck}/>{"  "}
                            I agree to your <a href="none"> Terms of Conditions.</a>
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
