import React, { useEffect } from "react";


function UserContent() {

    useEffect(() => {

  },);


    return (<>
      <div className="container-fluid">
      <div className="tab-content p-1 p-md-1">
        <div className="tab-pane fade show active border-bottom p-3">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" defaultValue="Kiran" readOnly={true}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" defaultValue="Acharya" readOnly={true}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" defaultValue="kiranacharya287@gmail.com" readOnly={true}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Phone number</label>
                        <input type="text" className="form-control" defaultValue="+91 9876543215" readOnly={true}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Company</label>
                        <input type="text" className="form-control" defaultValue="Kiran Workspace" readOnly={true}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Designation</label>
                        <input type="text" className="form-control" defaultValue="Your Designation" readOnly={true}/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Bio</label>
                        <textarea className="form-control" rows="4" readOnly={true} defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!"></textarea>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label>Resume</label>
                        <p className="form-group text-primary">Kiran resume.pdf</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </div>
    </>);
  }

export default UserContent;
