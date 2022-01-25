import React from 'react'
import Swal from 'sweetalert2';
import {Modal, Button} from 'react-bootstrap';
import '../style.css'
import { WEB_URL } from '../../components/utils';

// import ApplyBtn from './applyBtn';

const ViewJob = ({show, data,  dialogClose}) => {


    const job = data.job
    const org = data.org

    const copyLink =async()=>{
        await navigator.clipboard.writeText(`${WEB_URL}/guest/view/${job._id}`);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Link is copied to clipboard, Share Now!',
            showConfirmButton: false,
            timer: 1500
          })
    }

    if(!show){
        return <> </>
    }
    else {
    return(
        <div className="container">
           <Modal show={show} onHide={dialogClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center h5">{org.orgName} Recruiting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="col">
                    <div className="form-group row"> 
                        <div className='col text-center'>
                        <p>Requirement For: <b className='text-muted'>{job.jobTitle}</b></p>
                        </div>
                        <div className='ml-auto float-right mr-5'>
                        <button className="btn floatBtn" onClick={copyLink}>
                            <i className="fa fa-share my-float"></i>
                        </button>
                        <span className="tooltiptext">Copy Link</span>
                        </div>
                    </div>   
                    <div className="form-group row border p-2 m-1">
                        <div className="col border-right">
                            <div className=" ">
                                <p>Location:<i className="text-info">    {job.jobCity}</i></p>
                                <p>Level:<i className="text-info">   {job.jobType}</i></p>
                                <p>Dead Line: <i className="text-info">  {job.jobApplyEnd}</i></p>
                                <p>Salary: <i className="text-info">{    `₹ ${job.jobSalary}`}</i></p>
                                <p>Category: <i className="text-info">{job.jobCategory} , {job.jobSubCategory}</i></p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="">
                                {/* <p> <i className="fa fa-map-marker text-primary fa-lg"></i> {org.orgAddress}, {org.orgCountry}</p>
                                <p><i className="fa fa-phone text-success fa-lg"></i> {org.orgPhone}</p>
                                <p><i className="fa fa-link text-info fa-lg"></i> {org.orgWebsite}</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Job Description</label>
                            <textarea type="text"  rows="8"
                            value={job.jobDescription} className="form-control border-0 bg-light" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Skill Requirement</label>
                            <textarea type="text" rows="4"
                            value={job.jobRequirement} className="form-control bg-light border-0"  readOnly/>
                        </div>
                    </div>
                    <small className="text-right m-auto"><b>Posted On: </b>{job.dateOfAdd.split("T")[0]}</small>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {/* <ApplyBtn job={data.job}></ApplyBtn> */}
                <Button variant="danger" onClick={dialogClose}>Close</Button> 
            </Modal.Footer>
        </Modal>
        </div>
    ) }

}
export default ViewJob
