import React, { Component } from "react";
import './style.css'

import Home from "./home/home";
import Jobs from "./home/jobs";
import data from '../components/asserts/data.json'

class Lander extends Component {
  render() {
    return (<>
      <Home></Home>
      <div className="container mb-4 mt-4">
        <h3 className="text-center">Top Trend Jobs</h3>
        <Jobs items={data}></Jobs>
      </div> 
  </>);
  }
}

export default Lander;