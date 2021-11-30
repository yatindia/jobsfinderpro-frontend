import React, { Component } from "react";

export default class Footer extends Component {
 
    render()
    {
      return (
      <div id="footer" className="mt-5 py-4">
        <div className="footer-top">
          <div className="container mt-4 pt-3">
            <div className="row container-fluid justify-content-center ">
              <div className="col-sm-8">
                  <h2>Make It Happen</h2>
                  <h3 className="mt-3">Talk to Us</h3>
                  <p className="mt-3">support@jobsfinderpro.com</p>
              </div>
              <div className="col-sm-3 m-auto text-right">
              <h2>Follow Us on..</h2>
                <div className="social-links mt-3">
                    <a href="/" ><i className="fa fa-twitter  fa-2x"></i></a>
                    <a href="/" ><i className="fa fa-facebook fa-2x"></i></a>
                    <a href="/" ><i className="fa fa-linkedin fa-2x"></i></a>
                </div>
              </div>
            </div>
            <div className ="row m-2 p-2 container-fluid">
              <div className="col m-auto text-right footerEnd">
                <a className="btn-upload mr-2" href="/terms">Terms of Use </a>
                <a className="btn-upload " href="/privacy_policy">Privacy Policy</a>
              </div>
          </div>
          </div>
        </div>
        {/* <div className="footer-top">
        <div className="container justify-content-center ">
          <div className ="container row m-2 p-2">
            <div className="col-sm-8 col-md-8 col-lg-8 m-2">
              <div className="row contacts">
                <h2>Make It Happen</h2>
                <h3>Talk to Us</h3>
                <p>support@jobs.com</p>
              </div>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 justify-content-center m-2">
              <div className='row'>
              <h2>Follow Us on..</h2>
                <div className="social-links mt-3">
                  <a href="/" ><i className="fa fa-twitter  fa-2x"></i></a>
                  <a href="/" ><i className="fa fa-facebook fa-2x"></i></a>
                  <a href="/" ><i className="fa fa-linkedin fa-2x"></i></a>
                </div>
              </div>
            
            </div>
          </div>
          <div className="">  
          <div className ="row m-2 p-2 ">
            <div className="col ml-auto text-right">
            <a className="" href="/">Disclaimer </a>
            <a className="" href="/">Privacy Policy</a>
            </div>
          </div>
  
          </div>
        </div>
      </div> */}
      <div className="brderline"></div>
  
      <div className="container py-2">
        <div className="copyright">
        {/* <strong>Designed and Developed by YAT INDIA<span></span></strong> */}
          &copy; <strong>Copyright<span></span></strong>.
        </div>
        <div className="credits">
        </div>
      </div>
      </div>
      );
    }
  }