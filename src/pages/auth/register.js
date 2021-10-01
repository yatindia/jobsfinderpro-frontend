import React,{useState, useEffect} from "react";
import { Form,Col,Row,Button} from "react-bootstrap";
import axios from 'axios'

import { API_URL,resizeFile,dataURIToBlob } from "../../components/utils";
import TabView from "../../components/tabView";
import { validating } from "./validating";
import DialogBox from '../../components/dialogBox'

export default function Register() {
  const [imgData, setImgData] = useState(null);
  const [imgShow, setImgShow] = useState(null);
  const [imgBtn, setImgBtn] = useState(true);
  const [imgName, setImgName] = useState('');
  const [validated, setValidated] = useState(false);
  const [dialogShow, setDialogShow] = useState(false);
  
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    password: "",
    cpassword: "",
    email: "",
    profileImage:"",
    type:'seeker'
  })
  const [emp, setEmp] = useState({
    firstName: "",
    lastName: "",
    password: "",
    cpassword: "",
    email: "",
    profileImage:"",
    type:'employer'
  })

  const [errs,setErr] = useState({title: "",message: "",style:""})

  const changeHandle = e => {
    setInputs({...inputs,[e.target.name]: e.target.value})
  }

  const dialogClose=()=>{ setDialogShow(false)}

  // ----- Job Seeker Register ----
  const seekerSubmit = async (event) => {
    event.preventDefault();
    setInputs({...inputs,profileImage:imgName})
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
      setValidated(true);  
      const erro = validating(inputs)
      if(erro.valid===true){
        setErr({message:''})
        console.log(inputs)
        try {
          setErr({message:'Loading..',style:'text-primary'})
          const res = await axios.post(API_URL+"/account/signup",inputs)
          console.log(res)
          if(res.data.error===false){
            setErr({title:'Sign-Up Success',message:'Verify your E-mail before Login..',style:'text-success'})
            setDialogShow(true)
          }else{
            setErr({message:res.data.error,style:'text-danger'})
          }
        } catch (ex) {
          setErr({message:'Network Error',style:'text-warning'})
        }
      }else{
        setErr({message:erro.error,style:'text-danger'})
      }
  };

   // ----- Employer Register ----
  const employerSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setEmp({...emp,profileImage:imgName})
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
      setValidated(true);  
      const erro = validating(emp)
      if(erro.valid===true){
        setErr({message:''})
        try {
          setErr({message:'Loading..',style:'text-primary'})
          const res = await axios.post(API_URL+"/account/signup",emp)
          console.log(res);
          if(res.data.error===false){
            setErr({title:'Sign-Up Success',message:'Verify your E-mail before Login..',style:'text-success'})
            setDialogShow(true)
          }else{
            setErr({message:res.data.error,style:'text-danger'})
          }
        } catch (ex) {
          setErr({message:'Network Error',style:'text-warning'})
        }
      }else{
        setErr({message:erro.error,style:'text-danger'})
      }
  };


  // ------- Image upload--------
const userDp = localStorage.getItem('userDp');

const onImageChange=async (e)=>{
	if (e.target.files[0]) {
		const file = e.target.files[0];
		const image = await resizeFile(file);
		const newFile = dataURIToBlob(image);
		setImgShow(image)
		setImgData(newFile)
		localStorage.setItem("userDp",  image);
		setImgBtn(false)
	}
}

const imageUpload= async ()=>{
	let imageData = ''
	if(!userDp){
		imageData = imgData
	}else {
		const newFile = dataURIToBlob(userDp);
		imageData = newFile
	}
	const formData = new FormData();
	formData.append("profile", imageData);
	const config = {
		headers: {
			'content-type': 'multipart/form-data',
		}
	};
	setErr({title:'',message:'Loading..',style:'text-primary'})
	try {
		const res = await axios.post(API_URL+"/account/uploaddp",formData,config)
    setImgName(res.data.fileName)
		setErr({title:'',message:res.data.Message,style:'text-success'})
    setInputs({...inputs,profileImage:imgName})
	  } catch (ex) {
	   // console.log(ex);
    setErr({title:'',message:ex,style:'text-warning'})
	  }
}

useEffect(()=>{
  setInputs({...inputs,profileImage:imgName})
  setEmp({...emp,profileImage:imgName})
},[inputs,emp,imgName])

  return (<>
    <div className="App d-flex">
      <div className="appForm mx-auto align-center">
      <DialogBox show={dialogShow} title={errs.title} detail= {errs.message} dialogClose={dialogClose}/>
        <TabView>
          <div label="Job Seeker">
              <Form noValidate validated={validated} onSubmit={seekerSubmit}>
              <Row className="mb-3 formCenter" >
                <Col>
                  <Form.Group as={Row} md="6"  controlId="validationCustom01" className="formField">
                    {/* <Form.Label className="formFieldLabel">First name</Form.Label> */}
                    <Form.Control
                      className="formFieldInput " required type="text" placeholder="First name" 
                      name="firstName" value={inputs.firstName} onChange={changeHandle}
                    />
                  </Form.Group>
                  <Form.Group as={Row} md="6"  controlId="validationCustom02" className="formField">
                    {/* <Form.Label className="formFieldLabel">Last name</Form.Label> */}
                    <Form.Control
                      className="formFieldInput " required type="text" placeholder="Last name"
                      name="lastName" value={inputs.lastName} onChange={changeHandle}
                    />
                  </Form.Group>
                  <Form.Group as={Row} md="6"  controlId="validationCustom03" className="formField">
                  {/* <Form.Label className="formFieldLabel">Password</Form.Label> */}
                  <Form.Control
                    className="formFieldInput " required type="password" placeholder="Password"
                    name="password" value={inputs.password} onChange={changeHandle}
                  />
                </Form.Group>
                <Form.Group as={Row} md="6"  controlId="validationCustom04" className="formField">
                  {/* <Form.Label className="formFieldLabel">Confirm Password</Form.Label> */}
                  <Form.Control
                    className="formFieldInput " required type="password" placeholder="Confirm Password"
                    name="cpassword" value={inputs.cpassword} onChange={changeHandle}
                  />
                </Form.Group>
                <Form.Group as={Row} md="6" controlId="validationCustom05" className="formField">
                  {/* <Form.Label className="formFieldLabel">Email</Form.Label> */}
                  <Form.Control
                    className="formFieldInput " required type="email" placeholder="E-mail"
                    name="email" value={inputs.email} onChange={changeHandle}
                  />
                </Form.Group>
                </Col>
                <Form.Group as={Col} md="6" controlId="validationCustom06" className="formField">
                  <Form.Label className="formFieldLabel">Profile image</Form.Label>
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="row img-circle">
                      {imgBtn?<img src={userDp}   className="shadow" alt="Logo"/>:<img src={imgShow}   className="shadow" alt="Logo"/>}
                      </div>
                      <div className="col mt-4">
                        <div className="dragBox" >Pick Image
                          <input type="file"  accept="image/*" onChange={onImageChange} id="uploadFile"  />
                        </div>
                        <div>
                          <button className="row dragBox m-2" type="button" onClick={imageUpload}>Upload</button>
                        </div>
                      </div>
                    </div>
                  </Form.Group>
              </Row>
              
              <Form.Group className="mb-3 formField">
                <span className={errs.style}>{errs.message}</span>
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
                <Col>
                  <Form.Group as={Row} md="6"  controlId="validationCustom01" className="formField">
                    {/* <Form.Label className="formFieldLabel">First name</Form.Label> */}
                    <Form.Control
                      className="formFieldInput " required type="text" placeholder="First name" 
                      name="firstName" value={emp.firstName} onChange={changeHandle}
                    />
                  </Form.Group>
                  <Form.Group as={Row} md="6"  controlId="validationCustom02" className="formField">
                    {/* <Form.Label className="formFieldLabel">Last name</Form.Label> */}
                    <Form.Control
                      className="formFieldInput " required type="text" placeholder="Last/Company Name"
                      name="lastName" value={emp.lastName} onChange={changeHandle}
                    />
                  </Form.Group>
                  <Form.Group as={Row} md="6"  controlId="validationCustom03" className="formField">
                  {/* <Form.Label className="formFieldLabel">Password</Form.Label> */}
                  <Form.Control
                    className="formFieldInput " required type="password" placeholder="Password"
                    name="password" value={emp.password} onChange={changeHandle}
                  />
                </Form.Group>
                <Form.Group as={Row} md="6"  controlId="validationCustom04" className="formField">
                  {/* <Form.Label className="formFieldLabel">Confirm Password</Form.Label> */}
                  <Form.Control
                    className="formFieldInput " required type="password" placeholder="Confirm Password"
                    name="cpassword" value={emp.cpassword} onChange={changeHandle}
                  />
                </Form.Group>
                <Form.Group as={Row} md="6" controlId="validationCustom05" className="formField">
                  {/* <Form.Label className="formFieldLabel">Email</Form.Label> */}
                  <Form.Control
                    className="formFieldInput " required type="email" placeholder="E-mail"
                    name="email" value={emp.email} onChange={changeHandle}
                  />
                </Form.Group>
                </Col>
                <Form.Group as={Col} md="6" controlId="validationCustom06" className="formField">
                  <Form.Label className="formFieldLabel">Profile image</Form.Label>
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="row img-circle">
                      {imgBtn?<img src={userDp}   className="shadow" alt="Logo"/>:<img src={imgShow}   className="shadow" alt="Logo"/>}
                      </div>
                      <div className="col mt-4">
                        <div className="dragBox" >Pick Image
                          <input type="file"  accept="image/*" onChange={onImageChange} id="uploadFile"  />
                        </div>
                        <div>
                          <button className="row dragBox m-2" type="button" onClick={imageUpload}>Upload</button>
                        </div>
                      </div>
                    </div>
                  </Form.Group>
              </Row>
              
              <Form.Group className="mb-3 formField">
                <span className={errs.style}>{errs.message}</span>
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
        </TabView>
      </div>
    </div>
 </> );
}