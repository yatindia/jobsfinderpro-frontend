import React, { Component } from "react";


class EmpAuth extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const user = localStorage.getItem('Role_Type')
    if (user==="employer"){
      this.props.history.push('/employers/dashboard')
      window.location.reload() }  
  else{
    this.props.history.push('/employers')
  }
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
    event.preventDefault();
    if (this.state.email==="bungalowarch3d@gmail.com" && this.state.password==="prs"){
      localStorage.setItem('employ_email',this.state.email)
      localStorage.setItem('Role_Type','employer')
      this.props.history.push('/employers/dashboard')
      window.location.reload()
    }else{
      console.log("failed")
    }
  }

  render() {
    return (<>
      <div className="App d-flex">
        <div className="appAside" />
          <div className="appForm">
              <div label="Sign-In">
                <div className="formCenter">
                  <form className="formFields" onSubmit={this.handleSubmit}>
                  <div className="formField">
                      <label className="text-secondary h4" >Registered Employers Login here</label>
                    </div>
                    <div className="formField">
                      <label className="formFieldLabel" htmlFor="email">
                        E-Mail Address
                      </label>
                      <input
                        type="email"
                        id="email" required='True'
                        className="formFieldInput"
                        placeholder="Enter your email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="formField">
                      <label className="formFieldLabel" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password" required='True'
                        className="formFieldInput"
                        placeholder="Enter your password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="formField">
                      <button className="formFieldButton" type="submit">Sign In</button>{" "}
                      <a href="/register" className="formFieldTermsLink">Create new Account </a>
                    </div>
                  </form>
                </div>
              </div>
      </div>
    </div>
   </> );
  }
}

export default EmpAuth;
