import React, { useEffect, useState } from "react";
import axios from "axios";
import '../style.css'

import { API_URL } from "../../components/utils";
import Listing from "./listing";

export default function FindJobs ({location}) {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
    
    const [count, setCount] = useState(0)
    const range = 2
    const limit = 3
    const [totalpge,setTotalpge] = useState(0)
    const [skip, setSkip] = useState(0)

    const [loadbtn, setLoadBtn] = useState(false)
    const [fetch,setfetch] = useState([])
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
        if(loc !== ''){
            setSearch({...search,jobTitle:loc})
            getJob()
        }
        setSearch({...search,skip:skip,limit:limit})
    },[skip,limit])

 
// ---On Change function -----
    const changeHandle = (e) => {
        setSearch({...search,[e.target.name]: e.target.value,skip:0,limit:3})
    }

// -----Get Job--------
    const getJob =async()=>{
        try {
            console.log(search)
            const res = await axios.post(`${API_URL}/job/search`,search,{headers:header})
            if (res.data.error===false){
                setfetch(res.data.data[0])
                setCount(res.data.data[1])
                setTotalpge(Math.ceil(res.data.data[1])/limit)
                if(limit<res.data.data[1]){
                    setLoadBtn(true)
                }
                else{setLoadBtn(false)}
            }
        } catch (error) {        
        }
    }

// -----on search--------
    const handleSubmit=async()=>{
     setSearch({...search,skip:0,limit:3})
     getJob()
    }

    const loadmore=()=>{
        setSkip(prevSkip =>prevSkip + range);
        getJob()
    }




    return (<>
    <div>
        {/* -----Search Bar------ */}
        <div className="container-fluid m-2 p-2 ">
            <div className="row justify-content-center p-2 m-2">
                <div className="col-lg col-md col-sm p-1">
                    <input className="form-control formFieldInput text-capitalize"  type="text" name="jobTitle" value={search.jobTitle}
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
                    <input className="form-control formFieldInput text-capitalize"  type="text" name="jobCity" value={search.jobCity}
                    onChange={changeHandle} list="browsers1" placeholder ="Locations..."/>
                </div>
                <div className="m-1">
                    <button className="btn btn-findJob" type="button" onClick={handleSubmit}>Find Jobs</button>
                </div>
            </div>
        </div>

        {/* ------Content--------- */}
        <div className="container-flex m-3 p-2">
        {fetch.length>0 ?(
            <div className="row d-flex justify-content-center" >
                <div className="col-md-10 mt-2">
                <h5 className="text-muted">{count} Results Found:-</h5>
                {fetch.map((data,id)=>(
                <div key={id}>
                    <Listing data={data}></Listing>
                </div>
            ))}<div className='row justify-content-center'> 
                    {loadbtn===true ?
                         <button className="m-2 btn btn-findJob" type="button" onClick={loadmore}>Next {' >>'}</button>
                        // <Pagination
                        //     itemClass="page-item"
                        //     linkClass="page-link" 
                        //     activePage={skip}
                        //     itemsCountPerPage={limit}
                        //     totalItemsCount={length}
                        //     pageRangeDisplayed={pageRange}
                        //     onChange={loadMore}
                        // />
                    :<h5 className="text-info m-1">End of the result</h5>}
                </div> 
                </div>
            </div>):<div><h4 className="text-info text-center m-5">No Jobs available for your search keywords</h4></div>}
        </div>

    </div>
    </>);
}