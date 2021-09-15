import React, { Component } from "react";

export default class Footer extends Component {
 
    render()
    {
      return (
      <div id="footer">
        <div className="footer-top">
        <div className="m-2">
          <div className="row">
            <div className="col-lg col-md-6 footer-links" >
              <h4>Useful Links</h4>
              <ul>
                <li><i className="fa fa-chevron-right"></i> <a href="/">Home</a></li>
                <li><i className="fa fa-chevron-right"></i> <a href="/">About us</a></li>
                <li><i className="fa fa-chevron-right"></i> <a href="/">Services</a></li>
                <li><i className="fa fa-chevron-right"></i> <a href="/">Terms of service</a></li>
                <li><i className="fa fa-chevron-right"></i> <a href="/">Privacy policy</a></li>
              </ul>
            </div>
  
            <div className="col-lg col-md-6 footer-links" >
              <h4>Our Services</h4>
              <ul>
                <li><i className="fa fa-chevron-right"></i> <a href="/">Web Design</a></li>
                <li><i className="fa fa-chevron-right"></i> <a href="/">Web Development</a></li>
                <li><i className="fa fa-chevron-right"></i> <a href="/">Product Management</a></li>
                <li><i className="fa fa-chevron-right"></i> <a href="/">Marketing</a></li>
                <li><i className="fa fa-chevron-right"></i> <a href="/">Graphic Design</a></li>
              </ul>
            </div>
  
            <div className="col-lg col-md-6 footer-links">
              <h4>Our Social Networks</h4>
              <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
              <div className="social-links mt-3">
                <a href="/" ><i className="fa fa-twitter"></i></a>
                <a href="/" ><i className="fa fa-facebook"></i></a>
                <a href="/" ><i className="fa fa-instagram"></i></a>
                <a href="/" ><i className="fa fa-skype"></i></a>
                <a href="/" ><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
  
          </div>
        </div>
      </div>
  
      <div className="container py-4">
        <div className="copyright">
          &copy; Copyright <strong><span></span></strong>.
        </div>
        <div className="credits">
        </div>
      </div>
      </div>
      );
    }
  }