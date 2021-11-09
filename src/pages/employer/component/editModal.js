import React,{useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";

import { API_URL } from "../../../components/utils";
//import {formPostJob } from '../../../components/utils';
import cities from '../../../components/asserts/ind_cities.json'
import category from '../../../components/asserts/category.json'


const EditJob = () => {

    const param = useParams()
    const history = useHistory();
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));

    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [cat,setcat] = useState()
    const [inputs, setInputs] = useState({
        authid: profile_1.job_id,
        jobTitle: "",
        jobDescription: "",
        jobCity: "",
        jobSalary: "",
        jobRequirement: "",
        jobType: "",
        jobApplyEnd: "",
        jobCategory: "",
        jobSubCategory: "",
        _id:""
    })

    const [errs,setErr] = useState({title: "",message: "",style:""})


const changeHandle = e => {
    setInputs({...inputs,[e.target.name]: e.target.value})
}

// ----Get Job-----------
useEffect(() => {
    const formData = {authid:profile_1.job_id,jobid:param.id}
    const getuser= async()=>{
        try {
            const res = await axios.post(`${API_URL}/job/getsinglejob`,formData,{headers:header})
            if(res.data.error === false){
                const datas = res.data.data
                setInputs({
                    authid: profile_1.job_id,
                    _id:param.id,
                    jobTitle: datas.jobTitle,
                    jobDescription: datas.jobDescription,
                    jobCity: datas.jobCity,
                    jobSalary: datas.jobSalary,
                    jobRequirement: datas.jobRequirement,
                    jobType: datas.jobType,
                    jobApplyEnd: datas.jobApplyEnd,
                    jobCategory: datas.jobCategory,
                    jobSubCategory: datas.jobSubCategory
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
    getuser()
},[]);
   
// ----Update Job-----------
const updateJob =async(event)=>{
    event.preventDefault();
    setErr({title: "",message:"Loading..",style:"text-primary"})
    // console.log(inputs)
        try {
            const res = await axios.post(`${API_URL}/job/update`,inputs,{headers:header})
             if(res.data.error === false){
                setErr({message:res.data.message,style:'text-success'})
                window.location.reload()
            }else{
                setErr({message:res.data.message,style:'text-danger'})
            }
        } catch (error) {        
        }
}

// ----Remove Job-----------
const removeJob =async(event)=>{
    event.preventDefault();
    const formData = {authid:profile_1.job_id,_id:param.id}
    setErr({title: "",message:"Loading..",style:"text-primary"})
    try {
        const res = await axios.post(`${API_URL}/job/removeJob`,formData,{headers:header})
            if(res.data.error === false){
                setErr({message:res.data.message,style:'text-success'})
                history.push('/employers/dashboard/jobs')
            }else{
                setErr({message:res.data.message,style:'text-danger'})
            }
    } catch (error) {        
    }
}

const changeCate =(e)=>{
    const cate = e.target.value
    setInputs({...inputs,jobCategory:cate})
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


    return(<>
   <div className="container-flex m-2 p-2">
        <div className="row">
            <div className="col-md-12 col-lg-12 col-md-12">
                <div>
                    <div className="section row">
                        <div className="col-md-10 col-sm">
                            <label>Job Title</label>
                            <div className=" form-group">
                                <input type="text" className="form-control text-capitalize" placeholder="Job Position Title" name="jobTitle" 
                                    value={inputs.jobTitle} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-5">
                            <label>Category</label>
                            <div className="form-group">
                                <div className="form-group">
                                    <select type="text" className="form-control text-capitalize" placeholder="Category" name="jobCategory" 
                                        onChange={(e)=>changeCate(e)}>
                                            <option value={inputs.jobCategory}>{inputs.jobCategory}</option>
                                            {category.map((name,i)=>(<option key={i} value={name}>{name}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-5">
                            <label>Sub Category</label>
                            <div className="form-group">
                                <div className="form-group">
                                    <select type="text" className="form-control text-capitalize" placeholder="Category" name="jobSubCategory" onChange={changeHandle}>
                                        {!cat ? <option value={inputs.jobSubCategory}>{inputs.jobSubCategory}</option>:cat.map((name,i)=>(<option key={i} value={name}>{name}</option>))}    
                                    </select>
                                    <p><small className='ml-2 text-muted'>{inputs.jobSubCategory}</small></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm">
                            <label>Job Description</label>
                            <div className="form-group">
                                <textarea type="text" className="form-control" placeholder="Write few lines about the Job Discription"name="jobDescription" 
                                    value={inputs.jobDescription} onChange={changeHandle}/>
                            </div>
                        </div>

                        <div className="col-md-10 col-sm">
                            <label>Job Location</label>
                            <div className="form-group">
                                <div className="form-group">
                                    <input type="text" className="form-control text-capitalize" placeholder="Job Location" name="jobCity" 
                                        value={inputs.jobCity} onChange={changeHandle} list='city'/>
                                        <datalist id ='city'>
                                            {Array.from(new Set(cities.map(item=>item.name))).map((name,i)=>(<option key={i} value={name}>{name}</option>))}
                                        </datalist>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm">
                            <label>Salary Information</label>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Salary Info" name="jobSalary" 
                                    value={inputs.jobSalary} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm">
                            <label>Job Requirement</label>
                            <div className="form-group">
                                <textarea type="text" className="form-control" placeholder="Write few lines about the Job Requirement"name="jobRequirement" 
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
                                <input className="form-control selector border" type="text" placeholder="Select a Level" list="level"
                                name="jobType" value={inputs.jobType} onChange={changeHandle}/>
                                <datalist id = "level">
                                    <option>Entry Level</option>
                                    <option>Mid Level</option>
                                    <option>Mid-Senior Level</option>
                                    <option>Top Level</option>
                                </datalist>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section p-2">
                    <div className='row'>
                        <label className={errs.style}>{errs.message}</label>
                    </div>
                    <div className="buttons row">
                        <button onClick={updateJob} className="btn btn-findJob m-3">Update Job</button>
                        <button onClick={removeJob} className="btn btn-outline-danger m-3">Remove Job</button>
                        <a className="btn btn-upload m-2" type="button"  href="/employers/dashboard/jobs" >Back to Posted Jobs</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)

}
export default EditJob