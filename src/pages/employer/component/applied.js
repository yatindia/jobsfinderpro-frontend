import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams} from 'react-router-dom';
import jsPDF from 'jspdf'

import { API_URL } from "../../../components/utils";

export default function Applied(){

    const param = useParams()
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'));

    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [getdata, setGetdata] = useState({})
    const [seeker, setseeker] = useState()
    const [mess,setMess] = useState({message: "",style:""})
    const [load, setload] =useState(2)

    useEffect(() => {
        getuser()
        
    },[]);

    console.log("dkjs")
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

    const seekonePdf=async(item)=>{
        const res = await axios.post(`${API_URL}/profile/getseekerprofile`,{seekerid:item},{headers:header})
        const infa ={
            part1: res.data.data.part2, 
            part2: res.data.data.part1, 
        }
        pdfcreate(infa)
    }



    function pdfcreate(data) {   
        let x = 60
        let y = 150
        let a = 200 
        var doc = new jsPDF(); 
        doc.setLineWidth(0.1);
        doc.rect(10, 20, 190, 300);
        doc.setLineWidth(0.1);
        doc.line(57, 20, 57, 300)
        doc.text(80, 10, 'Job Seeker Profile Details');        
        doc.text(20, 30, 'Name: ');    
        doc.text(60, 30, `${data.part2.firstName} `); 
        doc.text(100, 30, `${data.part2.lastName}`);   
        doc.text(150, 30, 'Gender:');  
        doc.text(180, 30, `${data.part1.gender}`);  
        doc.text(20, 50, 'Mail Id:');          
        doc.text(60, 50, `${data.part1.email}`);
        doc.text(20, 70, 'DOB:');  
        doc.text(60, 70, `${(data.part1.dateOfBirth).split('T')[0]}`); 
        doc.text(20, 90, 'Mobile: ');    
        doc.text(60, 90, `${data.part1.mobile}`);  
        doc.text(20, 110, 'Location: ');    
        doc.text(60, 110, `${data.part1.city}, ${data.part1.state}` );   
        doc.text(20, 130, 'Designation: ');    
        doc.text(60, 130, `${data.part1.jobTitle}`);   
        doc.text(20, 150, 'Qualifications: ');    
        (data.part1.qualifications).forEach(e=>{
            doc.text(x,y,`${e.qualification} - ${e.percentage} Percentage`); 
            doc.text(130,y,``);
            y=y+10})    
        doc.text(20, 200, 'Skills: '); 
        (data.part1.techQualifications).forEach(e=>{
            doc.text(x,a,`${e.skill} - ${e.experience} Years`); 
            a=a+10}) 
        doc.save(`${data.part2.firstName}.pdf`);  
     }


    const downloadpdf=(e)=>{
        seekonePdf(e.target.value)
    }

    const downloadResume=async(e)=>{
        try {
            const res = await axios.post(`${API_URL}/job/takeresume`,{link_id:profile_2.link_id,seekerid:e.target.value},{headers:header})
            setMess({message:res.data.message,style:'text-info'})
        } catch (error) {
            
        }
    }

    return (<>
    <div className="container-flex">
        <div>
            <div className="row d-flex justify-content-center m-2 p-2" key={getdata._id}>
                <div className="col-md-12 mt-2  border">
                    <div className="row z-depth-3">
                        <div className="col-sm-9 bg-white rounded-right d-flex">
                            <h5 className="m-3 text-start">{getdata.jobTitle}</h5>
                            <div className="row m-3 align-item-end">
                                    <p className="font-weight-bold">Deadline On: </p>
                                    <p className="text-muted"> {getdata.jobApplyEnd}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                            <h6 className={mess.style}>{mess.message}</h6>
                        </div> 
                    <div className='row m-2 p-1'>
                         {seeker ?
                         <div className="table-responsive ">
                             <table className="table table-striped border">
                             <thead className='table-header'>
                                 <tr>
                                 <th scope="col">Name</th>
                                 <th scope="col">Position</th>
                                 <th scope="col">Qualification</th>
                                 <th scope="col">Skills</th>
                                 <th scope="col">Profile</th>
                                 <th scope="col">Resume</th>
                                 </tr>
                             </thead>
                                {seeker.map((item,i) =>(
                                    <tbody key={i}>
                                        <tr>
                                        <td>{item.part2.firstName}</td>
                                        <td>{item.part1.jobTitle}</td>
                                        <td>{item.part1.qualifications.map((item,i)=>(
                                            <div key={i} className="row d-flex">
                                                <h6 className="col" >{item.qualification} <small className="text-muted">({item.percentage}Pct)</small></h6>
                                            </div>
                                            ))}
                                        </td> 
                                        <td>{item.part1.techQualifications.slice(0,load).map((item,i)=>(
                                            <div key={i} className="row d-flex">
                                                <h6 className="col" >{item.skill} <small className="text-muted">({item.experience}Yrs)</small></h6>
                                            </div>
                                            ))}
                                             {load<item.part1.techQualifications.length ?<button className="btn btn-link" onClick={()=>{
                                                    setload(item.part1.techQualifications.length)
                                            }} type="button" >More...</button>:<></>}
                                        </td> 
                                        <td>
                                            <button className="btn btn-outline-info mr-2" value={item.part2._id} onClick={ (e)=>downloadpdf(e)}>Download</button>
                                        </td>
                                        <td>{item.part1.resume !== 'null'?<div>
                                            <button className="btn btn-outline-info" value={item.part2._id} onClick={ (e)=>downloadResume(e)}>Select</button>
                                            </div>:<p className="m-2">No Resume</p>}
                                        </td>
                                        </tr>
                                    </tbody>
                                ))}   
                             </table></div>
                        :<label>No data</label>} 
                    </div>
                <a href="/employers/dashboard/jobs" className=" text-right btn btn-outline-info m-3">Back</a>
                </div>
            </div>
             </div>
        </div>
   </> )
}

