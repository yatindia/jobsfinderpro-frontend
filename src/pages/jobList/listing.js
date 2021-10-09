import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"

import ApplyBtn from "./applyBtn"
import ViewJob from "./viewJob";


export default function Listing({data}){

    const [dialogShow, setDialogShow] = useState(false);


    const dialogClose=()=>{
        setDialogShow(false)
      }

    const viewjob=()=>{
        setDialogShow(true) 
     }

    return(<>
            <div className="row z-depth-3 border p-3 m-3" key={data._id}>
                <div className="col-md bg-white rounded-right">
                    <h3 className="m-3 text-start">{data.jobTitle}</h3>
                    <div className="row m-2">
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
                        <div className="col">
                            <ApplyBtn job={data}></ApplyBtn>
                            <button type="button" className="btn btn-findJob m-2" onClick={viewjob}> View</button>
                            {dialogShow === true? <ViewJob show={dialogShow} data={data} dialogClose={dialogClose}/> :''}
                        </div>
                    </div>
                    <hr className="bg-primary"/>
                </div>
            </div>
    </>)
}