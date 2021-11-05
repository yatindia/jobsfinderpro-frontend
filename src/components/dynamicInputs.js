import React, { useEffect, useState } from "react";


const DynamicInput = ({test,...props}) => {

  const [item, setitem] = useState([]);

  
  useEffect(()=>{
    if(test!==''&& test!==undefined){
      setitem(test)
    }else{
      
    }
  },[item,test])

  const inputChange = (index,event) => {
    const values = [...item];
    values[index] = event.target.value
      setitem(values)
      props.get(values)
  }


  const addInputs = () => {
    const values = [...item,""];
    values.push()
    setitem(values);
  };

  const removeInput = (i,e) => {
    const values = [...item];
    if(values.length > -1)  {
        values.splice(i, 1);
        setitem(values);
        props.get(values)
    }
  };


  return (
    <div className="row">
      {
        item.map((data,idx) => 
              <div className="col-sm-3" key={idx}>
                <div className="form-group d-flex">
                  <input type="text" name="vals" className="form-control"
                  value={data} onChange={event => inputChange(idx,event)} />
                  <button  className="btn btn-outline-danger" type="button" onClick={(e)=>removeInput(idx,e)}>X</button>
                </div>
            </div> )
      }
      <div className="form-group col">
        <button className="btn btn-findJob" type="button" onClick={addInputs}>+</button>
    </div> 
</div>
  )
}

export default DynamicInput;