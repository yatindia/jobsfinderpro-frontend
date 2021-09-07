import React, { useEffect, useState } from "react";

import data from '../../components/asserts/data.json'

function FindJobs ({keywords}) {
    const [filterData, setFilterData] = useState({})
    const [search, setSearch] = useState({
        jobs: "",
        location: "",})


    useEffect(()=>{
        const job = keywords.jobs
        const loca = keywords.location
        if(keywords ===''){
            return null
        }
        else {
            const jobFilter=data.filter(view => {
                const company = view.company
                const position = view.position
                const level = view.level
                const contract = view.contract
                const languages = view.languages
                const info = company + position + level + contract + languages
                return info.trim().toLowerCase().includes(job.trim().toLowerCase())
            });
            const locaFilter = jobFilter.filter((view) => view.location.toLowerCase().includes(loca.toLowerCase()) )
            setFilterData(locaFilter)
        }
    },[keywords])

    const changeHandle = (e) => {
        setSearch({...search,[e.target.name]: e.target.value})
    }

    const handleSubmit=()=>{
        const job = search.jobs
        const loca = search.location
        if(search ===''){
            return null
        }
        else {
            const jobFilter=data.filter(view => {
                const company = view.company
                const position = view.position
                const level = view.level
                const contract = view.contract
                const languages = view.languages
                const info = company + position + level + contract + languages
                return info.trim().toLowerCase().includes(job.trim().toLowerCase())
            });
            const locaFilter = jobFilter.filter((view) => view.location.toLowerCase().includes(loca.toLowerCase()) )
            setFilterData(locaFilter)
        }
    }


    return (<><div>
        <div className="container">
            <div className="row d-flex justify-content-center shadow">
                <div className="col-lg">
                    <div className="row">
                        <div className="col-lg col-md col-sm p-1 input-group">
                        <input className="form-control selector border"  type="text" name="jobs" defaultValue={keywords.jobs}
                          onChange={changeHandle}  placeholder="Company, Title, Keywords " list="browsers"/>
                          <span className="input-group-append">
                              <div className="input-group-text"><i className="fa fa-search text-info"></i></div>
                          </span>
                        </div> 
                        <div className="col-lg col-md col-sm p-1 input-group">
                        <input className="form-control selector border"  type="text" name="location" defaultValue={keywords.location}
                          onChange={changeHandle} placeholder="Job Location" list="browsers1"/>
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
        <div className="container mt-5"> <h5>Search Results:-</h5></div>
        {filterData.length > 0 ? (
          <div className="container border-2 mb-4 shadow">
            {filterData.map((items,key)=>(
            <div className="row d-flex justify-content-center " key={key}>
                <div className="col-md mt-2 pt-s border">
                    <div className="row z-depth-3">
                        <div className="col-sm-3 bg-info rounded-left">
                            <div className="card-block text-center text-white">
                                <img className="mt-2 img-fluid imglogo" src={items.logo} alt="sample"></img>
                                <h2 className="font-weight-bold mt-2">{items.company}</h2>
                                <p>{items.level}</p>
                                <i className="far-fa-edit fa-2x mb-2"></i>
                            </div>
                        </div>
                        <div className="col-sm-9 bg-white rounded-right">
                            <h3 className="mt-3 text-start">{items.position}</h3>
                            <div className="row">
                                <div className="col-sm">
                                    <p className="font-weight-bold">Location</p>
                                    <h6 className="text-muted">{items.location}</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Posted On</p>
                                    <h6 className="text-muted">{items.postedAt}</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Contract type</p>
                                    <h6 className="text-muted">{items.contract}</h6>
                                </div>
                                <div className="col-sm">
                                    <button className="btn btn-outline-info ">View</button>
                                </div>
                            </div>
                            <hr className="bg-primary"/>
                            <ul className="list-unstyled d-flex justify-content-start">
                            <h5 className="">Skills:</h5>
                            {items.languages.map((country, idx)=>(
                                <li><i className="h5 m-2 text-muted" key={idx}>{country}</i></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
             ))} 
        </div>
        ):<h4 className="text-danger text-center m-5">No Jobs available for your search keywords</h4>}  

    </div></>);
}

export default FindJobs;