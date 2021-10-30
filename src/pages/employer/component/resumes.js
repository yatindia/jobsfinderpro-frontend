import React,{useEffect,useState} from "react";
import axios from "axios";

import { API_URL } from "../../../components/utils";

export default function Resumes(){

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'));

    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [seeker, setseeker] = useState('')
    const ids =  profile_2.downloadedResumes

    useEffect(() => {
        getseek(ids)
    },[]);

    const getseek=async(ids)=>{
        const  vall = ids.map(item => {
            const res = axios.post(`${API_URL}/profile/getseekerprofile`,{seekerid:item},{headers:header})
            return res
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

    return (<>
    <div className="container-flex">
        <div>
            <div className="row d-flex justify-content-center m-2 p-2">
                <div className="col-md-12 mt-2  border">
                    <div className="row z-depth-3">
                            <h3 className="m-3 text-start text-muted">Resume Bucket:</h3>
                    </div>
                    <div className='row p-2'>
                          {seeker ?
                          <div className="table-responsive ">
                             <table className="table table-striped border">
                             <thead className='table-header'>
                                 <tr>
                                 <th scope="col">Name</th>
                                 <th scope="col">Position</th>
                                 <th scope="col">Qualification</th>
                                 <th scope="col">Previous Jobs</th>
                                 <th scope="col">Resume</th>
                                 </tr>
                             </thead>
                                {seeker.map((item,i) =>(
                                    <tbody key={i} className='table-row'>
                                        <tr>
                                        <td>{item.part2.firstName}</td>
                                        <td>{item.part1.jobTitle}</td>
                                        <td>{item.part1.qualifications}</td>
                                        <td>{item.part1.pastJobs}</td> 
                                        <td>
                                            <a className="btn btn-outline-info" title={`${item.part2.firstName}`} target="_blank" rel="noopener noreferrer"
                                               download href={`${API_URL}/profile/profileResumes/${item.part1.resume}`}> Download</a>
                                        </td>
                                        </tr>
                                    </tbody>
                                ))}  
                             </table></div>
                        :<label>No data</label>} 
                    </div>
                    <div className='row justify-content-center'>
                        <a href="/employers/dashboard" className=" text-right btn btn-outline-secondary m-3">Back</a>
                    </div>
                </div>
            </div>
             </div>
        </div>
   </> )
}

