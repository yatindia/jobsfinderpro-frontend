import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import { API_URL } from "../../../components/utils";
import cities from '../../../components/asserts/ind_cities.json'

import UserList from "./userList";

export default function Search () {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}
    
    const [count, setCount] = useState(0)
    const perpage = 5
    const limit = 10
    const [totalpge,setTotalpge] = useState(0)
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * perpage;
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

    function changeSkip(e){
        setSkip(Number(e.target.value))
      }

// -----Get Job--------
    async function getJob(){
        try {
            // console.log(search)
            const res = await axios.post(`${API_URL}/job/searchSeeker`,search,{headers:header})
             if (res.data.error===false){
                 setfetch(res.data.data[0])
                 setCount(res.data.data[1])
                setTotalpge(Math.ceil(res.data.data[1])/perpage)
                if(perpage<res.data.data[1]){
                    setLoadBtn(true)
                }
                else{setLoadBtn(false)}
            }
        } catch (error) {        
        }
    }

// -----on search--------
    function handleSubmit (){
     setSearch({...search,skip:0,limit:10})
     getJob()
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
      };


      const displayUsers = fetch
      .slice(pagesVisited, pagesVisited + perpage)
      .map((data,id)=>{ return(
            <div key={id}>
            <UserList data={data} key={id}></UserList>
        </div>
    )})




    return (<>
    <div>
        {/* -----Search Bar------ */}
        <div className="container-fluid p-2 ">
            <div className="row justify-content-center ">
                <div className="col-lg col-md col-sm p-1">
                    <input className="form-control formFieldInput text-capitalize"  type="text" name="jobTitle" value={search.jobTitle}
                        onChange={changeHandle} list="browsers" placeholder ="Job Title / Name ..."/>
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
                    <button className="btn btn-findJob" type="button" onClick={handleSubmit}>Search</button>
                </div>
            </div>
        </div>

        {/* ------Content--------- */}
        <div className="container-flex p-2">
        <div className=''>
                <div className='row '>
                    <div className='col d-flex'>
                        <h5 className="text-muted m-2">{count} Results Found:</h5>
                    </div>
                    <div className='col-sm d-flex form-group'>
                        {/* <h5><span >Load</span></h5>  */}
                        <select className="form-control " onChange={(e)=>changeSkip(e)}>
                            <option value=''>1 - 10</option>
                            <option value='10'>10 - 20</option>
                            <option value='20'>20 - 30</option>
                            <option value='30'>30 - 40</option>
                            <option value='40'>40 - 50</option>
                        </select>
                    </div>
                </div>
            </div>
            {fetch.length>0 ?(
                <div className="row d-flex justify-content-center" >
                    <div className="col-md mt-2">
                        <h6 className=" p-2 m-1 text-muted">5 Results Per Page:-</h6>
                        {displayUsers}
                        <div className='row justify-content-center p-4'> 
                            {loadbtn===true ?
                                 <ReactPaginate
                                 previousLabel={"Previous"}
                                 nextLabel={"Next"}
                                 pageCount={totalpge}
                                 onPageChange={changePage}
                                 containerClassName={"paginationBttns"}
                                 previousLinkClassName={"previousBttn"}
                                 nextLinkClassName={"nextBttn"}
                                 disabledClassName={"paginationDisabled"}
                                 activeClassName={"paginationActive"}
                               />
                            :<h5 className="text-info m-1">End of the result</h5>}
                        </div> 
                    </div>
                </div>):<div><h4 className="text-info text-center m-5">Seekers Not available for your search keywords</h4></div>}
        </div>
    </div>
    </>);
}