import React, { useEffect, useState } from "react";

import data from '../../components/asserts/data.json'

function FindJobs ({...props}) {
    const [filterData, setFilterData] = useState({})
    const [search, setSearch] = useState({
        jobs: "",
        location: "",})

    const getdata = props.location.keyword || ''
console.log(props)
// ---On mount function -----
    useEffect(()=>{
        const job = getdata.jobs
        const loca = getdata.location
        if(getdata ==='' || getdata=== undefined){
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
    },[getdata])

 
// ---On Change function -----
    const changeHandle = (e) => {
        setSearch({...search,[e.target.name]: e.target.value})
    }

    const handleSubmit=()=>{
        const job = search.jobs
        const loca = search.location
        if(search ==='' || search=== undefined){
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
        {/* -----Search Bar------ */}
        <div className="container mt-5">
            <div className="row d-flex justify-content-center shadow">
                <div className="col-lg">
                    <div className="row">
                        <div className="col-lg col-md col-sm p-1 input-group">
                        <input className="form-control selector border"  type="text" name="jobs" defaultValue={getdata.jobs}
                          onChange={changeHandle}  placeholder="Company, Title, Keywords " list="browsers"/>
                          <span className="input-group-append">
                              <div className="input-group-text"><i className="fa fa-search text-info"></i></div>
                          </span>
                        </div> 
                        <div className="col-lg col-md col-sm p-1 input-group">
                        <input className="form-control selector border"  type="text" name="location" defaultValue={getdata.location}
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

{/* ------Body--------- */}
        <div className="container mt-5">
			<div className="bg-white shadow rounded-lg d-block d-sm-flex">
                {/* ------Sidebar--------- */}
				<div id="sidebar"> 
					<div className="border-right sidebar-tabs">
                            <h5 className="text-secondary m-2 text-center">Hot Links</h5>
						<div className="mb-4 sidebar-pills nav flex-column"  aria-orientation="vertical">
                            <h5 className=" sub-title ">Levels</h5>
                            <select className=" sub-tab ">
                                <option  value="">Select..</option>
                                {Array.from(new Set(data.map(item=>item.level))).map((level,i)=>(<option key={i} value={level}>{level}</option>))}
                            </select>
                            <h5 className=" sub-title ">Location</h5>
                            <select className=" sub-tab ">
                                <option  value="">Select..</option>
                                {Array.from(new Set(data.map(item=>item.location))).map((location,i)=>(<option key={i} value={location}>{location}</option>))}
                            </select>
                            <h5 className=" sub-title ">Contract</h5>
                            <select className=" sub-tab ">
                                <option  value="">Select..</option>
                                {Array.from(new Set(data.map(item=>item.contract))).map((contract,i)=>(<option key={i} value={contract}>{contract}</option>))}
                            </select>
						</div>
					</div>
				</div>
                {/* ------Content--------- */}
				<div className="tab-content p-2 md-5">
					<div className="container "> <h5 className="text-secondary">Search Results:-</h5></div>
						{filterData.length > 0 ? (
						  <div className="container border-2 mb-4">
							{filterData.map((items,i)=>(
							<div className="row d-flex justify-content-center ">
								<div className="col-md mt-2 pt-s border" key={i}>
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
						):<h4 className="text-danger text-center m-5">No Jobs available, search with new keywords</h4>}  
					</div>
				</div>
			</div>
		</div>
        </>);
}

export default FindJobs;