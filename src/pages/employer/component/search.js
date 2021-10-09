import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../../components/utils";
import cities from '../../../components/asserts/ind_cities.json'

import UserList from "./userList";

export default function Search () {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
    
    const [count, setCount] = useState(0)
    const range = 10
    const limit = 10
    const [totalpge,setTotalpge] = useState(0)
    const [skip, setSkip] = useState(0)

    const [loadbtn, setLoadBtn] = useState(false)
    const [fetch,setfetch] = useState([])
    const [search, setSearch] = useState({
        jobTitle: "",
        state:"",
        city: "",
        skip:skip,
        limit:limit
    })
   
// ---On mount function -----
    useEffect(()=>{
        setSearch({...search,skip:skip,limit:limit})
    },[skip,limit])

 
// ---On Change function -----
    function changeHandle(e) {
        setSearch({...search,[e.target.name]: e.target.value,skip:0,limit:10})
    }

// -----Get Job--------
    async function getJob(){
        try {
            const res = await axios.post(`${API_URL}/job/searchSeeker`,search,{headers:header})
             if (res.data.error===false){
                 setfetch(res.data.data[0])
                setCount(res.data.data[1])
            //     setTotalpge(Math.ceil(res.data.data[1])/limit)
            //     if(limit<res.data.data[1]){
            //         setLoadBtn(true)
                 }
                else{setLoadBtn(false)}
        } catch (error) {        
        }
    }

// -----on search--------
    function handleSubmit (){
     setSearch({...search,skip:0,limit:10})
     getJob()
    }

    const  loadmore= ()=>{
        setSkip(skip=>skip + range);
        if(skip >=range){
            getJob()
        }
    }




    return (<>
    <div>
        {/* -----Search Bar------ */}
        <div className="container-fluid m-2 p-2 ">
            <div className="row justify-content-center p-2 m-2">
                <div className="col-lg col-md col-sm p-1">
                    <input className="form-control formFieldInput text-capitalize"  type="text" name="jobTitle" value={search.jobTitle}
                        onChange={changeHandle} list="browsers" placeholder ="Job Designation ..."/>
                </div> 
                <div className="col-lg col-md col-sm p-1">
                    <input type="text" className="form-control text-capitalize formFieldInput" placeholder="State ..." name="state"
                        value={search.state} onChange={changeHandle} required list='state'/>
                        <datalist id ='state'>
                            {Array.from(new Set(cities.map(item=>item.state))).map((state,i)=>(<option key={i} value={state}>{state}</option>))}
                        </datalist>
                </div>
                <div className="col-lg col-md col-sm p-1">
                    <input type="text" className="form-control text-capitalize formFieldInput" placeholder="City ..." name="city"
                        value={search.city} onChange={changeHandle} required list='city'/>
                        <datalist id ='city'>
                                {Array.from(new Set(cities.filter(selec => selec.state === search.state).map(item=>item.name)))
                                    .map((name,i)=>(<option key={i} value={name}>{name}</option>))}
                            </datalist>
                </div>
                <div className="m-1">
                    <button className="btn btn-findJob" type="button" onClick={handleSubmit}>Find Jobs</button>
                </div>
            </div>
        </div>

        {/* ------Content--------- */}
        <div className="container-flex m-3 p-2">
            {fetch.length>0 ?(
                <div className="row d-flex justify-content-center" >
                    <div className="col-md-10 mt-2">
                        <h5 className="text-muted">{count} Results Found:-</h5>
                        {fetch.map((data,id)=>(
                        <div key={id}>
                            <UserList data={data} key={id}></UserList>
                        </div>
                        ))}
                        <div className='row justify-content-center'> 
                            {loadbtn===true ?
                                <button className="m-2 btn btn-findJob" type="button" >Next {' >>'}</button>
                            :<h5 className="text-info m-1">End of the result</h5>}
                        </div> 
                    </div>
                </div>):<div><h4 className="text-info text-center m-5">No Jobs available for your search keywords</h4></div>}
        </div>
    </div>
    </>);
}