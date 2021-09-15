import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import data from '../../components/asserts/data.json'

const Fetcher=()=>{

  const [search, setSearch] = useState({
      jobs: [],
      location: "",
  })
  const history = useHistory()


    const changeHandle = (e) => {
        setSearch({...search,[e.target.name]: e.target.value})
    }
    
    const handleSubmit=()=>{
      if(search.jobs === "" && search.location === ""){
        return null
      }else if(search.jobs !== "" || search.location!==''){
        history.push({pathname:'/jobs',keyword:search});
      }
      else {
        return null
      }
    }

return (<>
         <div className="container-flex m-5">
           <h5 className="text-secondary">Advance Search options:-</h5>
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
                          onChange={changeHandle}  placeholder="Level" list="loca"/>
                          {data.length > 0 ? (
                           <datalist id = "loca">
                                {Array.from(new Set(data.map(item=>item.location))).map((location,i)=>(<option key={i} value={location}> {location}</option>))}
                                </datalist>):null}
                        <span className="input-group-append">
                            <div className="input-group-text"><i className="fa fa-map-marker text-info"></i></div>
                        </span>
                      </div>
                  </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-lg">
                  <div className="row">
                       <div className="col-lg col-md col-sm p-1 input-group">
                       <input className="form-control selector border"  type="text" name="jobs"
                          onChange={changeHandle}  placeholder="Level" list="job"/>
                          {data.length > 0 ? (
                           <datalist id = "job">
                                {Array.from(new Set(data.map(item=>item.level))).map((level,i)=>(<option key={i} value={level}>Level: {level}</option>))}
                                </datalist>):null}
                      </div> 
                      <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text" name="jobs"
                          onChange={changeHandle}  placeholder="Position" list="pos"/>
                          {data.length > 0 ? (
                           <datalist id = "pos">
                                {Array.from(new Set(data.map(item=>item.position))).map((position,i)=>(<option key={i} value={position}>Position: {position}</option>))}
                                </datalist>):null}
                      </div>
                      <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text" name="jobs"
                          onChange={changeHandle}  placeholder="Languages" list="lan"/>
                          {data.length > 0 ? (
                           <datalist id = "lan">
                                {Array.from(new Set(data.map(item=>item.languages))).map((languages,i)=>(<option key={i} value={languages}> {languages}</option>))}
                                </datalist>):null}
                      </div>
                  </div>
              </div>
            </div>

            <div className ="row mt-3">
              <div className="col-sm-2 mt-1 text-right">
                  <button className="btn btn-findJob form-control" onClick={handleSubmit}>Find Jobs</button>
              </div>
            </div>
          </div> 

  </>);

}


export default Fetcher;