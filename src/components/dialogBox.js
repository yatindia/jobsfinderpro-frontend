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
                        {/* <Button variant={button} className="ml-3 col-sm-3" onClick={dialogClose}>Ok ..</Button>  */}
                    </Modal.Body>
            </Modal>
        </div>
    ) }

}
export default DialogBox
