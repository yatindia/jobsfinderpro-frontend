import React, { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import axios from "axios";

import { API_URL } from "../../../components/utils";

import ViewModal from "./viewModal";

export default function UserList({data}){

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [dialogShow, setDialogShow] = useState(false);
    const [fetch,setfetch] = useState()


    const dialogClose=()=>{
        setDialogShow(false)
      }
    useEffect(()=>{
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
    },[])

    const viewSeeker=()=>{
       setDialogShow(true) 
    }

    return(<>
            <div className="row z-depth-3 border p-3 m-3" key={data._id}>
                <div className="col-md bg-white rounded-right">
                    <h4 className="m-3 text-start"><span className='text-muted'>Job Designation:</span> {data.jobTitle}</h4>
                    <div className="row m-2">
                        <div className="col-sm">
                            <p className="font-weight-bold">Location</p>
                            <h6 className="text-muted">{data.city}, {data.state}</h6>
                        </div>
                        <div className="col-sm">
                            <p className="font-weight-bold">Past Job</p>
                            {data.pastJobs.map((item,i)=>(
                                <h6 className="text-muted d-flex" key={i}>{item}</h6>
                            ))}
                        </div>
                        <div className="col-sm">
                            <p className="font-weight-bold">Qualification</p>
                            {data.qualifications.map((item,i)=>(
                                <h6 className="text-muted d-flex" key={i}>{item}</h6>
                            ))}
                        </div>
                        {dialogShow === true? <ViewModal show={dialogShow} data={fetch} dialogClose={dialogClose}/> :''}
                        <div className="col">
                            <button type="button" className="btn btn-findJob m-2" onClick={viewSeeker}> View</button>
                        </div>
                    </div>
                    <hr className="bg-primary"/>
                </div>
            </div>
    </>)
}