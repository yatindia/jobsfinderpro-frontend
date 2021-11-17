import React, { } from "react";
import './style.css'


function ErrorPage () {


    return (<>
    <div className='canvan404'> </div>
    <div className="container-flex bgk ">
        <div className="row err justify-content-center">
            <i className="fa fa-frown-o" aria-hidden="true"></i>
            <span className="num1">4</span>
            <span className="num2">0</span>
            <span className="num3">4</span>
        </div>
        <h2 className="display-4 text-center text-light">PAGE NOT FOUND</h2>
        <div className="row justify-content-center mt-4">
            <a className=" btn-style" href="/">Home</a>
        </div>
    </div>
   
    </>);
}

export default ErrorPage;
