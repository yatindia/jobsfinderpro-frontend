import React,{useEffect, useState} from 'react'
import {Modal, Form, Row, Col} from 'react-bootstrap';
import axios from 'axios';

import { API_URL,empformValid ,resizeFile,dataURIToBlob } from '../../../components/utils';


const EmpRegister = ({show, title, dialogClose}) => {

    const userProfile = JSON.parse(localStorage.getItem( 'userDetails'));
    const [imgData, setImgData] = useState(null);
    const [imgShow, setImgShow] = useState(null);
    const [imgBtn, setImgBtn] = useState(true);
    const [imgName, setImgName] = useState('');
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        email: userProfile.job_email,
        type:"employer",
        orgPhone: "",
        orgLogo:"",
        orgName:"",
        orgEmail: "",
        orgAddress: "",
        orgWebsite :"",
        orgCountry: "",
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
      const checking = empformValid(inputs)
      if(checking.valid===true){
        //console.log(inputs)
        try {
            setErr({message:'Loading..',style:'text-primary'})
            const res = await axios.post(`${API_URL}/account/signupcomplete`,inputs)
            setErr({message:res.data.Message||res.data.message,style:'text-info'})
            if(res.data.error===false){
               // addToLocalStorageObject('userDetails','Profile','True')
            }
           // window.location.reload()
            console.log(res)
          } catch (ex) {
            setErr({message:'Network fail',style:'text-warning'})
            console.log(ex)
          }
      }
      else{
        setErr({message:checking.error,style:'text-danger'})
      }
}


// --------Localstorage update----
// var addToLocalStorageObject = function (name, key, value) {
// 	var existing = localStorage.getItem(name);
// 	existing = existing ? JSON.parse(existing) : {};
// 	existing[key] = value;
// 	localStorage.setItem(name, JSON.stringify(existing));

// };

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
            setInputs({...inputs,orgLogo:imgName})
        } catch (ex) {
         // console.log(ex);
      setErr({title:'',message:ex,style:'text-warning'})
        }
  }

  useEffect(()=>{
    setInputs({...inputs,orgLogo:imgName})
  },[inputs,imgName])

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
                                <Form.Group as={Col} md="6" className="formField">
                                    <Form.Label className="formFieldLabel">Organization Logo</Form.Label>
                                        <div className="row m-auto justify-content-between text-center">
                                        <div className="col img-circle ml-3">
                                        {imgBtn?<img src={userDp}  className="shadow" alt="Logo"/>:<img src={imgShow}   className="shadow" alt="Logo"/>}
                                        </div>
                                        <div className="col mt-4">
                                            <div className="dragBox" >Pick Logo
                                            <input type="file"  accept="image/*" onChange={onImageChange} id="uploadFile"  />
                                            </div>
                                            <div>
                                            <button className="row dragBox m-2" type="button" onClick={imageUpload}>Upload</button>
                                            </div>
                                        </div>
                                        </div>
                                        
                                </Form.Group>
                                <Form.Group as={Col} md="6" className="formField">
                                    <div className="ml-auto text-right">
                                        <p className="formFieldLabel"><b>Name:</b> {userProfile.job_fname} {userProfile.job_lname}</p>
                                        <p className="formFieldLabel"><b>User E-Mail:</b> {userProfile.job_email} </p>
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6"  controlId="validationCustom04" className="formField">
                                    {/* <label>Organization Name</label>  */}
                                    <input type="text" className="form-control" placeholder="Organization Name" name="orgName"
                                        value={inputs.orgName} onChange={changeHandle} required/>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom05" className="formField">
                                    {/* <label>Organization E-Mail</label>  */}
                                    <input type="text" className="form-control" placeholder="Organization E-mail" name="orgEmail"
                                        value={inputs.orgEmail} onChange={changeHandle} required/>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom06" className="formField">
                                    {/* <label>Organization Contact Number</label>  */}
                                    <input type="text" className="form-control" placeholder="Organization Contact Number" name="orgPhone"
                                        value={inputs.orgPhone} onChange={changeHandle} required/>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom07" className="formField">
                                    {/* <label>Organization Wesite</label>  */}
                                    <input type="text" className="form-control" placeholder="Organization Wesite" name="orgWebsite"
                                        value={inputs.orgWebsite} onChange={changeHandle} required/>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom09" className="formField">
                                    {/* <label>Organization Address</label>  */}
                                    <textarea type="text" className="form-control" placeholder="Organization Address" row="4" name="orgAddress"
                                        value={inputs.orgAddress} onChange={changeHandle} required/>
                                </Form.Group>
                                <Form.Group as={Col} md="6"  controlId="validationCustom08" className="formField">
                                    {/* <label>Organization Location</label>  */}
                                    <input type="text" className="form-control" placeholder="Organization Landmark" name="orgCountry"
                                        value={inputs.orgCountry} onChange={changeHandle} required/>
                                </Form.Group>
                            </Row>
                                <div className=" text-center">
                                <span className={errs.style}>{errs.message}</span>
                                </div>

                            <div className="ml-auto text-right">
                                <button className="btn btn-findJob m-2" type="submit">Save Profile</button>
                            </div>
                        </Form>
                    </div>
                         
                    </Modal.Body>
            </Modal>
    </>) }

}
export default EmpRegister