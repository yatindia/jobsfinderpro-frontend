import React, { useEffect, useState } from "react";

function SkillInput({...props}) {
    const[inputs,setinputs] = useState([{skill:"",experience:""}])

    const changeHandle = (i,event) => {
        const values = [...inputs];
        const {name, value} = event.target
        values[i][name] = value
        setinputs(values)
        props.getSkill(values)
      }

useEffect(()=>{
},[inputs])

  const add =()=>{
    const values = [...inputs];
    values.push({
        skill:"",experience:""
    })
    setinputs(values)
  }

  const remove =(idx)=>{
    const values = [...inputs];
    if(values.length > -1)  {
        values.splice(idx, 1);
        setinputs(values);
        props.getSkill(values)
    }
  }

    return (
      <div  className="row">
          {inputs.map((item,idx)=>
             ( <div key={idx} className="col-sm-7">
                 <div className="form-group d-flex">
                <input type="text" className="form-control mr-2" placeholder="Skill" name="skill"
                    value={item.skill} onChange={e=>changeHandle(idx,e)}/>
                <select type="text" className="form-control" placeholder="Experience" name="experience"
                    value={item.experience} onChange={e=>changeHandle(idx,e)}>
                        <option value=''>Select Experience</option>
                        <option value='1'>Below 1 Year</option>
                        <option value='2'>2 Years</option>
                        <option value='3'>3 Years</option>
                        <option value='4'>4 Years</option>
                        <option value='5'>5 Years</option>
                        <option value='6'>6 Years</option>
                        <option value='7'>7 Years</option>
                        <option value='8'>8 Years</option>
                        <option value='9'>9 Years</option>
                        <option value='10'>10 Years</option>
                        <option value='11'>10 + Years</option>
                </select>
                <button className="btn btn-findJob" type="button" onClick={()=>remove(idx)}>X</button>
                </div>
          </div>))}
          <div className='col-sm'>
            <button className="btn btn-findJob"  type="button" onClick={add}>Add New</button>
          </div>
      </div>
    )
  }

export default SkillInput;