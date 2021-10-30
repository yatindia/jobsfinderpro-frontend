import React, {useEffect, useState } from "react";
import './style.css'
import { useHistory } from "react-router-dom";

import welo from '../components/asserts/hero-img.svg'
import TopHiring from "./home/topHire";
import Trending from "./home/trending";
import SearchCate from "./home/searchCate";


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
      history.push('/jobs?kwds='+search.jobTitle+'&loc=');
    }
  }


    return (<>
    {/* {active === "top" ? */}
    <div>
      <div id="welcome">
        <div className="container-flex">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-6 p-5 m-2 text-center order-2">
                    <div className='row justify-content-center'>
                      <h1>Better digital experience with Ninestars</h1>
                      <h2>We are team of talented designers making websites with Bootstrap</h2>
                    </div>
                    <div className='row justify-content-center m-4'>
                        <div className="col-lg  p-2">
                        <input className=" formFieldInput text-capitalize"  type="text" name="jobTitle"
                          onChange={changeHandle} placeholder="Job Title ..." list="locate"/>
                        </div>
                        <div className="col-sm-2 p-2 align-items-center m-auto">
                          <button className="btn border-0 effect" onClick={handleSubmit}><b>Search</b></button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 order-1 m-3 welcome-img">
                    <img src={welo} className="img-fluid animated" alt="ff"/> 
                </div>
            </div>
        </div>
    </div>
    <div>
      <TopHiring></TopHiring>
      {/* <Trending ></Trending> */}
      <div className='mt-5 pt-4'>
      <SearchCate></SearchCate>
      </div>
    </div>
  </div>
  {/* :""} */}
  </>);
}

export default Lander;