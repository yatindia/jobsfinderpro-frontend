import React, { Component } from "react";
import {
  FacebookLoginButton,
  InstagramLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import TabView from '../../components/tabView'
import NavBar from "../../components/navBar";
import Welcome from "../../components/welcome";


class UserAuth extends Component {
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

  componentDidMount(){
    const mail = localStorage.getItem('user_email')
    if(mail !== null){
      this.props.history.push('/users/dashboard')
    }else{
      this.props.history.push('/users')
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    if (this.state.email==="prsnthmailbox@gmail.com" && this.state.password==="prs"){
      localStorage.setItem('user_email',this.state.email)
      this.props.history.push('/users/dashboard')
    }else{
      console.log("failed")
    }
  }

  render() {
    return (<>
    <NavBar/>
      <div className="App d-flex">
        <div className="appAside" >
        <Welcome/>
        </div>
          <div className="appForm">
            <TabView>
              <div label="Sign-In">
                <div className="formCenter">
                  <form className="formFields" onSubmit={this.handleSubmit}>
                    <div className="formField">
                      <label className="formFieldLabel" htmlFor="email">
                        E-Mail Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="formFieldInput"
                        placeholder="Enter your email"
                        name="email" required='True'
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
                        id="password"
                        className="formFieldInput"
                        placeholder="Enter your password"
                        name="password" required='True'
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="formField">
                      <button className="formFieldButton" type="submit">Sign In</button>{" "}
                    </div>

                    
                    <div className="socialMediaButtons">
                    <div className="googleButton m-2">
                        <GoogleLoginButton onClick={() => alert("Hello")} />
                      </div>
                      <div className="facebookButton m-2">
                        <FacebookLoginButton onClick={() => alert("Hello")} />
                      </div>

                      <div className="instagramButton m-2">
                        <InstagramLoginButton onClick={() => alert("Hello")} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>


              <div label="Sign-Up">
               <div className="formCenter">
                <form onSubmit={this.handleSubmit} className="formFields">
                  <div className="formField">
                    <label className="formFieldLabel" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="formFieldInput"
                      placeholder="Enter your full name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="formField">
                    <label className="formFieldLabel" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="formFieldInput"
                      placeholder="Enter your password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="formField">
                    <label className="formFieldLabel" htmlFor="email">
                      E-Mail Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="formFieldInput"
                      placeholder="Enter your email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="formField">
                    <label className="formFieldCheckboxLabel">
                      <input
                        className="formFieldCheckbox"
                        type="checkbox"
                        name="hasAgreed"
                        value={this.state.hasAgreed}
                        onChange={this.handleChange}
                      />{" "}
                      I agree all statements in{" "}
                      <a href="null" className="formFieldTermsLink">
                        terms of service
                      </a>
                    </label>
                  </div>

                  <div className="formField">
                    <button className="formFieldButton">Sign Up</button>{" "}
                  </div>
                </form>
              </div>
              </div>
          </TabView>
      </div>
    </div>
    </>);
  }
}

export default UserAuth;
