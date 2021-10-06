import React, { useEffect, useState } from "react";
import axios from "axios";
import '../style.css'

import { API_URL } from "../../components/utils";
import Listing from "./listing";

export default function FindJobs ({location}) {

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
        if(!loc===null){
            setSearch({...search,jobCity:loc})
            getJob()
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
        console.log(search)
     getJob()
    }

// ---other function -----
    const loadMore =()=>{
        setSkip(skip+limit)
        setSearch({...search,skip:skip})
        console.log(skip)
        getJob()
    }


    return (<>
    <div>
        {/* -----Search Bar------ */}
        <div className="container-fluid m-2 p-2 ">
            <div className="row justify-content-center p-2 m-2">
                <div className="col-lg col-md col-sm p-1">
                    <input className="form-control selector border"  type="text" name="jobTitle" value={search.jobTitle}
                        onChange={changeHandle} list="browsers" placeholder ="Title..."/>
                </div> 
                <div className="col-lg col-md col-sm p-1 ">
                    <select className="form-control selector border" type="text" placeholder="Select a Level" list="level"
                    name="jobType" value={search.jobType} onChange={changeHandle}>
                        <option value=''>Select Level...</option>
                        <option>Entry Level</option>
                        <option>Mid Level</option>
                        <option>Mid-Senior Level</option>
                        <option>Top Level</option>
                    </select>
                </div>
                <div className="col-lg col-md col-sm p-1 input-group">
                    <input className="form-control selector border"  type="text" name="jobCity" value={search.jobCity}
                    onChange={changeHandle} list="browsers1" placeholder ="Locations..."/>
                    <span className="input-group-append">
                        <div className="input-group-text"><i className="fa fa-map-marker text-info"></i></div>
                    </span>
                </div>
                <div className="m-1">
                    <button className="btn btn-findJob" onClick={handleSubmit}>Find Jobs</button>
                </div>
            </div>
        </div>

        {/* ------Content--------- */}
        <div className="container-flex m-3 p-2">
        {fetch ?(
            <div>
                {fetch.map((data,id)=>(
                <div key={id}>
                    <Listing data={data}></Listing>
                </div>
            ))}<div className='row justify-content-center'> <button className="m-2 btn btn-findJob" onClick={loadMore}>Load</button></div>  
            </div>):<label>Loading..</label>}
        </div>

    </div>
    </>);
}