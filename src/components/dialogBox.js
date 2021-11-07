import React from 'react'
import {Modal} from 'react-bootstrap';

const DialogBox = ({show, title, detail, dialogClose}) => {

    if(!show){
        return <> </>
    }
    else {
    return(
        <div className="col-sm-4">
            <Modal show={show} onHide={dialogClose}>
                <Modal.Header closeButton> {title} </Modal.Header>
                    <Modal.Body>
                        <div className="col">
                            <p>{detail}</p>
                        </div>
                        
                    </Modal.Body>
                <Modal.Footer>
                    <a  className="btn btn-findJob" href="/login">Login ..</a> 
                    <button  className="btn btn-outline-danger" onClick={dialogClose}>Close</button> 
                </Modal.Footer>
            </Modal>
        </div>
    ) }

}
export default DialogBox
