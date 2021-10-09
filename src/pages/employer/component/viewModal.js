import React from 'react'
import {Modal, Button} from 'react-bootstrap';

import jsPDF from 'jspdf'


export default function ViewModal ({show, data,  dialogClose}){


    function demoPDF() {    
        var doc = new jsPDF();    
        var pdfjs = document.querySelector('#html');

	doc.html(pdfjs, {
		callback: function(doc) {
			doc.save("output.pdf");
		},
		x: 10,
		y: 10
	}); 
     }

const savepdf=()=> {
    demoPDF()
  };

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
                <div className="col" id="html">
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
                                <label>E-Mail</label>
                                <input type="password" id="email"
                                value={data.part1.email} className="form-control border-0" readOnly/>
                            </div>
                            <div className="col">
                                <label>Mobile</label>
                                <input type="password" 
                                value={data.part1.mobile}className="form-control border-0" readOnly/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <label>Location</label>
                                <input type="text" 
                                value={`${data.part1.city}, ${data.part1.state}` } className="form-control border-0" readOnly/>
                            </div>
                            <div className="col">
                                <label>Designation</label>
                                <input type="text" 
                                value={data.part1.jobTitle}className="form-control border-0" readOnly/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <label>Past Job</label>
                                <div className="border p-2">
                                {data.part1.pastJobs.map((item,i)=>(
                                    <h6 key={i} className="text-muted d-flex">{item}</h6>
                                ))}</div>
                            </div>
                            <div className="col">
                                <label >Qualification</label>
                                <div className="border p-2">
                                {data.part1.qualifications.map((item,i)=>(
                                    <h6 key={i} className="text-muted d-flex">{item}</h6>
                                ))}</div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={savepdf} >Download</Button> 
                    <Button variant="danger" onClick={dialogClose}>Close</Button> 
                </Modal.Footer>
            </Modal>
        </div>
    ) }

}

