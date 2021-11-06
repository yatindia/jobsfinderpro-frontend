import React,{useEffect,useState} from "react";
import axios from "axios";
import jsPDF from 'jspdf'

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

   async function pdfcreate (e) {    
    let x = 60
    let y = 190
    var doc = new jsPDF(); 
            try {
                const res = await axios.post(`${API_URL}/job/searchoneseeker`,{seekerid:e.target.value},{headers:header})
                if(res.data.error===false){
                    const fetch = res.data.data
                    doc.setLineWidth(0.1);
                    doc.rect(10, 20, 190, 300);
                    doc.setLineWidth(0.1);
                    doc.line(57, 20, 57, 300)
                    doc.text(80, 10, 'Job Seeker Profile Details');        
                    doc.text(20, 30, 'Name: ');    
                    doc.text(60, 30, `${fetch.part2.firstName} `); 
                    doc.text(100, 30, `${fetch.part2.lastName}`);   
                    doc.text(150, 30, 'Gender:');  
                    doc.text(180, 30, `${fetch.part1.gender}`);  
                    doc.text(20, 50, 'Mail Id:');          
                    doc.text(60, 50, `${fetch.part1.email}`);
                    doc.text(20, 70, 'DOB:');  
                    doc.text(60, 70, `${(fetch.part1.dateOfBirth).split('T')[0]}`); 
                    doc.text(20, 90, 'Mobile: ');    
                    doc.text(60, 90, `${fetch.part1.mobile}`);  
                    doc.text(20, 110, 'Location: ');    
                    doc.text(60, 110, `${fetch.part1.city}, ${fetch.part1.state}` );   
                    doc.text(20, 130, 'Designation: ');    
                    doc.text(60, 130, `${fetch.part1.jobTitle}`);   
                    doc.text(20, 150, 'Qualification: ');    
                    doc.text(60, 150, `${fetch.part1.qualifications}`);    
                    doc.text(20, 170, 'Previous Jobs: ');    
                    doc.text(60, 170, `${fetch.part1.pastJobs}`);
                    doc.text(20, 190, 'Skills: '); 
                    (fetch.part1.techQualifications).forEach(e=>{
                        doc.text(x,y,`${e.skill}`); 
                        doc.text(130,y,`${e.experience} Years`);
                        y=y+10}) 
                    doc.save(`${fetch.part2.firstName}.pdf`); 
                }
            } catch (error) {
                
            }
     }


    return (<>
    <div className="container-flex">
        <div>
            <div className="row d-flex justify-content-center m-2 p-2">
                <div className="col-md-12 mt-2  border">
                    <div className="row z-depth-3">
                            <h5 className="m-3 text-start text-muted">Resume Bucket: ({profile_2.downloadedResumes.length})</h5>
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
                                 <th scope="col">Skills</th>
                                 <th scope="col">Resume</th>
                                 </tr>
                             </thead>
                                {seeker.map((item,i) =>(
                                    <tbody key={i} className='table-row'>
                                        <tr>
                                        <td>{item.part2.firstName}</td>
                                        <td>{item.part1.jobTitle}</td>
                                        <td>{item.part1.qualifications.map((item,i)=>(
                                            <div key={i} className="row d-flex">
                                                <h6 className="col" >{item} </h6>
                                            </div>
                                            ))}
                                        </td> 
                                        <td>{item.part1.pastJobs.map((item,i)=>(
                                            <div key={i} className="row d-flex">
                                                <h6 className="col" >{item} </h6>
                                            </div>
                                            ))}
                                        </td> 
                                        <td>{item.part1.techQualifications.map((item,i)=>(
                                            <div key={i} className="row d-flex">
                                                <h6 className="col" >{item.skill} <small className="text-muted">({item.experience}Yrs)</small></h6>
                                            </div>
                                            ))}
                                        </td> 
                                        <td>{item.part1.resume !== 'null'?
                                            <a className="btn btn-outline-info m-2" title={`${item.part2.firstName}`} target="_blank" rel="noopener noreferrer"
                                               download href={`${API_URL}/profile/profileResumes/${item.part1.resume}`}> Download</a>
                                        :<p className="m-2">No Resume</p>}
                                        <button type="button" value={item.part1.link_id} className="btn btn-outline-info m-2" onClick={(e)=>pdfcreate(e)}> Get Profile</button>
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

