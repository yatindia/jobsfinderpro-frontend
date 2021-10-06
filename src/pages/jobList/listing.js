import React from "react"

import ApplyBtn from '../../components/applyBtn'


export default function Listing({data}){

    return(
        <div className="row d-flex justify-content-center" key={data._id}>
        <div className="col-md-10 mt-2  border">
            <div className="row z-depth-3">
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
                        <div className="">
                            <ApplyBtn job={data}></ApplyBtn>
                        </div>
                    </div>
                    <hr className="bg-primary"/>
                </div>
            </div>
        </div>  
    </div>
    )
}