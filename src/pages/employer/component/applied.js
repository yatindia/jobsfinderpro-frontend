import React from "react";


function Applied(){

    return (<>
          <div className="container-flex">
            <div className="row d-flex justify-content-center " >
                <div className="col-md m-2 pt-s border">
                    <div className="row z-depth-3">
                        <div className="col-sm bg-white rounded-right">
                            <h3 className="mt-3 text-start">User Name</h3>
                            <div className="row">
                                <div className="col-sm">
                                    <p className="font-weight-bold">Experince</p>
                                    <h6 className="text-muted">5</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Level</p>
                                    <h6 className="text-muted">Junior</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Contract type</p>
                                    <h6 className="text-muted">Fulltime</h6>
                                </div>
                            </div>
                            <hr className="bg-primary"/>
                            <ul className="list-unstyled d-flex justify-content-start">
                            <h5 className="">Skills:</h5>
                                <li><i className="h5 m-2 text-muted" >Html</i></li>
                                <li><i className="h5 m-2 text-muted" >React</i></li>
                                <li><i className="h5 m-2 text-muted" >Django</i></li>
                                <a href="none">Download Resume</a>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md m-2 pt-s border">
                    <div className="row z-depth-3">
                        <div className="col-sm bg-white rounded-right">
                            <h3 className="mt-3 text-start">User 2</h3>
                            <div className="row">
                                <div className="col-sm">
                                    <p className="font-weight-bold">Experince</p>
                                    <h6 className="text-muted">5</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Level</p>
                                    <h6 className="text-muted">Senior</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Contract type</p>
                                    <h6 className="text-muted">Fulltime</h6>
                                </div>
                            </div>
                            <hr className="bg-primary"/>
                            <ul className="list-unstyled d-flex justify-content-start">
                            <h5 className="">Skills:</h5>
                                <li><i className="h5 m-2 text-muted" >Html</i></li>
                                <li><i className="h5 m-2 text-muted" >React</i></li>
                                <li><i className="h5 m-2 text-muted" >Django</i></li>
                                <a href="none" >Download Resume</a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </> )
}

export default Applied