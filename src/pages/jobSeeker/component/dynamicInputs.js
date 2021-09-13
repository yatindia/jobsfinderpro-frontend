import React, { useState } from "react";


const DynamicInput = (props) => {

  const [item, setitem] = useState([]);

  const inputChange = (index,event) => {
    const values = [...item];
    values[index] = event.target.value
    if(values!==""){
      setitem(values)
      props.get(values)
    } 
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
        item.map((data,i) => {
          return (<>

              <div className="col-sm-3" key={i}>
                <div className="form-group d-flex">
                  <input type="text" name="vals" className="form-control"
                  value={data} onChange={event => inputChange(i,event)} list="dataset"/>
                  <button  className="btn btn-outline-danger" onClick={(e)=>removeInput(i,e)}>X</button>
                </div>
            </div>
         </> )
        })
      }
      <div className="form-group col">
        <button className="btn btn-findJob" onClick={addInputs}>+</button>
    </div> 
</div>
  )
}

export default DynamicInput;