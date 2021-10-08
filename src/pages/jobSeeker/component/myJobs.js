import React,{useEffect,useState} from "react";
import axios from "axios";

import { API_URL } from "../../../components/utils";

function MyJobs(){

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));

    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
    const [getdata, setGetdata] = useState({})

    useEffect(() =>{
        const formData = {email:profile_1.job_email,type:profile_1.Role_Type}
        
        const getuser= async()=>{
            try {
                const res = await axios.post(`${API_URL}/profile/getprofile`,formData,{headers:header})
                if(res.data.error === false){
                    const datas = res.data.data.part2.appliedFor
                    getJob(datas)
                }
            } catch (error) {
                console.log(error)
            }
    
        }
        getuser()
    },[])

    const getJob =async (items)=>{
        const  vall = items.map(item => {
            return axios.post(`${API_URL}/job/searchone`,{jobid:item},{headers:header})
        })
        const result = await axios.all(vall)
        if(result.length>0){
              const stateinfa = result.map((res)=>(
            {
                job: res.data.data
            } 
            ));
            setGetdata(stateinfa)
        }
    }


    const unapply = async(e)=>{
        const getid = e.target.value
        const formData = {seekerid:profile_1.job_id,jobid:getid}
        try {
          const res = await axios.post(`${API_URL}/job/unapply`,formData,{headers:header})
          if (res.data.error === false){
            window.location.reload()
          }
        } catch (error) {
          console.log(error)
        }
      }



    return (<>
          <div className="container-flex">
            <div className="row d-flex justify-content-center ">
                <div className="col-md-10 mt-2 pt-s">
                    {getdata.length>0?
                    <div>
                         {getdata.map((item,idx)=>(
                             <div className="row z-depth-3 p-2 m-2 border">
                             <div className="col-md bg-white rounded-right" key={idx}>
                             <h3 className="mt-3 text-start">{item.job.jobTitle}</h3>
                             <div className="row">
                                 <div className="col-sm">
                                     <p className="font-weight-bold">Location</p>
                                     <h6 className="text-muted">{item.job.jobCity}</h6>
                                 </div>
                                 <div className="col-sm">
                                     <p className="font-weight-bold">End Date</p>
                                     <h6 className="text-muted">{item.job.jobApplyEnd}</h6>
                                 </div>
                                 <div className="col-sm">
                                     <p className="font-weight-bold">Contract type</p>
                                     <h6 className="text-muted">{item.job.jobType}</h6>
                                 </div>
                                 <div className="col-sm">
                                     <p className="font-weight-bold">Salary</p>
                                     <h6 className="text-muted">{item.job.jobSalary}</h6>
                                 </div>
                                 <div className="col-lg">
                                    <button className="btn btn-outline-danger" value={item.job._id} onClick={(e)=>unapply(e)}> UnApply</button>
                                 </div>
                             </div>
                         </div>
                         </div>
                         ))}
                    </div>
                    :<label>No Job is Applied yet</label>}
                </div>
            </div>
        </div>
   </> )
}

export default MyJobs