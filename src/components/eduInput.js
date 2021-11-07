import React, { useEffect, useState } from "react";

function EduInput({...props}) {
    const[inputs,setinputs] = useState([{qualification:"",percentage:""}])

    const changeHandle = (i,event) => {
        const values = [...inputs];
        const {name, value} = event.target
        values[i][name] = value
        setinputs(values)
        props.getEdu(values)
      }

useEffect(()=>{
},[inputs])

  const add =()=>{
    const values = [...inputs];
    values.push({
        qualification:"",percentage:""
    })
    setinputs(values)
  }

  const remove =(idx)=>{
    const values = [...inputs];
    if(values.length > -1)  {
        values.splice(idx, 1);
        setinputs(values);
        props.getEdu(values)
    }
  }

    return (
      <div  className="row">
          {inputs.map((item,idx)=>
             ( <div key={idx} className="col-sm-7">
                 <div className="form-group d-flex">
                <input type="text" className="form-control mr-2" placeholder="Qualification" name="qualification"
                    value={item.qualification} onChange={e=>changeHandle(idx,e)}/> 
                <input type="text" className="form-control" placeholder="Percentage" name="percentage"
                    value={item.percentage} onChange={e=>changeHandle(idx,e)}/> 
                <button className="btn btn-findJob" type="button" onClick={()=>remove(idx)}>X</button>
                </div>
          </div>))}
          <div className='col-sm'>
            <button className="btn btn-findJob"  type="button" onClick={add}>+</button>
          </div>
      </div>
    )
  }

export default EduInput;