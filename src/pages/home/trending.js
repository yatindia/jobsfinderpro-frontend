import React from "react";
import './style.css'

import data from '../../components/asserts/data.json'

const Trending=({...props})=>{

    const handleClick=(e)=>{  
        props.getSearch(e)
    }
return (<>
         <div className="container text-center mt-5 mb-5">
             <h5>Trending Jobs</h5>
             <div className="row">
                 <div className="col-sm">
                    {Array.from(new Set(data.map(item=>item.level))).map((level,i)=>(<button key={i} className="btn btn-trending" value={level} onClick={(e) => handleClick(e.target.value)}>{level}</button>))}
                    {Array.from(new Set(data.map(item=>item.contract))).map((contract,i)=>(<button key={i} className="btn btn-trending" value={contract} onClick={(e) => handleClick(e.target.value)}>{contract}</button>))}
                    {Array.from(new Set(data.map(item=>item.location))).map((location,i)=>(<button key={i} className="btn btn-trending" value={location} onClick={(e) => handleClick(e.target.value)}>{location}</button>))}
                 </div>
             </div>
        </div> 

  </>);

}


export default Trending;