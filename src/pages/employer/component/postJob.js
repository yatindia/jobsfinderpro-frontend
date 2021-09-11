import React, { useEffect, useState } from "react";
import category from '../../../components/asserts/category.json'


const PostJobs =()=> {

const [cate, setCat] = useState(true);
const [inputs, setInputs] = useState({
    jobName: "",
    jobLoc: "",
    jobSal: "",
    })


const categoryChange =(e)=>{
if(e==='Select..' || e ===''){
    setCat('')
}else{
    try {
        let subData = require('../../../components/asserts/subCategory/'+e+'.json');
        setCat(subData)
    } catch (error) {
        setCat('')
        console.log(error)
    }
}
}

const changeHandle = e => {
    setInputs({...inputs,[e.target.name]: e.target.value})
  }

  useEffect(()=>{
  })

    return (<>
      <div className="container-fluid">
      <div className=" page-content">
        <div className="container">
        <div className="row">
            <div className="col-md-12 col-lg-12 col-md-12">
                <div>
                    <div className="section row">
                        <div className="col-md-10 col-sm">
                            <label>Job Title</label>
                            <div className=" form-group">
                                <input type="text" className="form-control" placeholder="Human Resource Manager" name="jobName" 
                                    value={inputs.jobName} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm">
                                <label>Category</label>
                            <div className="form-group">
                                <select className="form-control selector border" onChange={(e) => categoryChange(e.target.value)} placeholder="Select..">
                                <option>Select..</option>
                                    {category.map((items,i)=>(<option key={i} value={items}> {items}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm">
                            <div className="form-group">
                                <label>Sub Category</label>
                                <div className="app_dropdown">
                                {cate.length > 0 ? (
                                    <select className="form-control selector border">
                                        {cate.map((items,i)=>(<option key={i} value={items}> {items}</option>))}
                                    </select>):<select className="form-control selector border"><option>Select..</option></select>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm">
                            <label>Job Location</label>
                            <div className="form-group">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Location" name="jobLoc" 
                                        value={inputs.jobLoc} onChange={changeHandle}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm">
                            <label>Salary Information</label>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="50000$" name="jobSal" 
                                    value={inputs.jobSal} onChange={changeHandle}/>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm">
                            <label>Application Deadline</label>
                            <div className="form-group">
                                <div className="calendar">
                                <input type="date" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm">
                            <label>Exprience Level</label>
                            <div className="input-group">
                                <input className="form-control selector border" type="text" placeholder="Select a Level" list="level"/>
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

                <div className="section mt-3">
                    <div className="row">
                        <div className="col-sm-3 ">
                        <label>Skills Required</label>
                        </div>
                        <div className="col-sm-6 form-group ">
                            <textarea type="text" className="form-control" placeholder="Write about the Skill requirements"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 col-md">
                        <label>Job Summary</label>
                        </div>
                        <div className="col-sm-9 form-group">
                            <textarea type="text" className="form-control" placeholder="Write few lines about the Job"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 col-md">
                        <label>Job Discription:</label>
                        </div>
                        <div className="col-sm-9 form-group">
                            <textarea type="text" className="form-control" placeholder="Write few lines about the Job Responsibilities"/>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <label>
                        <input className="formFieldCheckbox" type="checkbox" name="hasAgreed"/>{"  "}
                            You agree to our <a href="none">Terms of Use</a> and <a href="none">Privacy Policy</a> and acknowledge that you are the rightful owner of this item and using Trade to find a genuine buyer.
                    </label>
                    <div className="buttons">
                        <a href="none" className="btn btn-findJob mr-3">Post Job</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    </>);
  }

export default PostJobs;
