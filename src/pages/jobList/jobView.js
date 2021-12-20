import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useHistory} from 'react-router-dom';

import ApplyBtn from './applyBtn';
import { API_URL } from "../../components/utils";
import NavBar from '../../components/navBar';
import Footer from '../../components/footer';
import TopHiring from '../home/topHire';

const JobView = ({ match }) => {

    const [fetch, setfetch] = useState({job:{},org:{}})
    const [date, setDate] = useState("")
    const [datas, setDatas] = useState(true)
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

    return(<>
    <NavBar/>
        <div className="container bg-white m-auto rounded-lg justify-content-center pt-4">
            {!datas ?( 
           <div className='container border p-2'>
            <div className='row p-3'>
                <h5 className="text-center h5">{fetch.org.orgName} Recruiting</h5>
            </div>
            <div className='row container'>
            <div className="col">
                    <div className="form-group row"> 
                      <div className='col text-center'>
                      <p>Requirement For: <b className='text-muted'>{fetch.job.jobTitle}</b></p>
                      </div>
                    </div>   
                    <div className="form-group row border p-2 m-1">
                        <div className="col border-right">
                            <div className=" ">
                                <p>Location:<i className="text-info">    {fetch.job.jobCity}</i></p>
                                <p>Level:<i className="text-info">   {fetch.job.jobType}</i></p>
                                <p>Dead Line: <i className="text-info">  {fetch.job.jobApplyEnd}</i></p>
                                <p>Salary: <i className="text-info">{    `₹ ${fetch.job.jobSalary}`}</i></p>
                                <p>Category: <i className="text-info">{fetch.job.jobCategory} , {fetch.job.jobSubCategory}</i></p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="">
                                <p> <i className="fa fa-map-marker fa-lg text-primary"></i> {fetch.org.orgAddress}, {fetch.org.orgCountry}</p>
                                <p><i className="fa fa-phone fa-lg text-success"></i> {fetch.org.orgPhone}</p>
                                <p><i className="fa fa-link fa-lg text-info"></i> {fetch.org.orgWebsite}</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Job Description</label>
                            <textarea type="text"  rows="8"
                            value={fetch.job.jobDescription} className="form-control bg-light border-0" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Skill Requirement</label>
                            <textarea type="text" 
                            value={fetch.job.jobRequirement} className="form-control bg-light border-0" readOnly/>
                        </div>
                    </div>
                    <small className="text-right m-auto"><b>Posted On: </b>{date.split("T")[0]}</small>
                </div>
            </div>
            <div className='border-top p-2 ml-auto float-end'>
                <ApplyBtn job={fetch.job}></ApplyBtn> 
            </div> 
        </div>
         ):<h5 className="pt-4 homeContent2 text-info text-center m-auto">Loading...</h5>} 
         <TopHiring/>
        </div>
        <Footer/>
   </> ) 
}
export default JobView
