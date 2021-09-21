import React,{useEffect, useState} from 'react'
import {Modal, Form, Row, Col} from 'react-bootstrap';
import axios from 'axios';

import DynamicInput from '../../../components/dynamicInputs';
import { API_URL,formValid } from '../../../components/utils';


const Registration = ({show, title, dialogClose}) => {

    const userProfile = JSON.parse(localStorage.getItem( 'userDetails'));
    const [edu, setEdu] =useState([])
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        token:`<Bearer> ${userProfile.Auth_token}`,
        email: userProfile.job_email,
        type:"seeker",
        mobile: "",
        dateOfBirth:"",
        jobTitle:"",
        gender: "",
        qualifications: "",
        state :"",
        city: "",
      })
    const [errs,setErr] = useState({
        title: "",
        message: "",
        style:""
      })


    const changeHandle = e => {
        setInputs({...inputs,[e.target.name]: e.target.value})
      }

const updateProfile=async(event)=>{
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
      setValidated(true); 
      const checking = formValid(inputs)
      if(checking.valid===true){
        //console.log(inputs)
        try {
            setErr({message:'Loading..',style:'text-primary'})
            const res = await axios.post(API_URL+"/account/signupcomplete",inputs)
            setErr({message:res.data.message,style:'text-info'})
            if(res.data.error===false){
                addToLocalStorageObject('userDetails','Profile','True')
            }
            window.location.reload()
            //console.log(res)
          } catch (ex) {
            // setErr({message:ex,style:'text-warning'})
            console.log(ex)
          }
      }
      else{
        setErr({message:checking.error,style:'text-danger'})
      }
}

var addToLocalStorageObject = function (name, key, value) {
	var existing = localStorage.getItem(name);
	existing = existing ? JSON.parse(existing) : {};
	existing[key] = value;
	localStorage.setItem(name, JSON.stringify(existing));

};


useEffect(()=>{
    setInputs({...inputs,qualifications:edu})
},[inputs,edu])

    if(!show){
        return <> </>
    }
    else {
    return(<>
            <Modal show={show} onHide={dialogClose} className="justify-content-center">
                <Modal.Header closeButton> {title} </Modal.Header>
                    <Modal.Body>
                    <div className="">
                        <Form className=" border-bottom p-3" noValidate validated={validated} onSubmit={updateProfile}> 
                            <Row>
                                <Form.Group as={Col} md="6"  controlId="validationCustom01" className="formField">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" defaultValue={userProfile.job_fname} name="firstName"
                                         onChange={changeHandle} readOnly/>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom02" className="formField">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" defaultValue={userProfile.job_lname} name="lastName"
                                         onChange={changeHandle} readOnly/>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom03" className="formField">
                                    <label>Email</label>
                                    <input type="text" className="form-control" defaultValue={userProfile.job_email} name="email"
                                         onChange={changeHandle} readOnly/>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom04" className="formField">
                                    <label>Phone number</label> 
                                    <input type="text" className="form-control" placeholder="Phone Number" name="mobile"
                                        value={inputs.mobile} onChange={changeHandle} required/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6"  controlId="validationCustom05" className="formField">
                                    <label>Jobs</label> 
                                    <input type="text" className="form-control" placeholder="Your Current Job" name="jobTitle"
                                        value={inputs.jobTitle} onChange={changeHandle} required/>
                                </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group as={Col} md="8"  controlId="validationCustom06" className="formField">
                                    <label>Qualifications</label>
                                    {/* <textarea type="text" className="form-control" placeholder="Your Current State" name="qualifications"
                                        value={inputs.qualifications} onChange={changeHandle} required/>  */}
                                    <div className="">
                                        <DynamicInput get={setEdu}></DynamicInput>
                                         {/* <p> {(JSON.stringify(edu))}</p>  */}
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6"  controlId="validationCustom08" className="formField">
                                    <label>State</label> 
                                    <input type="text" className="form-control" placeholder="Your Current State" name="state"
                                        value={inputs.state} onChange={changeHandle} required/>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom09" className="formField">
                                    <label>City</label> 
                                    <input type="text" className="form-control" placeholder="Your Current City" name="city"
                                        value={inputs.city} onChange={changeHandle} required/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6"  controlId="validationCustom07" className="formField">
                                    <label>Gender</label>
                                    <div className="input-group">
                                        <input className="form-control" type="text" name ="gender" placeholder="Select.." 
                                        list="gender" onChange={changeHandle} value={inputs.gender} required/>
                                        <datalist id = "gender">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Transgender</option>
                                        </datalist>
                                    </div>
                                </Form.Group>
                                 <Form.Group as={Col} md="6"  controlId="validationCustom08" className="formField">
                                    <label>Date of Birth</label>
                                    <input type="date" name="dateOfBirth" className="form-control" placeholder="dd-mm-yyyy" 
                                       value={inputs.dateOfBirth} onChange={changeHandle} min="1980-01-01" required/>
                                </Form.Group>
                            </Row>
                            <Row>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6"  className="formField">
                                    <p className="form-group text-primary">Kiran resume.pdf</p>
                                    <div className=" form-group"> Select Resume
                                        <input type="file" className="form-control " accept="application/pdf" />
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row>
                                <span className={errs.style}>{errs.message}</span>
                            </Row>
                            <div>
                                <button className="btn btn-findJob m-2" type="submit">Save Profile</button>
                            </div>
                        </Form>
                    </div>
                         
                    </Modal.Body>
            </Modal>
    </>) }

}
export default Registration