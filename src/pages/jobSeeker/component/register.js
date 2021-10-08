import React,{useEffect, useState} from 'react'
import {useHistory } from "react-router-dom";
import {Modal, Form, Row, Col} from 'react-bootstrap';
import axios from 'axios';

import DynamicInput from '../../../components/dynamicInputs';
import { API_URL,formValid } from '../../../components/utils';
import cities from '../../../components/asserts/ind_cities.json'


const Registration = ({show, title, dialogClose}) => {

    // token:`<Bearer> ${userProfile.Auth_token}`,

    const userProfile = JSON.parse(localStorage.getItem( 'userDetails'));
    const [edu, setEdu] =useState([])
    const [pastJob, setpastJob] =useState([])
    const [validated, setValidated] = useState(false);
    const history = useHistory()

    const [inputs, setInputs] = useState({
        email: userProfile.job_email,
        //link_id:userProfile.job_id,
        type:'seeker',
        mobile: "",
        dateOfBirth:"",
        jobTitle:"",
        gender: "",
        pastJob:"",
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
        console.log(inputs)
        try {
             setErr({message:'Loading..',style:'text-primary'})
             const res = await axios.post(API_URL+"/account/signupcomplete",inputs)
             console.log(res)
            setErr({message:res.data.message||res.data.Message,style:'text-info'})
            if(res.data.error===false){
               history.push('/users/dashboard')
               window.location.reload()
            //     addToLocalStorageObject('userDetails','Profile','True')
            }
          } catch (ex) {
            setErr({message:'Network fail',style:'text-warning'})
            console.log(ex)
          }
      }
      else{
        setErr({message:checking.error,style:'text-danger'})
      }
}


useEffect(()=>{
    setInputs({...inputs,qualifications:edu, pastJob:pastJob})
},[inputs,edu,pastJob])

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
                                <Form.Group as={Col} md="6">
                                    <div className="">
                                        <p className="formFieldLabel"><b>Name:</b> {userProfile.job_fname} {userProfile.job_lname}</p>
                                        <p className="formFieldLabel"><b>User E-Mail:</b> {userProfile.job_email} </p>
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="12"  controlId="validationCustom06" className="formField">
                                    <label>Qualifications</label>
                                    <div className="">
                                        <DynamicInput get={setEdu}></DynamicInput>
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="12"  controlId="validationCustom01" className="formField">
                                    <label>Past Jobs</label>
                                    <div className="">
                                        <DynamicInput get={setpastJob}></DynamicInput>
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6"  controlId="validationCustom04" className="formField">
                                    <label>Phone number</label> 
                                    <input type="text" className="form-control formFieldInput" placeholder="Phone Number" name="mobile"
                                        value={inputs.mobile} onChange={changeHandle} required/>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom05" className="formField">
                                    <label>Job Title</label> 
                                    <input type="text" className="form-control text-capitalize formFieldInput" placeholder="Your Current Job" name="jobTitle"
                                        value={inputs.jobTitle} onChange={changeHandle} required/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6"  controlId="validationCustom02" className="formField">
                                    <label>State</label> 
                                    <input type="text" className="form-control text-capitalize formFieldInput" placeholder="Your Current State" name="state"
                                        value={inputs.state} onChange={changeHandle} required list='state'/>
                                        <datalist id ='state'>
                                            {Array.from(new Set(cities.map(item=>item.state))).map((state,i)=>(<option key={i} value={state}>{state}</option>))}
                                        </datalist>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom09" className="formField">
                                    <label>City</label> 
                                    <input type="text" className="form-control text-capitalize formFieldInput" placeholder="Your Current City" name="city"
                                        value={inputs.city} onChange={changeHandle} required list='city'/>
                                        <datalist id ='city'>
                                            {Array.from(new Set(cities.map(item=>item.name))).map((name,i)=>(<option key={i} value={name}>{name}</option>))}
                                        </datalist>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6"  controlId="validationCustom07" className="formField">
                                    <label>Gender</label>
                                    <div className="input-group">
                                        <input className="form-control formFieldInput" type="text" name ="gender" placeholder="Select.." 
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
                                    <input type="date" name="dateOfBirth" className="form-control formFieldInput" placeholder="dd-mm-yyyy" 
                                       value={inputs.dateOfBirth} onChange={changeHandle} min="1980-01-01" required/>
                                </Form.Group>
                            </Row>
                            <Row>
                            </Row>
                            {/* <Row>
                                <Form.Group as={Col} md="6"  className="formField">
                                    <p className="form-group text-primary">Kiran resume.pdf</p>
                                    <div className=" form-group"> Select Resume
                                        <input type="file" className="form-control " accept="application/pdf" />
                                    </div>
                                </Form.Group>
                            </Row> */}
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