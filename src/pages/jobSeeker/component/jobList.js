import React, { useState} from "react"
import axios from "axios";

import ViewJob from "../../jobList/viewJob";
import { API_URL } from "../../../components/utils";


export default function JobList({data}){

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

     const [dialogShow, setDialogShow] = useState(false);

    const dialogClose=()=>{
        setDialogShow(false)
      }

    const viewjob=()=>{
        setDialogShow(true) 
     }

     const unapply = async(e)=>{
        const getid = e.target.value
        const formData = {seekerid:profile_1.job_id,jobid:getid}
        try {
          const res = await axios.post(`${API_URL}/job/unapply`,formData,{headers:header})
          if (res.data.error === false){
            window.location.reload()
          }
        } catch (error) {
          console.log(error)
        }
      }

    return(<>
            <div className="row z-depth-3 p-2 m-2 border">
                <div className="col-sm-3 bg-info rounded-left">
                    <div className="card-block text-center text-white mt-3">
                        <img className="mt-2 img-fluid imglogo" src={`${API_URL}/profile/profileImages/${data.org.orgLogo}`} alt="sample"></img>
                        {/* <h2 className="font-weight-bold mt-2"></h2> */}
                        <p>Posted On:</p>
                        <p>{data.job.dateOfAdd.split('T')[0]}</p>
                        <i className="far-fa-edit fa-2x mb-2"></i>
                    </div>
                </div>
                <div className="col-md bg-white rounded-right" key={data.job._id}>
                <h5 className="mt-3 text-start">{data.org.orgName}</h5>
                <div className='row'>
                    <p className="col mt-3 text-muted">Job Position:  <b>{data.job.jobTitle}</b></p>
                    <p className="col mt-3 text-muted">Category:  <b>{data.job.jobCategory}</b></p>
                </div>
                <div className="row border-top ">
                    <div className="col-sm">
                        <p className="font-weight-bold">Location</p>
                        <h6 className="text-muted">{data.job.jobCity}</h6>
                    </div>
                    <div className="col-sm">
                        <p className="font-weight-bold">End Date</p>
                        <h6 className="text-muted">{data.job.jobApplyEnd}</h6>
                    </div>
                    <div className="col-sm">
                        <p className="font-weight-bold">Contract type</p>
                        <h6 className="text-muted">{data.job.jobType}</h6>
                    </div>
                    <div className="col-lg">
                    <button className="btn btn-outline-danger" value={data.job._id} onClick={(e)=>unapply(e)}> Remove</button>
                    <button type="button" className="btn btn-findJob m-2" value={data.job._id} onClick={viewjob}> View</button>
                    {dialogShow === true? <ViewJob show={dialogShow} data={data}  dialogClose={dialogClose}/> :''}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

                        