import React, { useEffect } from "react";


function UserContent() {

    useEffect(() => {

  },);


    return (<>
      <div className="container-fluid">
        <div className="tab-pane fade show active border-bottom p-3">
        <div className="row">
                <div className="col-md">
                    <div className="form-group row ">
                        <label className="formFieldLabel">Name: <b>Kiran Ram</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Email: <b>kiranacharya287@gmail.com</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Contact Number: <b>+91 9876543215</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Job Title: <b>Web dev</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Qualifications: <b>CSE</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Date of Birth: <b>04/10/1992</b></label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Gender:<b>Male</b> </label>
                    </div>
                    <div className="form-group row">
                        <label className="formFieldLabel">Location: <b>Jerssy, New York</b></label>
                    </div>
                </div>
            </div>
          
            <div>
                <a className="btn btn-findJob " href="/users/dashboard/profile">Edit Profile</a>
            </div>
        </div>
      </div>
    </>);
  }

export default UserContent;
