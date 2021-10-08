import React,{useEffect,useState} from "react";
import axios from "axios";

import { API_URL } from "../../../components/utils";

function Jobs(){

    const [jobData, setJobData] = useState();

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'))

    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
	const formData = {authid:profile_1.job_id}

    useEffect(() => {
            const getuser= async()=>{
                try {
                    const res = await axios.post(`${API_URL}/job/getjobs`,formData,{headers:header})
                    console.log(res)
                    if(res.data.error === false){
                        //console.log(res)
                        setJobData(res.data.data)
                    }
                    else{
                        return <></>
                    }
                } catch (error) {
                    console.log(error)
                }
        
            }
            getuser()
      },[]);



    return (<>
          <div className="container-flex">
              {jobData ?(
              <div>
             {jobData.map((data,id)=>(
            <div className="row d-flex justify-content-center m-3 p-2" key={id}>
                <div className="col-md-11 mt-2  border">
                    <div className="row z-depth-3">
                        <div className="col-sm-3 bg-info rounded-left">
                            <div className="card-block text-center text-white">
                                <img className="mt-2 img-fluid imglogo" src={`${API_URL}/profile/profileImages/${profile_2.orgLogo}`}  alt="sample"></img>
                                <h2 className="font-weight-bold mt-2">{profile_2.orgName}</h2>
                                <p>{data.dateOfAdd}</p>
                                <i className="far-fa-edit fa-2x mb-2"></i>
                            </div>
                        </div>
                        <div className="col-sm-9 bg-white rounded-right">
                            <h3 className="mt-3 text-start">{data.jobTitle}</h3>
                            <div className="row">
                                <div className="col-sm">
                                    <p className="font-weight-bold">Location</p>
                                    <h6 className="text-muted">{data.jobCity}</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Deadline On</p>
                                    <h6 className="text-muted">{data.jobApplyEnd}</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Job Level</p>
                                    <h6 className="text-muted">{data.jobType}</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Salary</p>
                                    <h6 className="text-muted">₹ {data.jobSalary}</h6>
                                </div>
                                <div className="col-sm">
                                    <a className="btn btn-findJob" href={`/employers/dashboard/jobs/${data._id}`}>Edit Jobs</a>
                                </div>
                                <div className="col-sm">
                                    <a className="btn btn-findJob" href={`/employers/dashboard/jobs/applied/${data._id}`}>Applicants</a>
                                </div>
                            </div>
                            <hr className="bg-primary"/>
                            <div className="row">
                                <div className="col-md">
                                    <p className="font-weight-bold">Job Description</p>
                                    <h6 className="text-muted" maxLength='50'>{data.jobDescription}</h6>
                                </div>
                            </div>
                            <hr className="bg-primary"/>
                            <div className="row">
                                <div className="col-md">
                                    <p className="font-weight-bold">Job Requirement</p>
                                    <h6 className="text-muted " maxLength='50'>{data.jobRequirement}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             ))}  
             </div>):<label>Loading..</label>}
        </div>
   </> )
}

export default Jobs