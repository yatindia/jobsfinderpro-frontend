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
                        <input type="text" className="form-control" defaultValue="Ram" readOnly={true}/>
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
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Employment Summary <small className="text-secondary"> Min 50- Characters</small></label>
                        <textarea className="form-control" rows="4" minLength="50" readOnly={true}
                            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!"></textarea>
                    </div>
                </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Career Summary <small className="text-secondary"> Min 50- Characters</small></label>
                        <textarea className="form-control" rows="4" minLength="50" readOnly={true}
                            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!"></textarea>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" className="form-control" defaultValue="IT Program" readOnly={true}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Sub Category</label>
                        <input type="text" className="form-control" defaultValue="UI Desiner" readOnly={true}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Skills</label>
                        <input type="text" className="form-control" defaultValue="CSS, HTML, React js" readOnly={true}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Educations</label>
                        <input type="text" className="form-control" defaultValue="BE CSE" readOnly={true}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Address</label>
                        <textarea className="form-control" rows="4" minLength="50" readOnly={true}
                            defaultValue="Lorem ipsum dolor\n sit amet consectetur \nadipisicing \nelit."></textarea>
                    </div>
                </div>
                    <div className="col-md-6">
                    <div className="form-group calender">
                        <label>Date of Birth</label>
                        <input type="text" className="form-control" defaultValue="04/10/1992" readOnly={true}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6 col-sm">
                    <label>Martial Status</label>
                    <input type="text" className="form-control" defaultValue="Unmarried" readOnly={true}/>
                </div>
                <div className="form-group col-md-6 col-sm">
                    <label>Gender</label>
                    <input type="text" className="form-control" defaultValue="Male" readOnly={true}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Language</label>
                        <input type="text" className="form-control" defaultValue="English,Tamil,Malayalam" readOnly={true}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Projects</label>
                        <input type="text" className="form-control" defaultValue="Projcet title" readOnly={true}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <p>Resume: <span className=" text-primary">Kiran resume.pdf</span></p>
                    </div>
                </div>
            </div>            
            <div>
                <a className="btn btn-findJob " href="/users/dashboard/profile">Edit Profile</a>
            </div>
        </div>
    </div>
      </div>
    </>);
  }

export default UserContent;
