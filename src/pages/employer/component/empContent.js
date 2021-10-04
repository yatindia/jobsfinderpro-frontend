import React,{useEffect} from "react";


function EmpContent() {

    const userDp = localStorage.getItem('userDp');
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = (JSON.parse(localStorage.getItem( 'userInfo'))||null)
 

useEffect(() => {

});

    return (<>
     <div className="container-fluid">
        <div className='row justify-content-center'>
                <div className="col-md-10 card-container shadow">
                    <h3>User: {profile_1.job_fname} {profile_1.job_lname}</h3>
                    {profile_2 ?(<div className="border-top p-2">
                        <img className="round" src={userDp} alt="user" />
                    <p>{profile_2.orgName}</p>
                    <h6><i className="fa fa-map-marker"/>  {profile_2.orgAddress},</h6>
                    <h6>{profile_2.orgCountry}</h6>
                    <h6><i className="fa fa-envelope"/>  <b>{profile_1.job_email}</b></h6>
                    <div className='row border'>
                        <div className='col'>
                            <div className="skills">
                                <i className="fa fa-phone"><b> {profile_2.orgPhone}</b> </i>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="skills">
                                <i className="fa fa-link"><b> {profile_2.orgWebsite}</b></i>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="skills">
                                <i className="fa fa-envelope-o"><b> {profile_2.orgEmail}</b></i>
                            </div>
                        </div>
                    </div>
                    <div className="buttons m-3 text-right">
                        <a className="btn primary" href="/employers/dashboard/profile">Edit Profile</a>
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