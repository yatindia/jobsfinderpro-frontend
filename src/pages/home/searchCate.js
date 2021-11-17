import React from "react";
import { useHistory } from "react-router-dom";
import './style.css'

import cate from '../../components/asserts/category.json'
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

const SearchCate=()=>{

    const history = useHistory();

    const handleClick=(e)=>{  
        const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
        if(!profile_1){
            history.push('/login');
          }else{
            if(e !== ""){
                history.push('/categories/search?kwds='+e+'&key=');
            }else{
               history.push('/')
            }
          }
    }

return (<>
        <NavBar/>
         <div className="container text-center m-auto pt-3 border">
             <h5 className="text-secondary">Categories </h5>
             <div className="row border-top">
                 <div className="col-sm p-3">
                    {cate.map((level,i)=>
                        (<button key={i} className="btn btn-trending" value={level} onClick={(e) => handleClick(e.target.value)}>{level}</button>))}
                 </div>
             </div>
        </div> 
        <Footer/>
  </>);

}


export default SearchCate;