import React,{useEffect, useState} from "react";
import axios from "axios";

import { API_URL } from "../../../components/utils";


function EmpContent() {

    const [userData, setUserData] = useState({})

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = (JSON.parse(localStorage.getItem( 'userInfo'))||null)
 
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
	const formData = {email:profile_1.job_email,type:profile_1.Role_Type}

// --------------get User------
useEffect(() =>{
    const getuser= async()=>{
        try {
			const res = await axios.post(`${API_URL}/profile/getprofile`,formData,{headers:header})
			if(res.data.error === false){
				const datas = res.data.data
                setUserData(datas.part2)
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
},[header,formData])

var addToLocalStorageObject = function (name, key, value) {
	var existing = localStorage.getItem(name);
	existing = existing ? JSON.parse(existing) : {};
	existing[key] = value;
	localStorage.setItem(name, JSON.stringify(existing));

};


    return (<>
     <div className="container-fluid">
        <div className='row justify-content-center'>
                <div className="col-md-10 card-container shadow">
                    <h3><span className="text-secondary">User:</span> {profile_1.job_fname} {profile_1.job_lname}</h3>
                    {profile_2 ?(
                    <div className=" row border-top p-2">
                        <div className='col border p-2'>
                            <img className="round" src={`${API_URL}/profile/profileImages/${userData.orgLogo}`} alt="user" />
                            <p>{userData.orgName}</p>
                            <h6><i className="fa fa-map-marker text-primary"/>  {userData.orgAddress},</h6>
                            <h6>{userData.orgCountry}</h6>
                            <h6><i className="fa fa-envelope text-danger"/>  <b>{profile_1.job_email}</b></h6>
                        </div>
                        <div className='col border justify-content-center'>
                            <div className='row'>
                                <div className="skills">
                                    <i className="fa fa-phone text-success"/><b> {userData.orgPhone}</b>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="skills">
                                    <i className="fa fa-link text-info"/><b> {userData.orgWebsite}</b>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="skills">
                                    <i className="fa fa-envelope-o text-danger"/><b> {userData.orgEmail}</b>
                                </div>
                            </div>
                            <div className="buttons m-3 text-center">
                            <a className="btn primary" href="/employers/dashboard/profile">Edit Profile</a>
                        </div>
                        </div>
                    </div>):
                    <div className="buttons mb-3">
                        <h6>If Details not shown, Reload Page</h6>
                        {/* <button className="btn primary" onClick={window.location.reload()}>Reload</button> */}
                    </div>}
                </div>
            </div>
      </div>
    </>);
}

export default EmpContent;