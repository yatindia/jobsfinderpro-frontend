import React, {useEffect, useState } from "react";
import './style.css'
import { useHistory } from "react-router-dom";

import welo from '../components/asserts/hero-img.svg'
import TopHiring from "./home/topHire";
import Trending from "./home/trending";

import data from '../components/asserts/data.json'


const Lander =()=> {

  const [search, setSearch] = useState({
    jobs: "",
    location: "",})

  const history = useHistory();


  const changeHandle = (e) => {
      setSearch({...search,[e.target.name]: e.target.value})
  }

  useEffect(()=>{
  })


  const handleSubmit=()=>{
      if(search.jobs === "" && search.location === ""){
        history.push('/search?=');
      }else if(search.jobs !== "" || search.location!==''){
        history.push('/jobs?kwds='+search.jobs +'&loc='+search.location);
      }
      else {
        return null
      }
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
                    <div className="row">
                        <div className="col-lg col-md col-sm p-1 input-group">
                        <input className="form-control selector border"  type="text" name="jobs"
                          onChange={changeHandle}  placeholder="Company, Title, Keywords " list="job"/>
                          {data.length > 0 ? (
                           <datalist id = "job">
                                {Array.from(new Set(data.map(item=>item.level))).map((level,i)=>(<option key={i} value={level}>Level: {level}</option>))}
                                {Array.from(new Set(data.map(item=>item.contract))).map((contract,i)=>(<option key={i} value={contract}>Mode: {contract}</option>))}
                                {Array.from(new Set(data.map(item=>item.company))).map((company,i)=>(<option key={i} value={company}>Company: {company}</option>))}
                                </datalist>):null}
                          <span className="input-group-append">
                              <div className="input-group-text"><i className="fa fa-search text-info"></i></div>
                          </span>
                        </div> 
                        <div className="col-lg col-md col-sm p-1 input-group">
                        <input className="form-control selector border"  type="text" name="location"
                          onChange={changeHandle} placeholder="Job Location" list="locate"/>
                           {data.length > 0 ? (
                           <datalist id = "locate">
                                {Array.from(new Set(data.map(item=>item.location))).map((location,i)=>(<option key={i} value={location}>{location}</option>))}
                                </datalist>):null}
                          <span className="input-group-append">
                              <div className="input-group-text"><i className="fa fa-map-marker text-info"></i></div>
                          </span>
                        </div>
                        <div className="col-sm-2 mt-1">
                          <button className="btn btn-findJob form-control" onClick={handleSubmit}>Find Jobs</button>
                        </div>
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