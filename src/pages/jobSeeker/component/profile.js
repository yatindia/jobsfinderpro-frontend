import React,{useState} from "react";

import { resizeFile} from "../../../components/utils";
import category from '../../../components/asserts/category.json'


function UserProfile() {

    const [imgData, setImgData] = useState(null);
    const [imgBtn, setImgBtn] = useState(true);
    const [cate, setCat] = useState(true);

const onImageChange=async (e)=>{
    // if (e.target.files[0]) {
    //     console.log("picture: ", e.target.files);
    //     const reader = new FileReader();
    //     reader.addEventListener("load", () => {
    //       setImgData(reader.result);
    //       setImgBtn(false)
    //     });
    //     reader.readAsDataURL(e.target.files[0]);
    //   }
    if (e.target.files[0]) {
        const file = e.target.files[0];
        const image = await resizeFile(file);
        //const newFile = dataURIToBlob(image);
        setImgData(image)
        setImgBtn(false)
    }
}

const categoryChange =(e)=>{
    if(e==='Select..' || e ===''){
        setCat('')
    }else{
        try {
            let subData = require('../../../components/asserts/subCategory/'+e+'.json');
            setCat(subData)
        } catch (error) {
            setCat('')
            console.log(error)
        }
    }
}

    return (<>
    <div className="tab-content p-1 p-md-1">
        <div className="tab-pane fade show active border-bottom p-3">
            <h3 className="mb-4">Profile Update</h3>
            <div className="mb-3">
                <div className="mb-3 row form-group">
                  <div className="col-lg-3 img-circle">
                      {imgBtn?<img src="https://cdn3.iconfinder.com/data/icons/flat-pro-user-management-set-4/32/user-profile-512.png"  className="shadow" alt="Logo"/>:
                        <img src={imgData} className="shadow"  alt="ProfileImage"/>}
                    </div>
                  <div className="col-lg-8 mt-4">
                    <h5><small>Profile Image</small></h5>
                    {imgBtn?<input type="file" name="profileImage" className="text-primary" accept="image/*" onChange={onImageChange}/>:
                     <button className="btn btn-outline-info float-end">Upload</button>}
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" defaultValue="Kiran"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" defaultValue="Acharya"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" defaultValue="kiranacharya287@gmail.com"/>
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
                        <label>Category</label>
                        <div className="app_dropdown">
                            <select className="form-control selector border" onChange={(e) => categoryChange(e.target.value)}>
                                <option>Select..</option>
                                {category.map((items,i)=>(<option key={i} value={items}> {items}</option>))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Sub Category</label>
                        <input className="form-control selector border"  type="text" name="location"  list="subcate" placeholder="Select.."/>
                          {cate.length > 0 ? (
                           <datalist id = "subcate">
                                {cate.map((items,i)=>(<option key={i} value={items}> {items}</option>))}
                                </datalist>):null}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Bio</label>
                        <textarea className="form-control" rows="4" defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!"></textarea>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group p-2">
                        <p className="form-group text-primary">Kiran resume.pdf</p>
                        <label>Resume Update</label>
                        <input type="file" className="form-control" accept="application/pdf"/>
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

export default UserProfile;
