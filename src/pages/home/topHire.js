import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import './style.css'

import sam1 from '../../components/asserts/sam1.png'
import sam2 from '../../components/asserts/sam2.png'

export default class TopHiring extends Component {

  render() 
  {
    return (<>
            <div className="mt-4 pt-3 container company">
                <div className="text-center">
                    <h5 className="mb-0 text-secondary">Top Hiring Companies</h5>
                </div>
                <div className="slider">
                    <div className="slide-track">
                        <div className="slide">
                            <img src={sam1} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam1} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam2} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam2} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam1} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam1} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam2} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam1} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam1} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam2} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam2} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam1} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam2} alt="" />
                        </div>
                        <div className="slide">
                            <img src={sam1} alt="" />
                        </div>
                    </div>
                </div>
                {/* <div className="row company mt-3 border">
                    <Carousel>
                    <Carousel.Item interval={2000}>
                        <div className="slide">
                    <div className="col-lg-3 col-md-3 mb-2">
                        <div className="">
                            <div  className="company">
                                <img src={sam1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 mb-2">
                        <div className="">
                            <div  className="company">
                                <img src={sam2} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 mb-2">
                        <div className="">
                            <div  className="company">
                                <img src={sam1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 mb-2">
                        <div className="">
                            <div  className="company">
                                <img src={sam2} alt="" />
                            </div>
                        </div>
                    </div>
                    </div>
                    </Carousel.Item>
                    <Carousel.Item  interval={2000}>
                    <div className="slide">
                    <div className="col-lg-3 col-md-3 mb-2">
                        <div className="">
                            <div  className="company">
                                <img src={sam2} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 mb-2">
                        <div className="">
                            <div  className="company">
                                <img src={sam1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 mb-2">
                        <div className="">
                            <div  className="company">
                                <img src={sam2} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 mb-2">
                        <div className="">
                            <div  className="company">
                                <img src={sam1} alt="" />
                            </div>
                        </div>
                    </div>
                    </div>
                    </Carousel.Item>
                    </Carousel>
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
                </div> */}
            </div>
    </>);
  }
}