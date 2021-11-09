import React, { Component } from "react";

export default class Footer extends Component {
 
    render()
    {
      return (
      <div id="footer" className="mt-5 py-4">
        <div className="footer-top">
        <div className="m-2">
          <div className="row justify-content-center text-center">  
            <div className="col footer-links">
              <h4>Our Social Networks</h4>
              <p>Follow Us on..</p>
              <div className="social-links mt-3">
                <a href="/" ><i className="fa fa-twitter"></i></a>
                <a href="/" ><i className="fa fa-facebook"></i></a>
                <a href="/" ><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
  
          </div>
        </div>
      </div>
      <div className="brderline"></div>
  
      <div className="container py-2">
        <div className="copyright">
          &copy; <strong>Copyright<span></span></strong>.
        </div>
        <div className="credits">
        </div>
      </div>
      </div>
      );
    }
  }