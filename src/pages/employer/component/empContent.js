import React,{useEffect, useState} from "react";
import axios from "axios";

import { API_URL } from "../../../components/utils";


export default function EmpContent() {

    const [userData, setUserData] = useState([])
 

// --------------get User------
useEffect(() =>{
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
	const formData = {email:profile_1.job_email,type:profile_1.Role_Type}
    const getuser= async()=>{
        try {
			const res = await axios.post(`${API_URL}/profile/getprofile`,formData,{headers:header})
			if(res.data.error === false){
				const datas = res.data.data
                const post = PostData(datas)
                setUserData(post)
				localStorage.setItem('userInfo', JSON.stringify(datas.part2));
				addToLocalStorageObject('userDetails','dpName',datas.part1.profileImage)
				addToLocalStorageObject('userDetails','job_fname',datas.part1.firstName)
				addToLocalStorageObject('userDetails','job_lname',datas.part1.lastName)
			}
			else{
				return <></>
			}
		} catch (error) {
			console.log(error)
		}

    }
    getuser()
},[])

var addToLocalStorageObject = function (name, key, value) {
	var existing = localStorage.getItem(name);
	existing = existing ? JSON.parse(existing) : {};
	existing[key] = value;
	localStorage.setItem(name, JSON.stringify(existing));

};

    return (<>
     <div className="container-fluid">
        {userData}
      </div>
    </>);
}

const PostData =(data)=>{
    const part_1 = data.part1
    const part_2 = data.part2
    return(
        <div className='row justify-content-center mt-2'>
            <div className="col-md col-lg  card-container shadow">
                <h4><span className="text-secondary">Employer:</span> {part_1.firstName} {part_1.lastName}</h4>
                <p className='text-right'>Balance Points: # {part_2.resumePoints}</p>
                {part_2 ?(
                <div className=" row border-top p-2">
                    <div className='col border p-2'>
                        <div className="d-flex flex-column align-items-center text-center">
                            <div className="row img-circle">
                                <img src={`${API_URL}/profile/profileImages/${part_2.orgLogo}`} className="shadow" alt="Logo"/>
                            </div>
                        </div>
                        <p>{part_2.orgName}</p>
                        <h6><i className="fa fa-map-marker text-primary"/>  {part_2.orgAddress},</h6>
                        <h6>{part_2.orgCountry}</h6>
                        <h6><i className="fa fa-envelope-o text-danger"/>  <b>{part_1.email}</b></h6>
                    </div>
                    <div className='col border justify-content-center'>
                        <div className='row'>
                            <div className="skills">
                                PAN:<b> {part_2.pan}</b>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="skills">
                                GSTIN:<b> {part_2.gstin}</b>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="skills">
                                <i className="fa fa-phone text-success"/><b> {part_2.orgPhone}</b>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="skills">
                                <i className="fa fa-link text-info"/><b> {part_2.orgWebsite}</b>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div className="skills">
                                <i className="fa fa-envelope-o text-danger"/><b> {part_2.orgEmail}</b>
                            </div>
                        </div> */}
                        <div className='row justify-content-center'>
                            <div className="buttons m-3 text-center">
                                <a className="btn primary" href="/employers/dashboard/profile">Edit Profile</a>
                            </div>
                            <div className="buttons m-3 text-center">
                                <a className="btn primary" href="/employers/dashboard/resumes">{part_2.downloadedResumes.length} Resumes</a>
                            </div>
                        </div>
                    </div>
                </div>):
                <div className="buttons mb-3">
                    <h6>If Details not shown, Reload Page</h6>
                    {/* <button className="btn primary" onClick={window.location.reload()}>Reload</button> */}
                </div>}
            </div>
        </div>
    )
}