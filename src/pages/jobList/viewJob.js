import React from 'react'
import {Modal, Button} from 'react-bootstrap';

import ApplyBtn from './applyBtn';

const ViewJob = ({show, data,  dialogClose}) => {


    const job = data.job
    const org = data.org

    if(!show){
        return <> </>
    }
    else {
    return(
        <div className="container">
           <Modal show={show} onHide={dialogClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center h5">Organization: {org.orgName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="col">
                    <div className="form-group row"> 
                      <div className='col'>
                      <label>Job Position: <b className='text-muted'>{job.jobTitle}</b></label>
                      </div>
                    </div>   
                    <div className="form-group row">
                        <div className="col">
                            <label>Address</label>
                            <div className="p-2 border ml-4">
                                <p>{org.orgAddress}</p>
                                <p>{org.orgCountry}</p>
                            </div>
                        </div>
                        <div className="col">
                            <label>Contact</label>
                            <div className="p-2 border ml-4">
                                <p>{org.orgEmail}</p>
                                <p>{org.orgPhone}</p>
                                <p>{org.orgWebsite}</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Job Location</label>
                            <input type="text" 
                            value={job.jobCity} className="form-control border-0" readOnly/>
                        </div>
                        <div className="col">
                            <label>Job Level</label>
                            <input type="text" 
                            value={job.jobType} className="form-control border-0" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Dead Line on</label>
                            <input type="text" 
                            value={job.jobApplyEnd} className="form-control border-0" readOnly/>
                        </div>
                        <div className="col">
                            <label>Salary</label>
                            <input type="text" 
                            value={`₹ ${job.jobSalary}`}className="form-control border-0" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Job Description</label>
                            <input type="text" 
                            value={job.jobDescription} className="form-control border-0" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Job Requirement</label>
                            <input type="text" 
                            value={job.jobRequirement} className="form-control border-0" readOnly/>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <small className="text-center"><b>Posted On: </b>{job.dateOfAdd}</small>
                <ApplyBtn job={data}></ApplyBtn>
                <Button variant="danger" onClick={dialogClose}>Close</Button> 
            </Modal.Footer>
        </Modal>
        </div>
    ) }

}
export default ViewJob
