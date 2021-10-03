import React, { useEffect } from "react";


function UserContent() {
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = (JSON.parse(localStorage.getItem( 'userInfo'))||null)

    useEffect(() => {

  },);


    return (<>
      <div className="container-fluid">
        <div className="tab-pane fade show active border-bottom p-3">
        <div className="row">
                <div className="col-md">
                    <div className="form-group row ">
                        <label className="formFieldLabel">Name: <b>{profile_1.job_fname} {profile_1.job_lname}</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Email: <b>{profile_1.job_email}</b></label>
                    </div>
                </div>
                {profile_2 ?(
                    <div className="col-md">
                    <div className="form-group row">
                        <label className="formFieldLabel">Contact Number: <b>{profile_2.mobile}</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Job Title: <b>{profile_2.jobTitle}</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Past Jobs: </label>
                        {profile_2.pastJobs.length>0 ? (<div>
                            {profile_2.pastJobs.map((item, i)=>(
                                <label className="ml-1 formFieldLabel" key={i}><b>{item}</b> </label>
                            ))}
                        </div>):null}
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Qualifications: </label>
                        {profile_2.qualifications.length>0 ? (<div>
                            {profile_2.qualifications.map((item, i)=>(
                                <label className="ml-1 formFieldLabel" key={i}><b>{item}</b> </label>
                            ))}
                        </div>):null}
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Date of Birth: <b>{profile_2.dateOfBirth}</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Gender:<b>{profile_2.gender}</b> </label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Location: <b>{profile_2.city}, {profile_2.state}</b></label>
                    </div>
                </div>
                ):null}
            </div>
          
            <div>
                <a className="btn btn-findJob " href="/users/dashboard/profile">Edit Profile</a>
            </div>
        </div>
      </div>
    </>);
  }

export default UserContent;
