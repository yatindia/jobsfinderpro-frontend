import React, { useState,useEffect } from "react"
import axios from "axios";

import ApplyBtn from "./applyBtn"
import ViewJob from "./viewJob";
import { API_URL } from "../../components/utils";


export default function Listing({data}){

    const [dialogShow, setDialogShow] = useState(false);
    const [fetch, setfetch] = useState({job:{},org:{}})

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    useEffect(()=>{
        const getjob =async ()=>{
            const  res = await axios.post(`${API_URL}/job/searchone`,{jobid:data._id},{headers:header})
            if (res.data.error===false){
                setfetch({
                    job:res.data.data.job,
                    org:res.data.data.org
                })
            }
        }
      getjob()
    },[data._id])


    const dialogClose=()=>{
        setDialogShow(false)
      }

    const viewjob=()=>{
        setDialogShow(true) 
     }

    return(<>
            <div className="row z-depth-3 border p-3 " key={data._id}>
                <div className="col-sm-3 bg-info rounded-left">
                    <div className="text-center text-white align-items-center mt-3">
                        <img className="mt-2 img-fluid imglogo" src={`${API_URL}/profile/profileImages/${fetch.org.orgLogo}`} alt="sample"></img>
                        {/* <h2 className="font-weight-bold mt-2"></h2> */}
                        {fetch.job.dateOfAdd !== undefined ? 
                            <p className="p-2">Posted On: <b>{fetch.job.dateOfAdd.split('T')[0]}</b></p>
                                :<p>Posted On</p>}
                        <i className="far-fa-edit fa-2x mb-2"></i>
                    </div>
                </div>
                <div className="col-md bg-white rounded-right">
                        <h5 className="mt-3 text-start">{fetch.org.orgName}</h5>
                        <p className="mt-3 text-muted">Job Position:  <b>{fetch.job.jobTitle}</b></p>
                        <div className='row mb-2'>
                            <div className="col">
                                <h6 className="text-muted">{data.jobCategory} / {data.jobSubCategory}</h6>
                            </div>
                        </div>
                        <div className="row border-top p-2">
                            <div className="col-sm">
                                <p className="font-weight-bold">Location</p>
                                <h6 className="text-muted">{data.jobCity}</h6>
                            </div>
                            <div className="col-md">
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
                            <div className="col-md">
                                <ApplyBtn job={data}></ApplyBtn>
                                <button type="button" className="btn btn-findJob m-2" onClick={viewjob}> View</button>
                                <ViewJob show={dialogShow} data={fetch} dialogClose={dialogClose}/> 
                            </div>
                        </div>
                    <hr className="bg-primary"/>
                </div>
            </div>
    </>)
}