import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import '../style.css'

import { API_URL } from "../../components/utils";
import Listing from "./listing";

export default function Featcher ({location}) {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const header = {'authorization': `<Bearer> ${profile_1.Auth_token}`}

    const [count, setCount] = useState(0)
    const perpage = 10
    const limit = 100
    const [totalpge,setTotalpge] = useState(0)
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * perpage;
    const [skip, setSkip] = useState(0)
    
    const [cat,setcat] = useState()
    const [loadbtn, setLoadBtn] = useState(false)
    const [fetch,setfetch] = useState([])
    const [search, setSearch] = useState({
        jobCategory: "",
        jobSubCategory:"",
        jobCity:"",
        skip:skip,
        limit:limit
    })
   
// ---On mount function -----
    useEffect(()=>{
        const param = new URLSearchParams(location.search);
        const loc = param.get('kwds');
        try {
            let subData = require('../../components/asserts/subCategory/'+loc+'.json');
            setcat(subData)
        } catch (error) {
            setcat('')
        }
        setSearch({...search,jobCategory:loc,skip:skip,limit:limit})
    },[skip,limit])

 
// ---On Change function -----
    const handleClick=async(e)=> {
        setSearch({...search,jobSubCategory: e,skip:0,limit:100})
    }

    // function changeHandle(e) {
    //     setSearch({...search,jobCity: e.target.value,skip:0,limit:100})
    // }

    function changeSkip(e){
      setSkip(Number(e.target.value))
    }

// -----Get Job--------
    async function findJob(){
        try {
            const res = await axios.post(`${API_URL}/job/search`,search,{headers:header})
            if (res.data.error===false){
                setfetch(res.data.data[0])
                setCount(res.data.data[1])
                setTotalpge(Math.ceil(res.data.data[1])/perpage)
                if(perpage<res.data.data[1]){
                    setLoadBtn(true)
                }
                else{setLoadBtn(false)}
            }else{
                document.getElementById("succ").innerText = res.data.message
            }
        } catch (error) {        
        }
    }

// -----Pagination--------
    const changePage = ({ selected }) => {
        setPageNumber(selected);
      };


      const displayJobs = fetch
      .slice(pagesVisited, pagesVisited + perpage)
      .map((data,id)=>{ return(
        <div key={id}>
            <Listing data={data}></Listing>
        </div>
    )})

    return (<>
    <div >
        {/* -----Search Bar------ */}
        <div className="container m-auto row justify-content-center" >
        <div className="col text-center m-2 p-2 ">
             <div className="row">
                 { cat ? <div className="col-sm d-flex">
                     <input className="form-control formFieldInput" type='select' list='subcat' placeholder="Select Subcategory....." onChange={(e) => handleClick(e.target.value)}/>
                     <datalist id='subcat'>
                     {cat.map((level,i)=>
                        (<option key={i} value={level}>{level}</option>))}
                     </datalist>
                     
                 </div> :<h5>Loading</h5> }
                 {/* <div className="col-lg col-md col-sm p-1 m-1 input-group">
                    <input className="form-control formFieldInput text-capitalize"  type="text" name="jobCity" value={search.jobCity}
                    onChange={changeHandle} list="browsers1" placeholder ="Locations..."/>
                </div> */}
                <div className="m-1 m-auto align-item-center">
                    <button className="btn btn-findJob" type="button" onClick={findJob}>Search</button>
                </div>
             </div>
        </div> 
        </div>
        {/* ------Content--------- */}
        <div className="container m-3 p-2">
            <div className=' container'>
                <div className='row d-flex'>
                <h5 className="text-muted m-2">{count} Results Found: <span className='ml-2'>Load</span></h5>
                <select className="form m-2" onChange={(e)=>changeSkip(e)}>
                    <option value=''>1 - 100</option>
                    <option value='100'>100 - 200</option>
                    <option value='200'>200 - 300</option>
                    <option value='300'>300 - 400</option>
                    <option value='400'>400 - 500</option>
                </select>
                </div>
            </div>
            {fetch.length>0 ?(
            <div className="row d-flex justify-content-center" >
                <div className="col-md-10 mt-2">
                <h5 className="text-muted">10 Results Per Page:-</h5>
                    {displayJobs}
               <div className='row justify-content-center'> 
                    {loadbtn===true ?
                        //   <button className="m-2 btn btn-findJob" type="button" onClick={loadmore}>Next {' >>'}</button>
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
            </div>):<div><h4 className="text-info text-center m-5" id='mess'>No Jobs available/ Search Limit Exceeded</h4></div>}
        </div>

    </div>
    </>);
}