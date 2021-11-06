import React, { useEffect, useState } from "react"
import axios from "axios";
import jsPDF from 'jspdf'

import { API_URL } from "../../../components/utils";

export default function UserList({data}){

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
;
    const [fetch,setfetch] = useState()
    const [load, setload] =useState(2)
    const [btn, setBtn] =useState(true)
    const count = data.techQualifications.length
    const [mess,setMess] = useState({message: "",style:""})

    useEffect(()=>{
        if(data.techQualifications.length>=load){
            setBtn(false)
        }
        const getlist =async()=>{
            try {
                const res = await axios.post(`${API_URL}/job/searchoneseeker`,{seekerid:data.link_id},{headers:header})
                if(res.data.error===false){
                    const datas = res.data.data
                    setfetch(datas)
                }
            } catch (error) {
                
            }
        }
        getlist()
    },[data.link_id,load])

    function pdfcreate() {    
        let x = 60
        let y = 190
        var doc = new jsPDF(); 
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

    const [input] = useState({
        link_id:profile_2.link_id,
        seekerid:data.link_id
    })

    const downloadResume=async()=>{
        try {
            const res = await axios.post(`${API_URL}/job/takeresume`,input,{headers:header})
            setMess({message:res.data.message,style:'text-info'})
        } catch (error) {
            
        }
    }

    return(<>
            <div className="row border mb-3" key={data._id}>
            {fetch ?
                <div className="col-md bg-white rounded-right">
                    <div className="row d-flex border-bottom">
                        <h5 className=" p-2">{fetch.part2.firstName} {fetch.part2.lastName} 
                                <small> ( {data.jobTitle} )</small></h5>
                        <h6 className={`${mess.style} p-2`}><small>{mess.message}</small></h6>
                    </div>
                    <div className="row m-2">
                        <div className="col-sm">
                            <p className="font-weight-bold">Location</p>
                            <h6 className="text-muted ">{data.city}, {data.state}</h6>
                        </div>
                        <div className="col-sm">
                            <p className="font-weight-bold">Previous Jobs</p>
                            {data.pastJobs.map((item,i)=>(
                                <h6 className="text-muted " key={i}>{item}</h6>
                            ))}
                        </div>
                        <div className="col-sm">
                            <p className="font-weight-bold">Qualification</p>
                            {data.qualifications.map((item,i)=>(
                                <h6 className="text-muted " key={i}>{item}</h6>
                            ))}
                        </div>
                        <div className="col-sm">
                            <p className="font-weight-bold">Skills</p>
                            {data.techQualifications.slice(0,load).map((item,i)=>(
                            <div key={i} id="content" className="row d-flex">
                                <h6 className="col text-muted " >{item.skill} </h6>
                                <h6 className="col text-muted " >{item.experience} Years</h6>
                            </div>
                            ))}
                            {load<count ?<button className="btn btn-upload" onClick={()=>{
                                setload(count)
                            }} type="button" >More Skill...</button>:<></>}
                            
                        </div>
                    </div>
                    <div className="row justify-content-end p-2 border-top">
                            <button type="button" className="btn btn-outline-info mr-2" onClick={pdfcreate}> Get Profile</button>
                            <button type="button" className="btn btn-outline-info" onClick={downloadResume}> Select Resume</button>
                    </div>
                </div>
                :<p>Loading...</p>}
            </div>
    </>)
}