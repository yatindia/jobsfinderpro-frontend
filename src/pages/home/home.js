import React, { Component } from "react";
import welo from '../../components/asserts/hero-img.svg'

import TopHiring from "./component/banner";

export default class Home extends Component {

  render() 
  {
    return (<>
<section id="welcome" className="d-flex align-items-center">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1">
                    <h1>Bettter digital experience with Ninestars</h1>
                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                    <a href="about" className="btn-get-started scrollto">Get Started</a>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 welcome-img">
                    <img src={welo} className="img-fluid animated" alt=""/> 
                </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-lg">
                  <div className="row">
                       <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text"   placeholder="Job Title" list="browsers"/>
                        <span className="input-group-append">
                            <div className="input-group-text"><i className="fa fa-search text-info"></i></div>
                        </span>
                      </div> 
                      <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text"  placeholder="Job Location" list="browsers1"/>
                        <span className="input-group-append">
                            <div className="input-group-text"><i className="fa fa-search text-info"></i></div>
                        </span>
                      </div>
                  </div>
              </div>
            </div>
        </div>
    </section>
    <TopHiring></TopHiring>
    </>);
  }
}