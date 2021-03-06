import React, {useEffect, useState} from "react";
import axios from "axios";

import { API_URL } from "../../../components/utils";


export default function UserContent() {

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


const PostData = (data) => {
    const part_1 = data.part1
    const part_2 = data.part2
    return (
    <div className="container-fluid mt-4">
        <div className='row justify-content-center'>
            <div className="col-md card-container shadow">
                <h3>{part_1.firstName} {part_1.lastName}</h3>
                {part_2 ?(<div>
                <h6><i className="fa fa-map-marker text-primary"/>  {part_2.city}, {part_2.state}</h6>
                <p>{part_2.jobTitle}</p>
                <div className='row p-2'>
                    <div className='col border'>
                        <div className="row skills">
                            <h6><i className="fa fa-user text-info m-1"/> 
                            <span className="text-secondary"> Gender: </span><b>{part_2.gender}</b> </h6>
                        </div>
                        <div className="row skills">
                            <h6><i className="fa fa-calendar text-warning m-1"/>
                            <span className="text-secondary"> Date of Birth: </span><b>{part_2.dateOfBirth.split("T")[0]}</b></h6>
                        </div>
                        <div className="row skills">
                            <h6><i className="fa fa-phone text-success m-1"/>
                            <span className="text-secondary"> Phone: </span><b> {part_2.mobile}</b></h6>
                        </div>
                        <div className="row skills">
                            <h6><i className="fa fa-envelope text-danger m-1"/>
                            <span className="text-secondary"> Mail: </span><b> {part_1.email}</b></h6>
                        </div>
                    </div>
                    <div className='col border'>
                        {part_2.qualifications ? (
                        <div className="skills">
                            <h6 className="text-secondary">Educational Qualifications:</h6>
                                <ul>
                                {part_2.qualifications.map((item, i)=>(<div className='border ml-2 row d-flex' key={i}>
                                    <li className="col"><b>{item.qualification}</b> </li>
                                    <li className="col "><b>{item.percentage} </b><small>Percentage</small></li>
                               </div> ))}
                            </ul>
                        </div>):<></>} 
                        {/* <div className="skills">
                            <h6 className="text-secondary">Previous Jobs:</h6>
                                {part_2.pastJobs.length>0 ? (<ul>
                                {part_2.pastJobs.map((item, i)=>(
                                    <li className="ml-1" key={i}><b>{item}</b> </li>
                                ))}
                            </ul>):<></>} 
                        </div> */}
                        {part_2.techQualifications ? (
                        <div className="skills">
                            <h6 className="text-secondary">Technical Skills:</h6>
                                <ul>
                                {part_2.techQualifications.map((item, i)=>(<div className='border ml-2 row d-flex' key={i}>
                                    <li className="col"><b>{item.skill}</b></li>
                                    <li className="col"><b>{item.experience} </b><small>Years</small></li>
                               </div> ))}
                            </ul>
                        </div>):<></>} 
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
    )
  }