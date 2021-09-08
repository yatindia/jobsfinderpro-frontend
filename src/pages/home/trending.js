import React from "react";
import { useHistory } from "react-router-dom";
import './style.css'

import data from '../../components/asserts/data.json'

const Trending=()=>{

    // const [search, setSearch] = useState({
    //     jobs: "",
    //     location: "",})
    const history = useHistory();

    const handleClick=(e)=>{  
            //setSearch({jobs:e})
            //props.getSearch(search)
            //console.log(search)
            if(e !== ""){
                history.push({pathname:'/jobs',keyword:{jobs:e,location:''}});
            }else{
               history.push('/')
            }
    }
    
    const handleLocClick=(e)=>{  
        //setSearch({location:e})
       // props.getSearch(search)
       if(e !== ""){
        history.push({pathname:'/jobs',keyword:{jobs:'',location:e}});
    }else{
       history.push('/')
    }
    }

    const handleAllClick=()=>{  
        //setSearch({location:e})
       // props.getSearch(search)
        history.push({pathname:'/jobs',keyword:{jobs:'',location:''}});
    }


return (<>
         <div className="container text-center mt-5 mb-5">
             <h5 className="text-secondary">Trending Jobs</h5>
             <div className="row">
                 <div className="col-sm">
                    <button className="btn btn-trending"  onClick={handleAllClick}>All Jobs</button>
                    {Array.from(new Set(data.map(item=>item.level))).map((level,i)=>
                        (<button key={i} className="btn btn-trending" value={level} onClick={(e) => handleClick(e.target.value)}>{level}</button>))}
                    {Array.from(new Set(data.map(item=>item.contract))).map((contract,i)=>
                        (<button key={i} className="btn btn-trending" value={contract} onClick={(e) => handleClick(e.target.value)}>{contract}</button>))}
                    {Array.from(new Set(data.map(item=>item.location))).map((location,i)=>
                        (<button key={i} className="btn btn-trending" value={location} onClick={(e) => handleLocClick(e.target.value)}>{location}</button>))}
                 </div>
             </div>
        </div> 

  </>);

}


export default Trending;