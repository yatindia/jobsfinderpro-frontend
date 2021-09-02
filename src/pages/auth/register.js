import React,{useState} from "react";
import { Form,Col,Row,Button} from "react-bootstrap";

import TabView from "../../components/tabView";
import { validating } from "./validating";
import DialogBox from '../../components/dialogBox'

export default function Register() {
  const [validated, setValidated] = useState(false);
  const [dialogShow, setDialogShow] = useState(false);
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    password: "",
    cpassword: "",
    email: "",
    mobile: "",
    type:'seeker'
  })
  const [employer, setEmployer] = useState({
    fname: "",
    lname: "",
    password: "",
    cpassword: "",
    email: "",
    mobile: "",
    type:'employer'
  })

  const changeHandle = e => {
    setInputs({...inputs,[e.target.name]: e.target.value})
    setEmployer({...employer,[e.target.name]: e.target.value})
  }

  const seekerSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
      setValidated(true);  
      const erro = validating(inputs)
      if(erro.valid===true){
        document.getElementById("err_message").innerText = ""
        setDialogShow(true)
        console.log(inputs)
      }else{
        document.getElementById("err_message").innerText = erro.error
      }
  };

  const employerSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
      setValidated(true);  
      const erro = validating(employer)
      if(erro.valid===true){
        document.getElementById("err_message").innerText = ""
        setDialogShow(true)
        console.log(employer)
      }else{
        document.getElementById("err_message").innerText = erro.error
      }
  };

  const dialogClose=()=>{
    setDialogShow(false)
  }


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
                    name="fname" value={inputs.fname} onChange={changeHandle}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6"  controlId="validationCustom02" className="formField">
                  <Form.Label className="formFieldLabel">Last name</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="text" placeholder="Last name"
                    name="lname" value={inputs.lname} onChange={changeHandle}
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
                <Form.Group as={Col} md="6" controlId="validationCustom06" className="formField">
                  <Form.Label className="formFieldLabel">Mobile Number</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="tel" placeholder="Mobile with Country code"
                    name="mobile" value={inputs.mobile} onChange={changeHandle}
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
                    name="fname" value={employer.fname} onChange={changeHandle}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02" className="formField">
                  <Form.Label className="formFieldLabel">Last name</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="text" placeholder="Last name"
                    name="lname" value={employer.lname} onChange={changeHandle}
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
                <Form.Group as={Col} md="6" controlId="validationCustom06" className="formField">
                  <Form.Label className="formFieldLabel">Mobile Number</Form.Label>
                  <Form.Control
                    className="formFieldInput " required type="text" placeholder="Mobile with Country code"
                    name="mobile" value={employer.mobile} onChange={changeHandle}
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