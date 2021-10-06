import React, { useEffect, useState } from "react";
import axios from "axios";
import '../style.css'

import { API_URL } from "../../components/utils";
import Listing from "./listing";

export default function FindJobs ({location}) {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [loadbtn, setLoadBtn] = useState(false)

    const [fetch,setfetch] = useState([])
    const [length, setLength] = useState(0)
    const [skip, setSkip] = useState(0)
    const [limit] = useState(3)
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
        setSearch({...search,jobTitle:loc})
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
        setLength(res.data.length)
        if(res.data.length<limit){
            setLoadBtn(false)
        }
        else{setLoadBtn(true)}
    } catch (error) {        
    }
}

// -----on search--------
    const handleSubmit=async()=>{
     getJob()
    }

// ---other function -----
    const loadMore =()=>{
        if(limit>length){
            setSkip(skip+limit)
            setSearch({...search,skip:skip})
            getJob()
        }
        console.log(search)
    }


    return (<>
    <div>
        {/* -----Search Bar------ */}
        <div className="container-fluid m-2 p-2 ">
            <div className="row justify-content-center p-2 m-2">
                <div className="col-lg col-md col-sm p-1">
                    <input className="form-control formFieldInput"  type="text" name="jobTitle" value={search.jobTitle}
                        onChange={changeHandle} list="browsers" placeholder ="Title..."/>
                </div> 
                <div className="col-lg col-md col-sm p-1 ">
                    <select className="form-control formFieldInput" type="text" placeholder="Select a Level" list="level"
                    name="jobType" value={search.jobType} onChange={changeHandle}>
                        <option value=''>Select Level...</option>
                        <option>Entry Level</option>
                        <option>Mid Level</option>
                        <option>Mid-Senior Level</option>
                        <option>Top Level</option>
                    </select>
                </div>
                <div className="col-lg col-md col-sm p-1 input-group">
                    <input className="form-control formFieldInput"  type="text" name="jobCity" value={search.jobCity}
                    onChange={changeHandle} list="browsers1" placeholder ="Locations..."/>
                </div>
                <div className="m-1">
                    <button className="btn btn-findJob" onClick={handleSubmit}>Find Jobs</button>
                </div>
            </div>
        </div>

        {/* ------Content--------- */}
        <div className="container-flex m-3 p-2">
        {fetch.length>0 ?(
            <div>
                {fetch.map((data,id)=>(
                <div key={id}>
                    <Listing data={data}></Listing>
                </div>
            ))}<div className='row justify-content-center'> {loadbtn===true ?<button className="m-2 btn btn-findJob" onClick={loadMore}>Next</button>:''}</div>  
            </div>):<div><h4 className="text-danger text-center m-5">No Jobs available for your search keywords</h4></div>}
        </div>

    </div>
    </>);
}