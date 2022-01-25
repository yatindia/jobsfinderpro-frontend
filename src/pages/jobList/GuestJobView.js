import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useHistory} from 'react-router-dom';

import { API_URL } from "../../components/utils";
import NavBar from '../../components/navBar';
import Footer from '../../components/footer';
import TopHiring from '../home/topHire';
import Helmet from 'react-helmet';

const GuestJobView = ({ match }) => {

    const [fetch, setfetch] = useState({job:{},org:{}})
    const [date, setDate] = useState("")
    const [datas, setDatas] = useState(true)



    const history = useHistory()
    const id = match.params.jobId

useEffect(()=>{
    const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));
 
        const getjob =async ()=>{
            const  res = await axios.post(`${API_URL}/guest/searchone`,{jobid:id})
          console.log(res);
            setfetch({
                job:res.data.data.job,
                org:res.data.data.org
            })
            setDatas(res.data.error)
            if(res.data.error === false){
                setDate(res.data.data.job.dateOfAdd)
            }
        }
      getjob()
      
},[])

const login=()=>{
    history.push('/login?kwds='+id)
  }



    return(<>
    

    <NavBar/>
        <div className="pt-4 container m-auto justify-content-center">
            {!datas ?( 
                
           <div className='col border'>
               <Helmet>
                <title>{fetch.org.orgName} JobsFinderPro</title>
                <meta property="og:title" content={`${fetch.org.orgName} Recruiting`} />
                <meta property="og:description" content={`Become a ${fetch.job.jobTitle} in ${fetch.job.jobCity}`} />
                <meta property="og:image" content="https://jobsfinderpro.com/static/media/logo.ea0e8d5b.svg" />

                <meta property="title" content={`${fetch.org.orgName} Recruiting`} />
                <meta property="description" content={`Become a ${fetch.job.jobTitle} in ${fetch.job.jobCity}`} />
                <meta property="image" content="https://jobsfinderpro.com/static/media/logo.ea0e8d5b.svg" />
               </Helmet>
            <div className='row m-auto justify-content-center border-bottom'>
                <h5 className="text-center search-header-sub p-2"><u>{fetch.org.orgName} Recruiting</u></h5>
            </div>
            <div className='row p-3'>
            <div className="col-sm-3 bg-info rounded-left">
                    <div className="text-center text-white align-items-center mt-3">
                        <img className="mt-2 img-fluid imglogo" src={`${API_URL}/profile/profileImages/${fetch.org.orgLogo}`} alt="sample"></img>
                        {/* <h2 className="font-weight-bold mt-2"></h2> */}
                        {fetch.job.dateOfAdd !== undefined ? 
                            <p className="p-2">Posted On: <b>{fetch.job.dateOfAdd.split('T')[0]}</b></p>
                                :<p>Posted On</p>}
                        <i className="far-fa-edit fa-2x mb-2"></i>
                    </div>
                </div>
                <div className="col-md bg-white rounded-right">
                        <p className="mt-3 text-muted">Job Position:  <b>{fetch.job.jobTitle}</b></p>
                        <div className='row mb-2'>
                            <div className="col">
                                <h6 className="text-muted">{fetch.job.jobCategory} / {fetch.job.jobSubCategory}</h6>
                            </div>
                        </div>
                        <div className="row border-top p-2">
                            <div className="col-sm">
                                <p className="font-weight-bold">Location</p>
                                <h6 className="text-muted">{fetch.job.jobCity}</h6>
                            </div>
                            <div className="col-md">
                                <p className="font-weight-bold">Deadline</p>
                                <h6 className="text-muted">{fetch.job.jobApplyEnd}</h6>
                            </div>
                            <div className="col-sm">
                                <p className="font-weight-bold">Job Level</p>
                                <h6 className="text-muted">{fetch.job.jobType}</h6>
                            </div>
                            <div className="col-sm">
                                <p className="font-weight-bold">Salary</p>
                                <h6 className="text-muted">₹ {fetch.job.jobSalary}</h6>
                            </div>
                            <div className="col-md">
                              <button onClick={()=>login()} className='btn btn-danger'>Login to apply</button>
                            </div>
                        </div>
                    <hr className="bg-primary"/>
                </div>
            </div> 
        </div>
         ):<h5 className="pt-4 homeContent2 text-info text-center m-auto">Loading...</h5>} 
        </div>
        <TopHiring/>
        <Footer/>
   </> ) 
}
export default GuestJobView