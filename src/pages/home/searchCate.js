import React from "react";
import { useHistory } from "react-router-dom";
import './style.css'

import cate from '../../components/asserts/category.json'

const SearchCate=()=>{

    const history = useHistory();

    const handleClick=(e)=>{  
            if(e !== ""){
                history.push('/search?kwds='+e+'&key=');
            }else{
               history.push('/')
            }
    }

return (<>
         <div className="container text-center m-auto p-3 border">
             <h5 className="text-secondary">Categories </h5>
             <div className="row border-top">
                 <div className="col-sm p-3">
                    {cate.map((level,i)=>
                        (<button key={i} className="btn btn-trending" value={level} onClick={(e) => handleClick(e.target.value)}>{level}</button>))}
                 </div>
             </div>
        </div> 

  </>);

}


export default SearchCate;