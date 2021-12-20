import React, {useState, useEffect } from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import { API_URL, formPostJob } from "../../../components/utils";
import cities from '../../../components/asserts/ind_cities.json'
import category from '../../../components/asserts/category.json'

const PostJobs =()=> {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [tags, setTags] =useState([])
    const history = useHistory();

    const [btn,setbtn] = useState(true)
    const [subIn,setSubIn] = useState(false)
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
        jobCategory:'',
        jobSubCategory:''
    })
    const [errs,setErr] = useState({title: "",message: "",style:""})

    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

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
                Swal.fire({
                    icon:"success",
                    title: 'Job Post Success ! ',
                    showDenyButton: true,
                    confirmButtonText: 'Post New Job',
                    denyButtonText: `Cancel`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      window.location.reload()
                    } else if (result.isDenied) {
                        history.push('/employers/dashboard/jobs');
                    }
                  })
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
useEffect(()=>{
    const string = tags.toString()
    setInputs({...inputs,jobRequirement:string})
},[tags])

const changeCate =(e)=>{
    const cate = e.target.value
    setInputs({...inputs,jobCategory:cate})
    if(e==='Select..' || e ===''){
        setcat('')
        setSubIn(false)
    }
    // else if(cate ==='Others'){setSubIn(true)}
    else{
        setSubIn(false)
        try {
            let subData = require('../../../components/asserts/subCategory/'+cate+'.json');
            setcat(subData)
        } catch (error) {
            setcat('')
            console.log(error)
        }
    }
}
const  removeTag = (i) => {
    const newTags = [ ...tags ];
    newTags.splice(i, 1);
    setTags(newTags);
  }

const tagAdd = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags( [...tags, val]);
      document.getElementById('myInput').value = ''
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tags.length - 1);
    }
  }

  const validating = () => {
    // var element = document.getElementById('valid');
    // element.value = element.value.replace(/(\d{6}[a-zA-Z ])/, '');
  }

    return (<>
    <div className="container-flex m-2 p-2 ">
        <div className="row">
            <div className="col-md-12 col-lg-12 col-md-12">
                <div>
                    <div className="section row">
                        <div className="col-md-12 col-lg-12 col-md-12">
                            <label>Job Title</label>
                            <div className=" form-group">
                                <input type="text" className="inputStyle text-capitalize" placeholder="Job Position Title" name="jobTitle" 
                                    value={inputs.jobTitle} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-md-6">
                            <label>Category</label>
                            <div className="form-group">
                                <div className="form-group">
                                    <select type="text" className="inputStyle text-capitalize" placeholder="Category" name="jobCategory" 
                                        onChange={(e)=>changeCate(e)}>
                                            <option value=''>Select Category</option>
                                            {category.map((name,i)=>(<option key={i} value={name}>{name}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-md-6">
                            <label>Sub Category</label>
                            <div className="form-group">
                                <div className="form-group">
                                    {!subIn ?<>
                                    <select type="text" className="inputStyle text-capitalize" placeholder="Category" name="jobSubCategory" id="cat" onChange={changeHandle}>
                                        <option value=''>Select Category</option>
                                        {!cat ? <></>:
                                        cat.map((name,i)=>(<option key={i} value={name}>{name}</option>))}       
                                    </select>
                                    <p><small className='ml-2 text-muted'>{inputs.jobSubCategory}</small></p>
                                    </>:
                                    <input type="text" className="inputStyle" placeholder="Sub-Category" name="jobSubCategory" 
                                    value="Other" onBlur={changeHandle} readOnly/>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-md-6">
                            <label>Salary Information</label>
                            <div className="form-group">
                                <input type="text" className="inputStyle" placeholder="Salary Info" name="jobSalary" 
                                    value={inputs.jobSalary} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-md-6">
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
                        <div className="col-md-6 col-lg-6 col-md-6">
                            <label>Application Deadline</label>
                            <div className="form-group">
                                <div className="calendar">
                                    <input type="date" className="form-control" name="jobApplyEnd" value={inputs.jobApplyEnd} onChange={changeHandle}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-md-6">
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
                        <div className="col-md-12 col-lg-12 col-md-12">
                            <label>Job Description</label>
                            <div className="form-group">
                                <textarea type="text" className="inputStyle" placeholder="Write few lines about the Job Discription"name="jobDescription" 
                                    rows="6" value={inputs.jobDescription} onChange={changeHandle} id="valid" />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-md-12">
                            <label>Skill Requirement <small className="ml-5 text-primary"> Type and Press "Enter" to add Skills</small></label>
                            {/* <div className="form-group">
                                <textarea type="text" className="inputStyle" placeholder="Write few lines about the Job Requirement"name="jobRequirement" 
                                   rows="3" value={inputs.jobRequirement} onChange={changeHandle}/>
                            </div> */}
                                 <div className="input-tag">
                                    <ul className="input-tag__tags">
                                        { tags.map((tag, i) => (
                                            <li key={tag}>
                                            {tag}
                                            <button type="button" onClick={() => {removeTag(i); }}>X</button>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input">
                                            <input type="text" onKeyDown={tagAdd} id="myInput" placeholder='Press "Enter" to add Skills'/>
                                        </li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="section pt-2">
                    <label className='row align-items-center m-auto'>
                        <input className="m-2 formFieldCheckbox" type="checkbox" name="hasAgreed" onClick = {handleCheck}/>{"  "}
                            I agree to your <a href="/terms" className="m-2" target="_blank"> Terms of Use.</a>
                    </label>
                    <div className='row mt-3'>
                        <label className={errs.style}>{errs.message}</label>
                    </div>
                    <div className="buttons row d-flex m-auto ">
                        <button onClick={postJob} className="btn btn-findJob mr-3" disabled={btn}>Post Job</button>
                        <a className="btn-upload m-2" type="button"  href="/employers/dashboard" >Back to Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>);
  }

export default PostJobs;
