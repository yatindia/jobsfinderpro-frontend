import React from "react";



function EmpProfile() {



return (<>

    <div className="tab-pane fade show active border-bottom p-3" id="password" role="tabpanel" aria-labelledby="password-tab">
        <h3 className="mb-4">Password Settings</h3>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Old password</label>
                    <input type="password" className="form-control"/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>New password</label>
                    <input type="password" className="form-control"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Confirm new password</label>
                    <input type="password" className="form-control"/>
                </div>
            </div>
        </div>
        <div>
            <button className="btn btn-primary">Update</button>
            <button className="btn btn-light">Cancel</button>
        </div>
    </div>
    <div className="tab-pane fade show active border-bottom p-3" id="security" role="tabpanel" aria-labelledby="security-tab">
        <h3 className="mb-4">Security Settings</h3>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Login</label>
                    <input type="text" className="form-control"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Two-factor auth</label>
                    <input type="text" className="form-control"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="recovery"/>
                        <label className="form-check-label" for="recovery">
                        Recovery
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <button className="btn btn-findJob">Update</button>
            <button className="btn btn-findJob">Cancel</button>
        </div>
    </div>
</>);
}

export default EmpProfile;