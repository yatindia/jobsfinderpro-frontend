import React, { useEffect } from "react";


function UserContent() {
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = (JSON.parse(localStorage.getItem( 'userInfo'))||null)

    useEffect(() => {

  },);


    return (<>
      <div className="container-fluid">
            <div className='row justify-content-center'>
                <div className="col-md-10 card-container shadow">
                    <h3>{profile_1.job_fname} {profile_1.job_lname}</h3>
                    {profile_2 ?(<div>
                    <h6><i className="fa fa-map-marker"/>  {profile_2.city}, {profile_2.state}</h6>
                    <p>{profile_2.jobTitle}</p>
                    <div className='row border-top'>
                        <div className='col'>
                            <div className="skills">
                                <h6>Gender: <b>{profile_2.gender}</b> </h6>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="skills">
                                <h6>Date of Birth: <b>{profile_2.dateOfBirth}</b></h6>
                            </div>
                        </div>
                    </div>
                    <div className='row border-top'>
                        <div className='col'>
                            <div className="skills">
                                <h6>Qualifications:</h6>
                                {profile_2.qualifications.length>0 ? (<ul>
                                    {profile_2.qualifications.map((item, i)=>(
                                        <li className="ml-1 formFieldLabel" key={i}><b>{item}</b> </li>
                                    ))}
                                </ul>):null}
                            </div>
                        </div>
                        <div className='col'>
                            <div className="skills">
                                <h6>Past Jobs:</h6>
                                {profile_2.pastJobs.length>0 ? (<ul>
                                    {profile_2.pastJobs.map((item, i)=>(
                                        <li className="ml-1 formFieldLabel" key={i}><b>{item}</b> </li>
                                    ))}
                                </ul>):null}
                            </div>
                        </div>
                    </div>
                    <div className='row border-top justify-content-between'>
                        <div className='col'>
                            <div className="skills">
                                <i className="fa fa-phone"><b> {profile_2.mobile}</b> </i>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="skills">
                                <i className="fa fa-envelope"><b> {profile_1.job_email}</b></i>
                            </div>
                        </div>
                    </div>
                    <div className="buttons mb-3 text-right">
                        <a className="btn primary" href="/users/dashboard/profile">Edit Profile</a>
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
