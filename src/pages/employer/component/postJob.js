import React, { Component } from "react";

class PostJobs extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {

  }

  render() {
    return (<>
      <div className="container-fluid">
      <div className=" page-content">
        <div className="container">
        <div className="row">
            <div className="col-md-9">
                <div>
                    <div className="section">
                        <div className="row">
                            <div className="col-sm-3">
                            <label>Title for the job</label>
                            </div>
                            <div className="col-sm-9 form-group">
                                <input type="text" className="form-control" placeholder="Human Resource Manager"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <label>Job Category</label>
                            </div>
                            <div className="col-sm-6 input-group">
                                <input className="form-control selector border" type="text" placeholder="Select a category" list="category"/>
                                <datalist id = "category">
                                    <option>Full Time</option>
                                    <option>Part Time</option>
                                    <option>Freelance</option>
                                    <option>Contract</option>
                                </datalist>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-3">
                            <label>Job Location</label>
                            </div>
                            <div className="col-sm-9 form-group">
                                <div className="form-group">
                                    <textarea type="text" className="form-control" placeholder="Address"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                            <label>Salary Information</label>
                            </div>
                            <div className="col-sm-9 form-group">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" placeholder="50000$"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <label>Application Deadline</label>
                            </div>
                            <div className="col-sm-3 form-group">
                                <div className="calendar">
                                <input type="date" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                            <label>Exprience Level</label>
                            </div>
                            <div className="col-sm-6 input-group">
                                <input className="form-control selector border" type="text" placeholder="Select a Level" list="level"/>
                                <datalist id = "level">
                                    <option>Entry Level</option>
                                    <option>Mid Level</option>
                                    <option>Mid-Senior Level</option>
                                    <option>Top Level</option>
                                </datalist>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section mt-3">
                    <div className="row">
                        <div className="col-sm-3">
                        <label>Skills Required</label>
                        </div>
                        <div className="col-sm-6 form-group">
                            <textarea type="text" className="form-control" placeholder="Write about the Skill requirements"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                        <label>Job Summary</label>
                        </div>
                        <div className="col-sm-9 form-group">
                            <textarea type="text" className="form-control" placeholder="Write few lines about the Job"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                        <label>Key Responsibilities:</label>
                        </div>
                        <div className="col-sm-9 form-group">
                            <textarea type="text" className="form-control" placeholder="Write few lines about the Job Responsibilities"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                        <label>Minimum Requirements:</label>
                        </div>
                        <div className="col-sm-9 form-group">
                            <textarea type="text" className="form-control" placeholder="Write few lines about the Job Requirements"/>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <label>
                        <input className="formFieldCheckbox" type="checkbox" name="hasAgreed"/>{"  "}
                            You agree to our <a href="none">Terms of Use</a> and <a href="none">Privacy Policy</a> and acknowledge that you are the rightful owner of this item and using Trade to find a genuine buyer.
                    </label>
                    <div className="buttons">
                        <a href="none" className="btn btn-primary mr-3">Post Your Job</a>
                        <a href="none" className="btn btn-secondary">Cancle</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    </>);
  }
}

export default PostJobs;
