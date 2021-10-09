import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import jspdf from 'jspdf'


const ViewModal = ({show, data,  dialogClose}) => {


    if(!show){
        return <> </>
    }
    else {

const savepdf=()=>{
    var doc = new jspdf("p","pt","a4");
    doc.html(document.getElementById("pdf"),
    15,
    15, 
    {
      'width': 170
    },
    function(doc,a) 
     {
      doc.save("HTML2PDF.pdf");
    });
    

}

    return(
        <div className="container" >
            <Modal show={show} onHide={dialogClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center h5">Job Seeker Detail View</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="col" id='pdf'>
                        <div className="form-group row">
                            <div className="col">
                                <label>Seeker Name</label>
                                <input type="text" 
                                value={data.part2.firstName} className="form-control border-0" readOnly/>
                            </div>
                            <div className="col">
                                <label>Gender</label>
                                <input type="text" 
                                value={data.part1.gender} className="form-control border-0" readOnly/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <label>E-Mail</label>
                                <input type="password" 
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
                                {data.part1.pastJobs.map(item=>(
                                    <h6 className="text-muted d-flex">{item}</h6>
                                ))}</div>
                            </div>
                            <div className="col">
                                <label >Qualification</label>
                                <div className="border p-2">
                                {data.part1.qualifications.map(item=>(
                                    <h6 className="text-muted d-flex">{item}</h6>
                                ))}</div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={savepdf}>Download</Button> 
                    <Button variant="danger" onClick={dialogClose}>Close</Button> 
                </Modal.Footer>
            </Modal>
        </div>
    ) }

}
export default ViewModal
