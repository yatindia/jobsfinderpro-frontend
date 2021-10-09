import React from 'react'
import {Modal, Button} from 'react-bootstrap';

import ApplyBtn from './applyBtn';

const ViewJob = ({show, data,  dialogClose}) => {

    if(!show){
        return <> </>
    }
    else {
    return(
        <div className="container">
           <Modal show={show} onHide={dialogClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">{data.jobTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="col">
                    <div className="form-group row">
                        <div className="col">
                            <label>Job Location</label>
                            <input type="text" 
                            value={data.jobCity} className="form-control border-0" readOnly/>
                        </div>
                        <div className="col">
                            <label>Job Level</label>
                            <input type="text" 
                            value={data.jobType} className="form-control border-0" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Dead Line on</label>
                            <input type="text" 
                            value={data.jobApplyEnd} className="form-control border-0" readOnly/>
                        </div>
                        <div className="col">
                            <label>Salary</label>
                            <input type="text" 
                            value={`₹ ${data.jobSalary}`}className="form-control border-0" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Job Description</label>
                            <input type="text" 
                            value={data.jobDescription} className="form-control border-0" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Job Requirement</label>
                            <input type="text" 
                            value={data.jobRequirement} className="form-control border-0" readOnly/>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <small className="text-center"><b>Posted On: </b>{data.dateOfAdd}</small>
                <ApplyBtn job={data}></ApplyBtn>
                <Button variant="danger" onClick={dialogClose}>Close</Button> 
            </Modal.Footer>
        </Modal>
        </div>
    ) }

}
export default ViewJob
