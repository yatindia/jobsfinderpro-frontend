import React,{useEffect} from "react";


function EmpContent() {

 

useEffect(() => {

});

    return (<>
    <div className="" >
        <div className="tab-pane fade show active border-bottom p-3" id="account" role="tabpanel" aria-labelledby="account-tab">
            <h3 className="mb-4">Company Profile</h3>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" className="form-control" defaultValue="Accenture"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Mode</label>
                        <input type="text" className="form-control" defaultValue="MNC"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" defaultValue="hr@ccenture.com"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Phone number</label>
                        <input type="text" className="form-control" defaultValue="+91 9876543215"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>GSTIN</label>
                        <input type="text" className="form-control" defaultValue="GSTIN123456789"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Website</label>
                        <input type="text" className="form-control" defaultValue="www.accenture.com"/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>About Us</label>
                        <textarea className="form-control" rows="4" defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!"></textarea>
                    </div>
                </div>
            </div>
            <div>
                <button className="btn btn-findJob m-2">Save</button>
            </div>
        </div>
    </div>
    </>);
}

export default EmpContent;