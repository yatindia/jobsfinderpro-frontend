import React, {useEffect, useState} from "react";
import axios from "axios";

import { API_URL } from "../../../components/utils";


function UserContent() {

    const [userData, setUserData] = useState({})

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'))
 
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
                {/* {console.log(profile_2)} */}
                    <h3>{profile_1.job_fname} {profile_1.job_lname}</h3>
                    {profile_2 ?(<div>
                    <h6><i className="fa fa-map-marker text-primary"/>  {userData.city}, {userData.state}</h6>
                    <p>{userData.jobTitle}</p>
                    <div className='row p-2'>
                        <div className='col border'>
                            <div className="row skills">
                                <h6><i className="fa fa-user text-info"/> Gender: <b>{userData.gender}</b> </h6>
                            </div>
                            <div className="row skills">
                                <h6><i className="fa fa-calendar text-warning"/> Date of Birth: <b>{userData.dateOfBirth}</b></h6>
                            </div>
                            <div className="row skills">
                                <i className="fa fa-phone text-success m-1"/><b> {userData.mobile}</b>
                            </div>
                            <div className="row skills">
                                <i className="fa fa-envelope text-danger m-1"/><b> {userData.job_email}</b>
                            </div>
                        </div>
                        <div className='col border'>
                            <div className=" skills">
                                <h6 className="text-secondary">Qualifications:</h6>
                                 {profile_2.qualifications.length>0 ? (<ul>
                                    {profile_2.qualifications.map((item, i)=>(
                                        <li className="ml-1" key={i}><b>{item}</b> </li>
                                    ))}
                                </ul>):<></>}
                            </div>
                            <div className=" skills">
                                <h6 className="text-secondary">Past Jobs:</h6>
                                 {profile_2.pastJobs.length>0 ? (<ul>
                                    {profile_2.pastJobs.map((item, i)=>(
                                        <li className="ml-1" key={i}><b>{item}</b> </li>
                                    ))}
                                </ul>):<></>} 
                            </div>
                            <div className="buttons mb-3 text-right">
                                <a className="btn primary" href="/users/dashboard/profile">Edit Profile</a>
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
      </div>
    </>);
  }

export default UserContent;
