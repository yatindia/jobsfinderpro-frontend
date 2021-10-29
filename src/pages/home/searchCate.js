import React from "react";
import { useHistory } from "react-router-dom";
import './style.css'

import cate from '../../components/asserts/category.json'

const SearchCate=()=>{

    const history = useHistory();

    const handleClick=(e)=>{  
            //setSearch({jobs:e})
            //props.getSearch(search)
            //console.log(search)
            if(e !== ""){
                history.push('/jobs?kwds='+e +'&loc=');
            }else{
               history.push('/')
            }
    }

    const handleAllClick=()=>{  
       history.push('/jobs?kwds=&loc=');
    }


return (<>
         <div className="container text-center mt-5 mb-5">
             <h5 className="text-secondary">Categories </h5>
             <div className="row">
                 <div className="col-sm">
                    {cate.map((level,i)=>
                        (<button key={i} className="btn btn-trending" value={level} onClick={(e) => handleClick(e.target.value)}>{level}</button>))}
                 </div>
             </div>
        </div> 

  </>);

}


export default SearchCate;