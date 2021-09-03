import React,{useState} from "react";
import { Form,Col,Row,Button} from "react-bootstrap";
import axios from 'axios'

import { API_URL } from "../../components/utils";
import TabView from "../../components/tabView";
import { validating } from "./validating";
import DialogBox from '../../components/dialogBox'

export default function Register() {
  const [validated, setValidated] = useState(false);
  const [dialogShow, setDialogShow] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    password: "",
    cpassword: "",
    email: "",
    type:'seeker'
  })
  const [employer, setEmployer] = useState({
    firstName: "",
    lastName: "",
    password: "",
    cpassword: "",
    email: "",
    type:'employer'
  })

  const changeHandle = e => {
    setInputs({...inputs,[e.target.name]: e.target.value})
    setEmployer({...employer,[e.target.name]: e.target.value})
  }

  const dialogClose=()=>{ setDialogShow(false)}

  // ----- Job Seeker Login ----
  const seekerSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
      setValidated(true);  
      const erro = validating(inputs)
      if(erro.valid===true){
        document.getElementById("err_message").innerText = ""
        try {
          const res = await axios.post(API_URL+"/account/signup",inputs)
          console.log(res);
          if(res.data.error===false){
            setDialogShow(true)
          }else{
            document.getElementById("err_message").innerText = res.data.Message._message
          }
        } catch (ex) {
          console.log(ex);
        }
      }else{
        document.getElementById("err_message").innerText = erro.error
      }
  };

   // ----- Employer Login ----
  const employerSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
      setValidated(true);  
      const erro = validating(employer)
      if(erro.valid===true){
        document.getElementById("err_message").innerText = ""
        try {
          const res = await axios.post(API_URL+"/account/signup",employer)
          console.log(res);
          if(res.data.error===false){
            setDialogShow(true)
          }else{
            document.getElementById("err_message").innerText = res.data.Message._message
          }
        } catch (ex) {
          console.log(ex);
        }
      }else{
        document.getElementById("err_message").innerText = erro.error
      }
  };


  return (<>
    <div className="App d-flex">
      <div className="appForm mx-auto align-center">
      <DialogBox show={dialogShow} title="Sign-Up Success" 
        detail= "Verify your E-mail before Login.. " dialogClose={dialogClose} button="success"/>
        <TabView>
          <div label="Job Seeker">
              <Form noValidate validated={validated} onSubmit={seekerSubmit}>
              <Row className="mb-3 formCenter" >
                <Form.Group as={Col} md="6"  controlId="validationCustom01" className="formField">
                  <Form.Label className="formFieldLabel">First name</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="text" placeholder="First name" 
                    name="firstName" value={inputs.firstName} onChange={changeHandle}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6"  controlId="validationCustom02" className="formField">
                  <Form.Label className="formFieldLabel">Last name</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="text" placeholder="Last name"
                    name="lastName" value={inputs.lastName} onChange={changeHandle}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3 formCenter" >
                <Form.Group as={Col} md="6"  controlId="validationCustom03" className="formField">
                  <Form.Label className="formFieldLabel">Password</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="password" placeholder="Password"
                    name="password" value={inputs.password} onChange={changeHandle}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6"  controlId="validationCustom04" className="formField">
                  <Form.Label className="formFieldLabel">Confirm Password</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="password" placeholder="Confirm Password"
                    name="cpassword" value={inputs.cpassword} onChange={changeHandle}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3 formCenter" >
                <Form.Group as={Col} md="6" controlId="validationCustom05" className="formField">
                  <Form.Label className="formFieldLabel">Email</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="email" placeholder="E-mail"
                    name="email" value={inputs.email} onChange={changeHandle}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3 formField">
                <Form.Label className="text-danger"
                  required
                  id ="err_message"
                />
                <Form.Label className="text-success"
                  required
                  id ="message"
                />
              </Form.Group>

              {/* <Form.Group className="mb-3 formField">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                />
              </Form.Group> */}
              <Row>
                <Col md="6"><Button className="btn formFieldButton effect" type="submit">Sign-Up</Button></Col>
                <Col md="6"><Form.Label className="links m-3">Already Registered <a href="/login">Sign-In</a></Form.Label></Col>
              </Row>
            </Form>
          </div>


          <div label="Employer">
          <Form noValidate validated={validated} onSubmit={employerSubmit}>
              <Row className="mb-3 formCenter" >
                <Form.Group as={Col} md="6" controlId="validationCustom01" className="formField">
                  <Form.Label className="formFieldLabel">First name</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="text" placeholder="First name" 
                    name="firstName" value={employer.firstName} onChange={changeHandle}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02" className="formField">
                  <Form.Label className="formFieldLabel">Last name</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="text" placeholder="Last name"
                    name="lastName" value={employer.lastName} onChange={changeHandle}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3 formCenter" >
                <Form.Group as={Col} md="6" controlId="validationCustom03" className="formField">
                  <Form.Label className="formFieldLabel">Password</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="password" placeholder="Password"
                    name="password" value={employer.password} onChange={changeHandle}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04" className="formField">
                  <Form.Label className="formFieldLabel">Confirm Password</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="password" placeholder="Confirm Password"
                    name="cpassword" value={employer.cpassword} onChange={changeHandle}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3 formCenter" >
                <Form.Group as={Col} md="6" controlId="validationCustom05" className="formField">
                  <Form.Label className="formFieldLabel">Email</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="email" placeholder="E-mail"
                    name="email" value={employer.email} onChange={changeHandle}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3 formField">
                <Form.Label className="text-danger"
                  required
                  id ="err_message"
                />
                <Form.Label className="text-success"
                  required
                  id ="message"
                />
              </Form.Group>
            
              {/* <Form.Group className="mb-3 formField">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                />
              </Form.Group> */}
              <Row>
                <Col><Button className="btn formFieldButton effect" type="submit">Sign-Up</Button></Col>
                <Col><Form.Label className="links m-3">Already Registered <a href="/login">Sign-In</a></Form.Label></Col>
              </Row>
            </Form>

          </div>
        </TabView>
      </div>
    </div>
 </> );
}