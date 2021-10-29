import React from 'react'
import {Modal, Button} from 'react-bootstrap';

import jsPDF from 'jspdf'


export default function ViewModal ({show, data,  dialogClose}){

// const image = `${API_URL}/profile/profileImages/${data.part2.profileImage}`
    function pdfcreate() {    
        var doc = new jsPDF(); 
        doc.setLineWidth(0.1);
        doc.rect(10, 20, 190, 200);
        doc.setLineWidth(0.1);
        doc.line(55, 20, 55, 220)
        doc.text(80, 10, 'Job Seeker Profile Details');        
        doc.text(20, 30, 'Name: ');    
        doc.text(60, 30, `${data.part2.firstName} `); 
        doc.text(100, 30, `${data.part2.lastName}`);   
        doc.text(150, 30, 'Gender:');  
        doc.text(180, 30, `${data.part1.gender}`);  
        doc.text(20, 50, 'Mail Id:');          
        doc.text(60, 50, `${data.part1.email}`);
        doc.text(20, 70, 'Mobile: ');    
        doc.text(60, 70, `${data.part1.mobile}`);  
        doc.text(20, 90, 'Location: ');    
        doc.text(60, 90, document.getElementById("loc").value);   
        doc.text(20, 110, 'Designation: ');    
        doc.text(60, 110, document.getElementById("pos").value);   
        doc.text(20, 130, 'Qualification: ');    
        doc.text(60, 130, `${data.part1.qualifications}`);    
        doc.text(20, 160, 'Previous Jobs: ');    
        doc.text(60, 160, `${data.part1.pastJobs}`);
        doc.text(20, 180, 'D O B: ');    
        doc.text(60, 180, `${data.part1.dateOfBirth}`);   
        doc.save(`${data.part2.firstName}.pdf`); 
     }

const savepdf=()=> {
    pdfcreate()
  };

const resumeDown=()=>{
    alert("gkb")
}

    if(!show){
        return <> </>
    }
    else {

    return(
        <div className="container" >
            <Modal show={show} onHide={dialogClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center h5">Job Seeker Detail View</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="col" id='html'>
                        <div className="form-group row">
                            <div className="col">
                                <label>Seeker Name</label>
                                <input type="text" id="fname"
                                value={data.part2.firstName} className="form-control border-0" readOnly/>
                            </div>
                            <div className="col">
                                <label>Gender</label>
                                <input type="text" id="lname"
                                value={data.part1.gender} className="form-control border-0" readOnly/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <label>Location</label>
                                <input type="text" id="loc"
                                value={`${data.part1.city}, ${data.part1.state}` } className="form-control border-0" readOnly/>
                            </div>
                            <div className="col">
                                <label>Designation</label>
                                <input type="text" id="pos"
                                value={data.part1.jobTitle}className="form-control border-0" readOnly/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <label>Previous Jobs</label>
                                <div className="border p-2">
                                {data.part1.pastJobs.map((item,i)=>(
                                    <h6 key={i} className="text-muted d-flex" id="job">{item}</h6>
                                ))}</div>
                            </div>
                            <div className="col">
                                <label >Qualification</label>
                                <div className="border p-2">
                                {data.part1.qualifications.map((item,i)=>(
                                    <h6 key={i} className="text-muted d-flex" id="qua">{item}</h6>
                                ))}</div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={savepdf} >Get Profile</Button> 
                    <Button variant="info" onClick={resumeDown} >Pick Resume</Button> 
                    <Button variant="danger" onClick={dialogClose}>Close</Button> 
                </Modal.Footer>
            </Modal>
        </div>
    ) }

}

