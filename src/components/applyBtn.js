import React,{useState, useEffect} from "react";
import {Button} from 'react-bootstrap'

function ApplyBtn({job, ...props}) {

const [btnFun,setBtnFun]=useState(true)
const [btnText,setBtnText]=useState("")
const [btnStyle,setBtnStyle]=useState("")


useEffect(() => {
  const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));
    if(!userDetils){
        setBtnFun(true)
        setBtnText('Login to Apply')
        setBtnStyle('text')
    }else if(userDetils.Role_Type === "seeker"){
      setBtnFun(false)
      const name = 'Apply to '+ job
      setBtnText(name)
      setBtnStyle('outline-info')
  }
   
    },[job]);

    return (
      <Button className="m-2"
        onClick={props.handleClick}
        variant={btnStyle}
        disabled={btnFun}>
          {btnText}
      </Button>
    );
   }

export default ApplyBtn;