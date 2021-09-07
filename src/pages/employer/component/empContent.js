import React,{useState,useEffect} from "react";
import axios from 'axios'
import { API_URL } from "../../../components/utils";

import { resizeFile,dataURIToBlob} from "../../../components/utils";

function EmpContent() {

    const [imgData, setImgData] = useState(null);
    const [imgShow, setImgShow] = useState(null);
    const [imgBtn, setImgBtn] = useState(true);

    const onImageChange=async (e)=>{
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const image = await resizeFile(file);
            const newFile = dataURIToBlob(image);
            setImgShow(image)
            setImgData(newFile)
            setImgBtn(false)
        }
    }

    const imageUpload= async ()=>{
        const formData = new FormData();
        formData.append("profile", imgData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        // console.log(formData)
        // for(var pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        //   }
        document.getElementById("message").innerText = "Loading.."
        try {
            const res = await axios.post(API_URL+"/account/uploaddp",formData,config)
            //console.log(res);
            document.getElementById("message").innerText = res.data.message
          } catch (ex) {
           // console.log(ex);
            document.getElementById("message").innerText = ex
          }
    }

useEffect(() => {

});

    return (<>
    <div className="tab-content p-1 p-md-1" id="v-pills-tabContent">
        <div className="tab-pane fade show active border-bottom p-3" id="account" role="tabpanel" aria-labelledby="account-tab">
            <h3 className="mb-4">Company Profile</h3>
            <div className="mb-3">
                <div className="mb-3 row form-group">
                  <div className="col-lg-3 img-circle">
                        {imgBtn?<img src={localStorage.getItem('Cmpny_Logo')} className="shadow" alt="Logo"/>:
                        <img src={imgShow} className="shadow" alt="Logo"/>}
                    </div>
                  <div className="col-lg-8 mt-4">
                    <h5><small>Company Logo</small></h5>
                    {imgBtn?<input type="file" name="profileImage" className="text-primary" placeholder={localStorage.getItem('Cmpny_Logo')} accept="image/*" onChange={onImageChange}/>:
                     <button className="btn btn-outline-info" onClick={imageUpload}>Upload</button>}
                     <p className="text-primary m-2" id="message"></p>
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" className="form-control" defaultValue="Accenture"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Mode</label>
                        <input type="text" className="form-control" defaultValue="MNC"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" defaultValue="hr@ccenture.com"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Phone number</label>
                        <input type="text" className="form-control" defaultValue="+91 9876543215"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>GSTIN</label>
                        <input type="text" className="form-control" defaultValue="GSTIN123456789"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Website</label>
                        <input type="text" className="form-control" defaultValue="www.accenture.com"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Designation</label>
                        <input type="text" className="form-control" defaultValue="Frontend, Backend, AI"/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>About Us</label>
                        <textarea className="form-control" rows="4" defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!"></textarea>
                    </div>
                </div>
            </div>
            <div>
                <button className="btn btn-outline-primary m-2">Update</button>
                <button className="btn btn-light m-2">Cancel</button>
            </div>
        </div>
    </div>
    </>);
}

export default EmpContent;