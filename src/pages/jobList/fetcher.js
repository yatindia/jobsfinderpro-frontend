import React,{useState} from "react";

const Fetcher=({...props})=>{

    const [search, setSearch] = useState({
        jobs: "",
        location: "",
    })

    const changeHandle = (e) => {
        setSearch({...search,[e.target.name]: e.target.value})
    }
    
    const handleSubmit=()=>{
        props.getSearch(search)
    }

return (<>
         <div className="container justify-content-center">
          <div className="row">
              <div className="col-lg">
                  <div className="row">
                       <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text" name="jobs"
                        onChange={changeHandle}  placeholder="Keywords"/>
                        <span className="input-group-append">
                            <div className="input-group-text"><i className="fa fa-search text-info"></i></div>
                        </span>
                      </div> 
                      <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text" name="location"
                        onChange={changeHandle} placeholder="Job Location" list="browsers1"/>
                        <span className="input-group-append">
                            <div className="input-group-text"><i className="fa fa-map-marker text-info"></i></div>
                        </span>
                      </div>
                  </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg">
                  <div className="row">
                       <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text" name="jobs"
                        onChange={changeHandle}  placeholder="Keywords"/>
                        <span className="input-group-append">
                            <div className="input-group-text"><i className="fa fa-search text-info"></i></div>
                        </span>
                      </div> 
                      <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text" name="location"
                        onChange={changeHandle} placeholder="Job Location" list="browsers1"/>
                        <span className="input-group-append">
                            <div className="input-group-text"><i className="fa fa-map-marker text-info"></i></div>
                        </span>
                      </div>
                  </div>
              </div>
            </div>

            <div className ="row">
              <div className="col-sm-2 mt-1 float-end">
                  <button className="btn btn-findJob form-control" onClick={handleSubmit}>Find Jobs</button>
              </div>
            </div>
          </div> 

  </>);

}


export default Fetcher;