import React,{useEffect,useState} from "react";
import axios from "axios";

import { API_URL } from "../../../components/utils";
import JobList from "./jobList";

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
                job: res.data.data.job,
                org: res.data.data.org
            } 
            ));
            setGetdata(stateinfa)
         }
    }

    return (<>
          <div className="container-flex">
            <div className="row d-flex justify-content-center ">
                <div className="col-md-10 mt-2 pt-s">
                    {getdata.length>0?
                    <div>
                         {getdata.map((item,idx)=>(
                             <div key={idx}>
                                 <JobList data={item}/>
                             </div>
                         ))}
                    </div>
                    :<div><h4 className="text-info text-center m-5">Job not Applied Yet <a href={`/jobs?kwds=&loc`}>Search Job</a></h4></div>}
                </div>
            </div>
        </div>
   </> )
}

export default MyJobs