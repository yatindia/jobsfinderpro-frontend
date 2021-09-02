import React,{useEffect,useState} from "react";

const Selector=({items, ...props})=>{

    const [skill,setSkill]=useState([])

    useEffect(() => {
        const fetchdata =async()=>{
            const stateinfa = items.map((data)=>(
                {
                    location: data.location, 
                } 
                ));
            setSkill(stateinfa)
        }  
        fetchdata()
      },[items]);

      const handleChange=(e)=>{
        if (e === ""){
            return null
        }else{
        props.getSelectedSkill(e)
        }
    }
    

return (<>
         <form className="align-items-center ">
          <div className="row ">
              <div className="col-lg">
                  <div className="row">
                       <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text" onChange={(e) => handleChange(e.target.value)} placeholder="Job Search" list="browsers"/>
                      {skill.length > 0 ? (
                                <datalist id = "browsers">
                                {skill.map((res,i)=>(<option key={i} value={res.location}>{res.location}</option>))}
                                </datalist>):null} 
                      </div> 

                      <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text" placeholder="Loaction" list="browsers1"/>
                          <datalist id = "browsers1">
                          <option value="Chennai">Chennai</option>
                          <option value="TVM">TVM</option>
                          <option value="EKM">EKM</option>
                          <option value="BNG">BNG</option>
                          </datalist>
                      </div>

                      <div className="col-md col-sm p-1 input-group">
                      <button className="btn btn-success " type="submit">Search</button>
                      </div>
                  </div>
              </div>
            </div>
          </form> 

  </>);

}


export default Selector;
