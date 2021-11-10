import React, { Component } from "react";

export default class Footer extends Component {
 
    render()
    {
      return (
      <div id="footer" className="mt-5 py-4">
        <div className="footer-top">
        <div className="m-auto container justify-content-center ">
          <div className ="row m-2 p-2">
            <div className="col-sm-8 col-md-8 col-lg-8 m-2">
              <div className="row mb-5">
                  <input className="form-control" type="text" size="50" placeholder="Subscribe Your E-Mail to Get News!"></input>
              </div>
              <div className="row pt-3 contacts">
                <h2>Make It Happen</h2>
                <h3>Talk to Us</h3>
                <p>support@jobs.com</p>
              </div>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 justify-content-center m-2">
              <div className='row'>
                <button type="button" className="btn btn-findJob">Subscribe</button>
              </div>
              <div className='row mt-5 pt-3'>
              <h2>Follow Us on..</h2>
                <div className="social-links mt-3">
                  <a href="/" ><i className="fa fa-twitter  fa-2x"></i></a>
                  <a href="/" ><i className="fa fa-facebook fa-2x"></i></a>
                  <a href="/" ><i className="fa fa-linkedin fa-2x"></i></a>
                </div>
              </div>
            
            </div>
          </div>
          <div className ="row ml-auto text-right m-2 p-2">
            <div className="col">
            <a className="pr-4 btn-upload" href="/">Disclaimer </a>
            <a className="btn-upload" href="/">Privacy Policy</a>
            </div>
  
          </div>
        </div>
      </div>
      <div className="brderline"></div>
  
      <div className="container py-2">
        <div className="copyright">
        <strong>Designed and Developed by YAT INDIA<span></span></strong>
          {/* &copy; <strong>Copyright<span></span></strong>. */}
        </div>
        <div className="credits">
        </div>
      </div>
      </div>
      );
    }
  }