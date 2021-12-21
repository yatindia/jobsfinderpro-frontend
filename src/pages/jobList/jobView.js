import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useHistory} from 'react-router-dom';

import ApplyBtn from './applyBtn';
import { API_URL } from "../../components/utils";
import NavBar from '../../components/navBar';
import Footer from '../../components/footer';
import TopHiring from '../home/topHire';
import ViewJob from './viewJob';

const JobView = ({ match }) => {

    const [fetch, setfetch] = useState({job:{},org:{}})
    const [date, setDate] = useState("")
    const [datas, setDatas] = useState(true)
    const [view, setView] = useState(true)
    const [dialogShow, setDialogShow] = useState(false);

    const history = useHistory()
    const id = match.params.jobId

useEffect(()=>{
    const userDetils = JSON.parse(localStorage.getItem( 'userDetails'));
    if(!userDetils){
        history.push('/login?kwds='+id);
      }else{
        const header = {'authorization': `<Bearer> ${userDetils.Auth_token}`}
        const getjob =async ()=>{
            const  res = await axios.post(`${API_URL}/job/searchone`,{jobid:id},{headers:header})
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
      }
},[])

const dialogClose=()=>{
    setDialogShow(false)
  }

const viewjob=()=>{
    setDialogShow(true) 
 }

    return(<>
    <NavBar/>
        <div className="pt-4 container m-auto justify-content-center">
            {!datas ?( 
           <div className='col border'>
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
                                <ApplyBtn job={fetch.job}></ApplyBtn>
                                {view ? <button type="button" className="btn btn-findJob m-2" onClick={viewjob}> View</button>:
                                <button type="button" className="btn btn-upload m-2" onClick={viewjob}> Login to View</button>}
                                
                                <ViewJob show={dialogShow} data={fetch} dialogClose={dialogClose}/> 
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
export default JobView
