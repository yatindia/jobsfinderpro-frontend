import React,{useState} from "react"

import DialogBox from "../../../components/dialogBox";

export default function Payment (){

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));

    const [dialogShow, setDialogShow] = useState(false);
    const [errs,setErr] = useState({title: "",message: ""})

    const dialogClose=()=>{
        setDialogShow(false)
      }

    const buynow=(e)=>{
        setDialogShow(true)
        setErr({title:'Payment '+e.target.value+' Received',message:e.target.value+' Pack is processed to you Account'})
    }

    return(
    <div className="container-flex">
        <DialogBox show={dialogShow} title={errs.title} detail={errs.message} dialogClose={dialogClose}/>
        <div className="row contain justify-content-center m-auto border p-3">
            <div className="col-xs-6 col-sm-6 col-md-6 ">
                    <address>
                        <strong className='text-capitalize'>{profile_1.job_fname} {profile_1.job_lname}</strong>
                        <br/>
                        <p>{profile_1.job_email}</p>
                        <br/>
                        Los Angeles, CA 90026
                        <br/>
                        <abbr title="Phone">P:</abbr> (213) 484-6829
                    </address>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 text-right">
                    <p>
                        <em>Expiry Date: <b>15th November, 2021</b></em>
                    </p>
                    <p>
                        <em>Balance Point #:<b>345</b></em>
                    </p>
                </div>
        </div>
        <div className="row contain justify-content-center m-auto">
            <div className="col-md">
                <div className="pricingTable">
                    <div className="pricing_heading">
                        <h3 className="title">Pricing Plan</h3>
                        <span className="value">
                            ₹ 200 
                            <span className="month">per month</span>
                        </span>
                    </div>
                    <div className="content">
                        <ul>
                            <li>Post 1 Job</li>
                            <li>20 Resume Download</li>
                        </ul>
                        <div className="link">
                            <button className="btn" value="200" onClick={(e)=>buynow(e)}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md">
                <div className="pricingTable">
                    <div className="pricing_heading">
                        <h3 className="title">Pricing Plan</h3>
                        <span className="value">
                        ₹ 1000
                            <span className="month">per month</span>
                        </span>
                    </div>
                    <div className="content">
                        <ul>
                            <li>Yearly Package Rs 10000</li>
                            <li>Post 5 Job</li>
                            <li>100 Resume Download</li>
                        </ul>
                        <div className="link">
                            <button className="btn" value="1000" onClick={(e)=>buynow(e)}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md">
                <div className="pricingTable">
                    <div className="pricing_heading">
                        <h3 className="title">Pricing Plan</h3>
                        <span className="value">
                        ₹ 2500
                            <span className="month">per month</span>
                        </span>
                    </div>
                    <div className="content">
                        <ul>
                            <li>Yearly Package Rs 25000</li>
                            <li>Post 10 Job</li>
                            <li>250 Resume Download</li>
                        </ul>
                        <div className="link">
                            <button className="btn" value="2500" onClick={(e)=>buynow(e)}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}