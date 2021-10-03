import React,{useEffect} from "react";


function EmpContent() {

    const userDp = localStorage.getItem('userDp');
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = (JSON.parse(localStorage.getItem( 'userInfo'))||null)
 

useEffect(() => {

});

    return (<>
     <div className="container-fluid">
        <div className="tab-pane fade show active border-bottom p-3">
        <div className="row">
            <div className="col-md-4 mb-4 p-4">
                <div className="">
                    <label className="formFieldLabel">Logo:</label>
                    <div className="row img-circle">
                    <img src={userDp}  className="shadow" alt="Logo"/>
                    </div>
                </div>
            </div>
                <div className="col-md">
                    <div className="form-group row ">
                        <label className="formFieldLabel">Name: <b>{profile_1.job_fname} {profile_1.job_lname}</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Email: <b>{profile_1.job_email}</b></label>
                    </div>
                    {profile_2 ?(
                        <div>
                            <div className="form-group row">
                                <label className="formFieldLabel">Organization Name: <b>{profile_2.orgName}</b></label>
                            </div>
                            <div className="form-group row">
                                <label className="formFieldLabel">Organization Email: <b>{profile_2.orgEmail}</b></label>
                            </div>
                            <div className="form-group row">
                                <label className="formFieldLabel">Contact Number: <b>{profile_2.orgPhone}</b></label>
                            </div>
                            <div className="form-group row">
                                <label className="formFieldLabel">Address: <b>{profile_2.orgAddress}</b></label>
                            </div>
                            <div className="form-group row">
                                <label className="formFieldLabel">Website:<b>{profile_2.orgWebsite}</b> </label>
                            </div>
                            <div className="form-group row">
                                <label className="formFieldLabel">Country: <b>{profile_2.orgCountry}</b></label>
                            </div>
                        </div>):null}
                </div>
            </div>
          
            <div>
                <a className="btn btn-findJob " href="/employers/dashboard/profile">Edit Profile</a>
            </div>
        </div>
      </div>
    </>);
}

export default EmpContent;