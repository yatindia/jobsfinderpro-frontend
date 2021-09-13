import React,{useState,useEffect} from "react";
import axios from 'axios'
import { API_URL } from "../../../components/utils";

import { resizeFile,dataURIToBlob} from "../../../components/utils";

function EmpContent() {

    const [imgData, setImgData] = useState(null);
    const [imgShow, setImgShow] = useState(null);
    const [imgBtn, setImgBtn] = useState(true);

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
    <div className="tab-content" id="v-pills-tabContent">
        <div className="tab-pane fade show active border-bottom p-3" id="account" role="tabpanel" aria-labelledby="account-tab">
            <h3 className="mb-4">Company Profile</h3>
            <div className="mb-3">
                <div className="d-flex flex-column align-items-center text-center">
                    <div className="row img-circle">
                    {imgBtn?<img src={userDp || imgShow}  className="shadow" alt="Logo"/>:
                        <img src={imgShow} className="shadow"  alt="ProfileImage"/>}
                    </div>
                    <div className="col mt-4">
                        <div className="dragBox" >Pick Logo
                            <input type="file"  accept="image/*" onChange={onImageChange} id="uploadFile"  />
                        </div>
                        <div>
                            <button className="row dragBox m-2" onClick={imageUpload}>Upload</button>
                            <label className="row text-danger" id="message">**First Upload Dp...</label>
                        </div>
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
                <div className="col-md-12">
                    <div className="form-group">
                        <label>About Us</label>
                        <textarea className="form-control" rows="4" defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!"></textarea>
                    </div>
                </div>
            </div>
            <div>
                <button className="btn btn-findJob m-2">Update</button>
            </div>
        </div>
    </div>
    </>);
}

export default EmpContent;