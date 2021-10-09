import React,{useEffect,useState,componentRef} from "react";
import axios from "axios";
import { useParams} from 'react-router-dom';

import { API_URL } from "../../../components/utils";

export default function Applied(){

    const param = useParams()
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));

    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
    const [getdata, setGetdata] = useState({})
    const [seeker, setseeker] = useState()
    const [fetch, setfetch] = useState([])

    useEffect(() => {
        getuser()
    },[]);

    const formData = {authid:profile_1.job_id,jobid:param.id}
    const getuser= async()=>{
        try {
            const res = await axios.post(`${API_URL}/job/getsinglejob`,formData,{headers:header})
            if(res.data.error === false){
                const datas = res.data.data
                setGetdata(datas)
                const ids = datas.appliedBy
                getseek(ids)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const getseek=async(items)=>{
        const  vall = items.map(item => {
            return axios.post(`${API_URL}/profile/getseekerprofile`,{seekerid:item},{headers:header})
        })
        const result = await axios.all(vall)
        const stateinfa = result.map((res)=>(
            {
                part1: res.data.data.part2, 
                part2: res.data.data.part1, 
            } 
            ));
        setseeker(stateinfa)
    }

    const seekone=async(item)=>{
        const res = await axios.post(`${API_URL}/profile/getseekerprofile`,{seekerid:item},{headers:header})
        const infa ={
            part1: res.data.data.part2, 
            part2: res.data.data.part1, 
        }
        setfetch(infa)
    }

    const viewseeker=(e)=>{
        //seekone(e.target.value)
        console.log(e.target.value)
    }


    return (<>
    <div className="container-flex">
        <div>
            <div className="row d-flex justify-content-center m-3 p-2" key={getdata._id}>
                <div className="col-md-11 mt-2  border">
                    <div className="row z-depth-3">
                        <div className="col-sm-9 bg-white rounded-right">
                            <h3 className="m-3 text-start">{getdata.jobTitle}</h3>
                            <div className="row m-2">
                                    <p className="font-weight-bold">Deadline On: </p>
                                    <p className="text-muted"> {getdata.jobApplyEnd}</p>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                         {seeker ?
                             <table className="table table-striped m-2 border">
                             <thead>
                                 <tr>
                                 <th scope="col">Name</th>
                                 <th scope="col">Position</th>
                                 <th scope="col">Qualification</th>
                                 <th scope="col">Jobs</th>
                                 <th scope="col">Resume</th>
                                 </tr>
                             </thead>
                                {seeker.map((item,i) =>(
                                    <tbody key={i}>
                                        <tr>
                                        <td>{item.part2.firstName}</td>
                                        <td>{item.part1.jobTitle}</td>
                                        <td>{item.part1.qualifications}</td>
                                        <td>{item.part1.pastJobs}</td>
                                        <td>
                                            <button className="btn btn-outline-info" value={item.part2._id} onClick={ (e)=>viewseeker(e)}>Download</button>
                                        </td>
                                        </tr>
                                    </tbody>
                                ))}   
                             </table>
                        :<label>No data</label>} 
                    </div>
                <a href="/employers/dashboard/jobs" className=" text-right btn btn-outline-info m-3">Back</a>
                </div>
            </div>
             </div>
        </div>
   </> )
}

