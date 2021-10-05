import React, {useEffect, useState } from "react";
import './style.css'
import { useHistory } from "react-router-dom";

import welo from '../components/asserts/hero-img.svg'
import TopHiring from "./home/topHire";
import Trending from "./home/trending";


const Lander =()=> {

  const [search, setSearch] = useState({
    jobs: "",
    jobCity: "",})
  const [loged, setloged] = useState(true)

  const history = useHistory();


  const changeHandle = (e) => {
      setSearch({...search,[e.target.name]: e.target.value})
  }

  useEffect(()=>{
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    if(!profile_1){
      setloged(true)
    }else{
      setloged(false)
    }
  },[])


  const handleSubmit=()=>{
    history.push('/jobs?kwds='+search.jobs +'&loc='+search.jobCity);
  }


    return (<>
    {/* {active === "top" ? */}
    <div>
      <section id="welcome" className="">
        <div className="container-flex">
            <div className="row">
                <div className="col-lg-6 pt-5 text-center order-2 welcome-img">
                    <h1>Bettter digital experience with Ninestars</h1>
                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 welcome-img">
                    <img src={welo} className="img-fluid animated" alt="ff"/> 
                </div>
            </div>


            <div className="container-flex p-5">
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
                        {/* <div className="col-sm-2 mt-1">
                          <button className="btn btn-outline-info form-control" onClick={advsearch} disabled={loged}>Advance Search</button>
                        </div> */}
                    </div>
                </div>
              </div>
            </div>
        </div>
    </section>
    <div>
      <TopHiring></TopHiring>
      <Trending ></Trending>
    </div>
  </div>
  {/* :""} */}
  </>);
}

export default Lander;