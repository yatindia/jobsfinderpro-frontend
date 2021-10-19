import React,{useState} from "react"
import axios from "axios";

import DialogBox from "../../../components/dialogBox";
import { API_URL } from "../../../components/utils";

export default function Payment (){

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'));

    const [dialogShow, setDialogShow] = useState(false);
    const [errs,setErr] = useState({title: "",message: ""})

    const dialogClose=()=>{
        setDialogShow(false)
      }

    const buynow=async(e)=>{
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': `<Bearer> ${profile_1.Auth_token}`
            }
        };
        setDialogShow(true)
        setErr({title:'Payment '+e.target.value+' Received',message:e.target.value+' Pack is processed to you Account'})
        // try {
        //     const res = await axios.post(API_URL+"/profile/checkout",{price:e.target.value},config)
        //     if (res.data.message==="success") {
        //         setDialogShow(true)
        //         setErr({title:'Payment '+e.target.value+' Received',message:e.target.value+' Pack is processed to you Account'})
        //     }
        //     if (res.data.message==="canceled") {
        //         setDialogShow(true)
        //         setErr({title:'Payment '+e.target.value+' Failed',message:' Payment is Cancelled Please try Again.'})
        //       }
        // } catch (error) {
        //     setDialogShow(true)
        //     setErr({title:'Payment Failed',message:'Network Error'})
        // }
    }

    return(
    <div className="container-flex m-2 p-2">
        <DialogBox show={dialogShow} title={errs.title} detail={errs.message} dialogClose={dialogClose}/>
        <div className="row contain justify-content-center m-auto border p-3">
            <div className="col-xs-6 col-sm-6 col-md-6 ">
                    <address>
                        <strong className='text-capitalize'>{profile_1.job_fname} {profile_1.job_lname}</strong>
                        <br/>
                        <p>{profile_1.job_email}</p>
                        <br/>
                        <p className="text-capitalize">{profile_2.orgAddress}, {profile_2.orgCountry}</p>
                        <abbr title="Phone">P:</abbr> {profile_2.orgPhone}
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
       <div>
       <div className="row contain justify-content-center m-auto">
            <div className="col-md-6 col-lg-6 col-sm-6">
                <div className="pricingTable">
                    <div className="pricing_heading">
                        <h3 className="title">Plan Pricing</h3>
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
    </div>
    )
}