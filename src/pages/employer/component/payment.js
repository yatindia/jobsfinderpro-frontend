import React,{useState,useEffect} from "react"
import axios from "axios";
import { Toast } from "react-bootstrap";

import DialogBox from "../../../components/dialogBox";
import { API_URL } from "../../../components/utils";

export default function Payment (){

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'));

    const [dialogShow, setDialogShow] = useState(false);
    const [errs,setErr] = useState({title: "",message: "",style:""})
    const [toast, setToast] = useState(false);

    const dialogClose=()=>{
        setDialogShow(false)
      }

    const buynow=async(e)=>{
        const config = {
            headers: {
                'authorization': `<Bearer> ${profile_1.Auth_token}`
            }
        };
        try {
            setErr({title:'Payment',message:'Waiting for process..',style:"info"})
            setToast(true)
            const res = await axios.get(`${API_URL}/payment/`,{link_id:profile_2.link_id},config)
            window.open(res.data.paymentURL)
        } catch (error) {
            setErr({title:'Payment',message:'Network Error',style:"warning"})
            setToast(true)
        }
    }

    
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const result = query.get("success")
    if (result==='true') {
      setErr({title:'Payment',message:'Payment Success',style:"success"})
    setToast(true)
    }
    else if (result==='false') {
        setErr({title:'Payment',message:'Canceled - Network Error',style:"danger"})
        setToast(true)
    }
  }, []);

    return(
    <div className="container-flex m-2 p-2 border">
        <DialogBox show={dialogShow} title={errs.title} detail={errs.message} dialogClose={dialogClose}/>
        <div className="row justify-content-center m-auto">
            <div className="col-xs-6 col-sm-6 col-md-6 ">
                <address>
                    <strong className='text-capitalize'>{profile_1.job_fname} {profile_1.job_lname}</strong>
                    <br/>
                    <p>{profile_1.job_email}</p>
                    <p>Balance Point <abbr title="Number">#:</abbr><b>{profile_2.resumePoints}</b></p>
                    <br/>
                </address>
            </div>
            <div className='col-xs-6 col-sm-6 col-md-6 m-auto align-items-center'>
            <Toast onClose={() => setToast(false)} show={toast} bg={errs.style}>
                <Toast.Header>
                    <strong className="me-auto">{errs.title}</strong>
                </Toast.Header>
                <Toast.Body className={`text-${errs.style}`}><b>{errs.message}</b></Toast.Body>
                </Toast>
            </div>
        </div>
         {/* <div className='row m-3 justify-content-center'>
        <div className={`col-sm-4 bg-${errs.style} rounded text-center`}>
            <h4 className="p-3"><b>{errs.message}</b></h4>
        </div>
        </div> */}
       <div>
       <div className="row contain justify-content-center m-auto border-top">
            <div className="col-md-4 col-lg-4 col-sm-4">
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
                            <li>Post Unlimited Job</li>
                            <li>50 Point Resume Download</li>
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