import React, { Component } from "react";
import '../style.css'

export default class TopHiring extends Component {

  render() 
  {
    return (<>
            <div className="container mt-5">
                <div className="text-center">
                    <h4 className="mb-0 text-secondary">Top Hiring Companies</h4>
                </div>
                <div className="row company mt-3">
                    <div className="col-lg-4 col-md-6 mb-2">
                        <div className="card text-dark border-color-light-black h-100">
                            <div className="card-body p-2 ">
                                <div className="d-flex align-items-center">
                                    <div className="mr-3 top-company">
                                        <img src="https://uzimedia.com/wp-content/uploads/2018/01/Master_Roofing_Company_Logo_Design_By_UziMedia.jpg" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0 font-size20"><a href="none" className="text-secondary">Accuratna</a></h5>
                                        <p className="mb-0">Makati City, Philippines</p>
                                        <a href="none" className="company-btn">2 Positions</a>
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
                                        <img src="https://static.vecteezy.com/system/resources/previews/000/388/900/original/modern-company-logo-design-vector.jpg" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0 font-size20"><a href="none" className="text-secondary">Creative Tech.</a></h5>
                                        <p className="mb-0">Victoria, Canada</p>
                                        <a href="none" className="company-btn">4 Positions</a>
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
                                        <img src="https://cdn.onlinewebfonts.com/svg/img_140098.png" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0 font-size20"><a href="none" className="text-secondary">Sculptena</a></h5>
                                        <p className="mb-0">London, United Kingdom</p>
                                        <a href="none" className="company-btn">8 Positions</a>
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
                                        <img src="https://anerdsworld.com/wp-content/uploads/2015/09/logo30.png" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0m font-size20"><a href="none" className="text-secondary">JAT Infra Pvt Ltd</a></h5>
                                        <p className="mb-0">Putrajaya, Malaysia</p>
                                        <a href="none" className="company-btn">1 Positions</a>
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
                                        <img src="https://static.vecteezy.com/system/resources/previews/000/176/200/original/vector-abstract-company-logo-template-design-illustration.jpg" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0 font-size20"><a href="none" className="text-secondary">Relives Healthcare</a></h5>
                                        <p className="mb-0">Utrecht, Netherlands</p>
                                        <a href="none" className="company-btn">5 Positions</a>
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
                                        <img src="https://static.vecteezy.com/system/resources/previews/000/404/753/original/modern-company-logo-design-vector.jpg" alt="" />
                                    </div>
                                    <div  className="company">
                                        <h5 className="mb-0m font-size20"><a href="none" className="text-secondary">VIAP Academy</a></h5>
                                        <p className="mb-0">Sydney, Australia</p>
                                        <a href="none" className="company-btn">6 Positions</a>
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