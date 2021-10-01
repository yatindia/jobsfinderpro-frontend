import React,{useState} from "react";

import category from '../../../components/asserts/category.json'

const Search=()=>{

    const [cate, setCat] = useState(true);


  const categoryChange =(e)=>{
    if(e==='Select..' || e ===''){
        setCat('')
    }else{
        try {
            let subData = require('../../../components/asserts/subCategory/'+e+'.json');
            setCat(subData)
        } catch (error) {
            setCat('')
            console.log(error)
        }
    }
}

return (<>
        <div className="container-flex p-2 border-bottom">
            <div className ="row">
                <div className="col-md-6 col-sm">
                    <label>Category</label>
                    <div className="form-group">
                        <select className="form-control selector border" onChange={(e) => categoryChange(e.target.value)} placeholder="Select..">
                        <option>Select..</option>
                            {category.map((items,i)=>(<option key={i} value={items}> {items}</option>))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6 col-sm">
                    <div className="form-group">
                        <label>Sub Category</label>
                        <div className="app_dropdown">
                        {cate.length > 0 ? (
                            <select className="form-control selector border">
                                {cate.map((items,i)=>(<option key={i} value={items}> {items}</option>))}
                            </select>):<select className="form-control selector border"><option>Select..</option></select>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2 float-right ml-auto">
                    <button className="btn btn-findJob form-control">Search</button>
                </div>
            </div>
        </div> 

  </>);

}


export default Search;