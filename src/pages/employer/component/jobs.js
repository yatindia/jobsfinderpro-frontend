import React,{useEffect,useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';

import { API_URL,WEB_URL } from "../../../components/utils";

function Jobs(){

    const [jobData, setJobData] = useState('');
    const [jobId, setJobId] = useState('');

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'))

    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
	const formData = {authid:profile_1.job_id}

    useEffect(() => {
            const getuser= async()=>{
                try {
                    const res = await axios.post(`${API_URL}/job/getjobs`,formData,{headers:header})
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

useEffect(()=>{
},[jobId])

    const copyLink =value=>async()=>{
        await navigator.clipboard.writeText(`${WEB_URL}/job/view/${value}`);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Link is copied to clipboard, Share Now!',
            showConfirmButton: false,
            timer: 1500
        })
    }



    return (<>
          <div className="container-flex">
              {jobData.length>0 ?(
              <div>
             {jobData.map((data,id)=>(
            <div className="row d-flex justify-content-center m-3 p-2" key={id}>
                <div className="col-md-12 mt-2  border">
                    <div className="row z-depth-3">
                        <div className="col-sm-3 bg-info rounded-left">
                            <div className="card-block text-center text-white">
                                <img className="mt-2 img-fluid imglogo" src={`${API_URL}/profile/profileImages/${profile_2.orgLogo}`}  alt="sample"></img>
                                <h5 className="font-weight-bold mt-2">{profile_2.orgName}</h5>
                            </div>
                        </div>
                        <div className="col-sm bg-white rounded-right">
                            <div className='row d-inline d-flex p-3'>
                                <h5 className="text-left">{data.jobTitle}</h5> 
                                <div className='ml-auto float-right mr-5'>
                                    <button className="btn floatBtn" onClick={copyLink(data._id)}> 
                                        <i className="fa fa-share my-float"></i>
                                    </button>
                                    <span className="tooltiptext">Copy Link</span>
                                </div>               
                            </div>
                            <div className="row border-top p-1">
                                <div className="col-sm">
                                    <p className="font-weight-bold">Location</p>
                                    <h6 className="text-muted">{data.jobCity}</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Deadline</p>
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
                            </div>
                            <hr className="bg-primary"/>
                            <div className="row">
                                <div className="col-md d-flex">
                                    <label>Category: <b className="text-muted"> {data.jobCategory}</b></label>
                                </div>
                                <div className="col-md">
                                    <label>Sub Category: <b className="text-muted"> {data.jobSubCategory}</b></label>
                                </div>
                            </div>
                             <div className="row border-top">
                                 <div className="col-sm">
                                 <p className="m-auto pt-3">Posted on: <i>{data.dateOfAdd.split('T')[0]}</i></p>
                                 </div>
                                <div className="col-sm text-right pt-2">
                                    <a className="btn btn-findJob mr-2" href={`/employers/dashboard/jobs/${data._id}`}>Edit</a>
                                    <a className="btn btn-findJob" href={`/employers/dashboard/jobs/applied/${data._id}`}>Applicants</a>
                                </div>
                            </div>
                            <hr className="bg-primary"/>
                           {/* <div className="row">
                                <div className="col-md">
                                    <p className="font-weight-bold">Job Requirement</p>
                                    <h6 className="text-muted " maxLength='50'>{data.jobRequirement}</h6>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
             ))}  
             </div>):<div><h4 className="text-info text-center mt-5">Job not Posted Yet </h4>
             <h4 className="text-info text-center"><a className="btnPost" href='/employers/dashboard/newjobs'>Post a Job</a></h4></div>}
        </div>
   </> )
}

export default Jobs