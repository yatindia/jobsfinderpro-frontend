import React from "react"

export default function Listing(data){

    return(
        <div className="row d-flex justify-content-center" key={data.id}>
        <div className="col-md-10 mt-2  border">
            <div className="row z-depth-3">
                <div className="col-md-10 bg-white rounded-right">
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
                            <h6 className="text-muted">{data.jobSalary}</h6>
                        </div>
                        <div className="col-sm">
                            <button className="btn btn-findJob">Apply</button>
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
    )
}