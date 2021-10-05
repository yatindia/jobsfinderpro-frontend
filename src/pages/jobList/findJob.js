import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import '../style.css'

import { API_URL } from "../../components/utils";
import Listing from "./listing";

export default function FindJobs ({location}) {

    const history = useHistory();
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [fetch,setfetch] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit] = useState(5)
    const [search, setSearch] = useState({
        jobTitle: "",
        jobType:"",
        jobCity: "",
        skip:skip,
        limit:limit
    })
   
// ---On mount function -----
    useEffect(()=>{
        const param = new URLSearchParams(location.search);
        const loc = param.get('loc');
        if(!loc===''){
            setSearch({...search,jobCity:loc})
            getJob()
            console.log(search)
        }
    },[])

 
// ---On Change function -----
    const changeHandle = (e) => {
        setSearch({...search,[e.target.name]: e.target.value})
    }

// -----Get Job--------
const getJob =async()=>{
    try {
        const res = await axios.post(`${API_URL}/job/search`,search,{headers:header})
        setfetch(res.data)
    } catch (error) {        
    }
}

// -----on search--------
    const handleSubmit=async()=>{
     getJob()
    }

// ---other function -----
    const loadMore =()=>{
        setSkip(...skip+limit)
        setSearch({...search,skip:skip})
        getJob()
    }

    const clear =()=>{
        setSearch({jobs:'',location:''})
        history.push('/jobs?search=');
        window.location.reload()
    }

    return (<>
    <div>
        {/* -----Search Bar------ */}
        <div className="container-flex m-2 p-5">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-10">
                    <div className="row">
                        <div className="col-lg col-md col-sm p-1 input-group">
                        <input className="form-control selector border"  type="text" name="jobTitle" value={search.jobTitle}
                          onChange={changeHandle} list="browsers" placeholder ="Title..."/>
                          <span className="input-group-append">
                              <div className="input-group-text"><i className="fa fa-search text-info"></i></div>
                          </span>
                        </div> 
                        <div className="col-lg col-md col-sm p-1 input-group">
                                <select className="form-control selector border" type="text" placeholder="Select a Level" list="level"
                                name="jobType" value={search.jobType} onChange={changeHandle}>
                                     <option placeholder="select"></option>
                                    <option>Entry Level</option>
                                    <option>Mid Level</option>
                                    <option>Mid-Senior Level</option>
                                    <option>Top Level</option>
                                </select>
                            </div>
                    </div>
                    <div className='row d-flex m-3 justify-content-center align-content-center'>
                        <div className="col-lg col-md col-sm p-1 input-group">
                        <input className="form-control selector border"  type="text" name="jobCity" value={search.jobCity}
                          onChange={changeHandle} list="browsers1" placeholder ="Locations..."/>
                          <span className="input-group-append">
                              <div className="input-group-text"><i className="fa fa-map-marker text-info"></i></div>
                          </span>
                        </div>
                        <div className="col-lg-4 mt-1 ">
                          <button className="btn btn-findJob" onClick={handleSubmit}>Find Jobs</button>
                          <button className="btn btn-info ml-2" onClick={clear}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* ------Content--------- */}
        <div className="container-flex m-3 p-2">
        {fetch ?(
            <div>
            {fetch.map((data,id)=>(
            <div>
                <Listing data={data}></Listing>
            {/* <div className='row'> <button className="btn btn-findJob" onClick={loadMore}>Load</button></div> */}
            </div>
            ))}  
            </div>):<label>Loading..</label>}
        </div>
    </div>
    </>);
}