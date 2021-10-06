import React, {useEffect, useState } from "react";
import './style.css'
import { useHistory } from "react-router-dom";

import welo from '../components/asserts/hero-img.svg'
import TopHiring from "./home/topHire";
import Trending from "./home/trending";


const Lander =()=> {

  const [search, setSearch] = useState({
    jobs: "",
    jobTitle: "",})

  const history = useHistory();


  const changeHandle = (e) => {
      setSearch({...search,[e.target.name]: e.target.value})
  }

  useEffect(()=>{
  
  },[])


  const handleSubmit=()=>{
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    if(!profile_1){
      history.push('/login');
    }else{
      history.push('/jobs?kwds=&loc='+search.jobTitle);
    }
  }


    return (<>
    {/* {active === "top" ? */}
    <div>
      <div id="welcome">
        <div className="container-flex">
            <div className="row">
                <div className="col-lg-6 p-5 m-2 text-center order-2">
                    <div className='row'>
                      <h1>Better digital experience with Ninestars</h1>
                      <h2>We are team of talented designers making websites with Bootstrap</h2>
                    </div>
                    <div className='row m-4 p-4'>
                        <div className="col-lg  p-2">
                        <input className=" formFieldInput"  type="text" name="jobTitle"
                          onChange={changeHandle} placeholder="Job Title" list="locate"/>
                        </div>
                        <div className="col-sm-2 p-2">
                          <button className="btn border-0 effect" onClick={handleSubmit}><b>Search</b></button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 order-1 m-3 welcome-img">
                    <img src={welo} className="img-fluid animated" alt="ff"/> 
                </div>
            </div>


            {/* <div className="container-flex">
            <div className="row m-auto justify-content-center">
                <div className="col m-auto justify-content-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 col-sm-6 p-1 input-group">
                        <input className="form-control selector border"  type="text" name="jobCity"
                          onChange={changeHandle} placeholder="Job Location" list="locate"/>
                          <span className="input-group-append">
                              <div className="input-group-text"><i className="fa fa-map-marker text-info"></i></div>
                          </span>
                        </div>
                        <div className="col-sm-2 mt-1">
                          <button className="btn btn-findJob form-control" onClick={handleSubmit} disabled={loged}>Find Jobs</button>
                        </div>
                    </div>
                </div>
              </div>
            </div> */}
        </div>
    </div>
    <div>
      <TopHiring></TopHiring>
      <Trending ></Trending>
    </div>
  </div>
  {/* :""} */}
  </>);
}

export default Lander;