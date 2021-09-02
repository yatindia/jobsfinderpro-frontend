import React, { Component } from "react";
import '../style.css'

export default class TopHiring extends Component {

  render() 
  {
    return (<>
        <section className="mt-4">
            <div className="container">
                <div className="text-center">
                    <h3 className="mb-0">Top Hiring Companies</h3>
                </div>
                <div className="row company mt-3">
                    <div className="col-lg-4 col-md-6 mb-2">
                        <div className="card text-dark border-color-light-black h-100">
                            <div className="card-body p-2 ">
                                <div className="d-flex align-items-center">
                                    <div className="mr-3 top-company">
                                        <img src="https://www.chitrakootweb.com/template/jobboard/img/content/job-1.png" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0 font-size20"><a href="none" className="text-secondary">Accuratna</a></h5>
                                        <p className="mb-0">Makati City, Philippines</p>
                                        <a href="none" className="company-btn">2 Open Positions</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-2">
                        <div className="card text-dark border-color-light-black h-100">
                            <div className="card-body p-2">
                                <div className="d-flex align-items-center">
                                    <div className="mr-3 top-company">
                                        <img src="https://www.chitrakootweb.com/template/jobboard/img/content/job-2.png" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0 font-size20"><a href="none" className="text-secondary">Creative Tech.</a></h5>
                                        <p className="mb-0">Victoria, Canada</p>
                                        <a href="none" className="company-btn">4 Open Positions</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-2">
                        <div className="card text-dark border-color-light-black h-100">
                            <div className="card-body p-2">
                                <div className="d-flex align-items-center">
                                    <div className="mr-3 top-company">
                                        <img src="https://www.chitrakootweb.com/template/jobboard/img/content/job-3.png" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0 font-size20"><a href="none" className="text-secondary">Sculptena</a></h5>
                                        <p className="mb-0">London, United Kingdom</p>
                                        <a href="none" className="company-btn">8 Open Positions</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-2">
                        <div className="card text-dark border-color-light-black h-100">
                            <div className="card-body p-2">
                                <div className="d-flex align-items-center">
                                    <div className="mr-3 top-company">
                                        <img src="https://www.chitrakootweb.com/template/jobboard/img/content/job-4.png" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0m font-size20"><a href="none" className="text-secondary">JAT Infra Pvt Ltd</a></h5>
                                        <p className="mb-0">Putrajaya, Malaysia</p>
                                        <a href="none" className="company-btn">1 Open Positions</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-2">
                        <div className="card text-dark border-color-light-black h-100">
                            <div className="card-body p-2">
                                <div className="d-flex align-items-center">
                                    <div className="mr-3 top-company">
                                        <img src="https://www.chitrakootweb.com/template/jobboard/img/content/job-5.png" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0 font-size20"><a href="none" className="text-secondary">Relives Healthcare</a></h5>
                                        <p className="mb-0">Utrecht, Netherlands</p>
                                        <a href="none" className="company-btn">5 Open Positions</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-2">
                        <div className="card text-dark border-color-light-black h-100">
                            <div className="card-body p-2">
                                <div className="d-flex align-items-center">
                                    <div className="mr-3 top-company">
                                        <img src="https://www.chitrakootweb.com/template/jobboard/img/content/job-6.png" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0m font-size20"><a href="none" className="text-secondary">VIAP Academy</a></h5>
                                        <p className="mb-0">Sydney, Australia</p>
                                        <a href="none" className="company-btn">6 Open Positions</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
  }
}