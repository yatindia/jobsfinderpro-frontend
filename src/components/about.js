import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";

export default class About extends Component {
 
    render()
    {
      return (<>
      <NavBar/>
      <div className="mt-5 py-4">
          <div className="container p-2">
              <h5 className="row text-center mb-3"><u>About Us</u>:</h5>
                <div className="bg-white border p-3">
                    <p>&emsp;&emsp;At JobsFinderPro, We’ve been giving people the tools they need to find
                        personal success for the hundreds of thousands of employers seeking
                        great talent to the millions of jobseekers out there looking for the
                        right opportunities.</p>
                    <p>We understand the needs of companies of any sector, not only IT, big
                        and small, when it comes to finding, hiring, and managing talent. So
                        we’re always adapting innovative solutions for everything from
                        recruiting to employment screenings and human capital management.</p>
                    <p> Soon to be an industry leader, we use the latest technologies, software
                        and services to fit your company’s hiring needs so your team can
                        succeed. </p>
                    <p>We are so proud that, by using JobsFinderPro, everyone from every
                        sector can find the job as they wish and make their living.</p>

                    <p><strong>Our Mission:</strong></p>

                    <p> We believe that everybody should be able to build toward a career that
                        gives them a sense of purpose.</p>
                    <p>That’s why, at JobsFinderPro, it’s our mission to build personal
                        success for all. We work to provide tools and opportunities to let
                        everybody find meaning and value in their work, no matter their skill,
                        background, or starting point.</p>
                    <p>Because more meaningful matches between people and employers means
                        everybody wins.</p>
               </div>
          </div>
      </div>
      <Footer/>
      </>);
    }
  }