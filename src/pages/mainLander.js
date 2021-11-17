import React, {useEffect, useState, useRef } from "react";
import './style.css'
import { useHistory } from "react-router-dom";

import Logo from '../components/asserts/logo.svg'
import cate from '../components/asserts/category.json'
import profile from '../components/asserts/profile.svg'
import dashboard from '../components/asserts/dashboard.svg'
import jobs from '../components/asserts/jobs.svg'
import pay from '../components/asserts/pay.svg'
import post from '../components/asserts/post.svg'
import rSearch from '../components/asserts/search.svg'
import datas from '../components/asserts/data.svg'

import { tokenCheck } from "../components/utils";

const Lander =()=> {

  const [search, setSearch] = useState({
    jobs: "",
    jobTitle: "",})
    const [islogged,setislogged] = useState(false)
    const [islogEmp,setislogEmp] = useState(false)
    const [isseeker,setisseeker] = useState(false)
    const [show,setshow] = useState(false)

  const history = useHistory();
  const input1 = useRef(null);
  const  [place, setPlace] =  useState('Job Title ....')

  const changeHandle = (e) => {
      setSearch({...search,[e.target.name]: e.target.value})
  }


  useEffect(()=>{
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(!userDetails){
        setislogged(false)
    } 
    else{
        const tokenValid = tokenCheck(userDetails.Auth_token);
        if (tokenValid === true){
            if(userDetails.Role_Type === "employer"){
                setislogEmp(true); 
                setislogged(true)
            }
            else if(userDetails.Role_Type === "seeker"){
                setisseeker(true);  
                setislogged(true)
            }
        }else {
            localStorage.removeItem('userDetails')
            localStorage.removeItem('userInfo')
            history.push('/')
            window.location.reload()
        }
    }
},[])


  const handleSubmit=()=>{
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    if(!profile_1){
      history.push('/login');
    }else if(search.jobTitle !== ''){
      history.push('/jobs?kwds='+search.jobTitle+'&loc=');
    }else{
      input1.current.focus();
      setPlace('Search Query! by Job Title..')
      // document.getElementById('errs').innerHTML = "Enter search Query!!"
    }
  }

  const handleClick=(e)=>{  
    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    if(!profile_1){
        history.push('/login');
      }else{
        if(e !== ""){
            history.push('categories/search?kwds='+e+'&key=');
        }else{
           history.push('/')
        }
      }
}

const handleLogout=()=> {
  localStorage.removeItem('userDetails')
  localStorage.removeItem('userInfo')
  history.push('/')
  window.location.reload()
};

const postJob=()=>{
  history.push({pathname:"/register", tab: 'employer' })
}


    return (<>
    <div>
      <div id="welcome">
        <div className="container">
          {/* ---------- New User--------- */}
        {islogged === false ?<>
          <div className="container-fluid row justify-content-center align-items-center p-1">
              <div className="col m-auto text-right footerTop">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                    <button className="btn" onClick={postJob}>Post a Job</button>
                  </div>
            </div>
          <div className="container-fluid row justify-content-center align-items-center homeContent ">
            <div className="col">
              <div className='row justify-content-center logo'>
                <img src={Logo} alt='Yat Jobs'/>
              </div>
              <div className='row justify-content-center  d-flex'>
                <div className="input-group mb-3">
                  <input type="text" className="formInput form-control" name="jobTitle"
                    onChange={changeHandle} placeholder={place}   ref={input1} onKeyPress={e => { if (e.key === "Enter"){  handleSubmit();  }  }}/>
                  <div className="input-group-append">
                    <button className="btn formButton effect" type="button" onClick={handleSubmit}>Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid row justify-content-center align-items-center">
          <div className='col m-auto text-center'>
            <button className=" row btn btn-upload" onClick={()=>setshow(true)}><b>For Recruiters</b></button>
             {show ?
             <div  className="row text-center mt-2">
                  <div className='col boxx'>
                      <div className='icon2'><img src={post} alt='profile'/></div>
                     <h5>Post Jobs for Free</h5>
                     <p>Reach desired job seekers with a job posting. Get started today!</p>
                  </div>
                  <div className='col boxx'>
                    <div className='icon2'><img src={rSearch} alt='profile'/></div>
                     <h5>Transparent Search</h5>
                     <p>Access our database and find relevant candidates with most transparent keyword-search.</p>
                  </div>
                  <div className='col boxx'>
                      <div className='icon2'><img src={datas} alt='profile'/></div>
                     <h5>Resumes Diversity </h5>
                     <p>Get The Right Candidates with Accurate Contact Data and Save resources with Better Insights.</p>
                  </div>
              </div>:''
             }
          </div>
        </div>
          </>:""}

          {/* ---------- Seeker User--------- */}
      {isseeker === true ?
        <>
            <div className="container-fluid row justify-content-center align-items-center p-1">
              <div className="col m-auto text-right footerTop">
                    <a href="/" type="button" onClick={handleLogout}><i className="fa fa-sign-out text-danger"></i> Logout</a>
                </div>
          </div>
          <div className="container-fluid row justify-content-center align-items-center homeContent2">
            <div className='col'>
              <div className ='row justify-content-center d-flex p-3'>
                <div className='col-sm-3 logo2'>
                    <img src={Logo} alt='Yat Jobs'/>
                </div>
                <div className='col icon text-center'>
                    <a href="/users/dashboard"><img src={profile} alt='profile'/>
                    <p className="m-auto">Dashboard</p></a>
                  </div>
                  <div className='col icon text-center'>
                    <a href="/users/dashboard/profile"><img src={dashboard} alt='dashboard'/>
                    <p className="m-auto">Profile</p></a>
                  </div>
                  <div className='col icon text-center'>
                    <a href="/users/dashboard/myjobs"><img src={jobs} alt='jobs'/>
                    <p className="m-auto">My Jobs</p></a>
                  </div>
              </div>
              <div className='row justify-content-center d-flex p-3'>
                  <div className="col input-group ">
                    <input type="text" className="formInput form-control " name="jobTitle"
                      onChange={changeHandle} placeholder={place}   ref={input1} onKeyPress={e => { if (e.key === "Enter"){  handleSubmit();  }  }}/>
                    <div className="input-group-append">
                      <button className="btn formButton effect " type="button" onClick={handleSubmit}>Search</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </>:""}

         {/* ---------- Employer User--------- */}
      {islogEmp === true ?
        <>
          <div className="container-fluid row justify-content-center align-items-center p-1">
              <div className="col m-auto text-right footerTop">
                    <a href="/" type="button" onClick={handleLogout}><i className="fa fa-sign-out text-danger"></i> Logout</a>
                </div>
          </div>
          <div className="container-fluid row justify-content-center align-items-center homeContent2">
            {/* <div className="col-sm-3">
              <div className='row justify-content-center logo2'>
                  <img src={Logo} alt='Yat Jobs'/>
              </div>
            </div> */}
            <div className='col'>
              <div className ='row justify-content-center d-flex p-3'>
                <div className='col-sm-3 '>
                    <img src={Logo} alt='Yat Jobs'/>
                </div>
                <div className='col icon text-center'>
                    <a href="/employers/dashboard"><img src={profile} alt='profile'/>
                    <p className="m-auto">Dashboard</p></a>
                  </div>
                  <div className='col icon text-center'>
                    <a href="/employers/dashboard/profile"><img src={dashboard} alt='dashboard'/>
                    <p className="m-auto">Profile</p></a>
                  </div>
                  <div className='col icon text-center'>
                    <a href="/employers/dashboard/search"><img src={rSearch} alt='jobs'/>
                    <p className="m-auto">Resumes</p></a>
                  </div>
                  <div className='col icon text-center'>
                    <a href="/employers/dashboard/newjobs"><img src={post} alt='jobs'/>
                    <p className="m-auto">Post Job</p></a>
                  </div>
                  <div className='col icon text-center'>
                    <a href="/employers/dashboard/jobs"><img src={jobs} alt='jobs'/>
                    <p className="m-auto">Jobs</p></a>
                  </div>
                  <div className='col icon text-center'>
                    <a href="/employers/dashboard/payment"><img src={pay} alt='jobs'/>
                    <p className="m-auto">Buy Points</p></a>
                  </div>
              </div>
              <div className='row justify-content-center d-flex p-3'>
                  <div className="col input-group ">
                    <input type="text" className="formInput form-control " name="jobTitle"
                      onChange={changeHandle} placeholder={place}   ref={input1} onKeyPress={e => { if (e.key === "Enter"){  handleSubmit();  }  }}/>
                    <div className="input-group-append">
                      <button className="btn formButton effect " type="button" onClick={handleSubmit}>Search</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </>:""}


          <div className="container-fluid row justify-content-center align-items-center homeContent2">
             <div className="row">
                 <div className="col-md-10 text-center m-auto p-3 footerCenter">
                 <button className="btn btn-text btnCat" disabled={true}><b>Categories:</b> </button>
                 <a className="btn btnCat" href="/categories"><b>All</b> </a>
                    {cate.slice(0,6).map((level,i)=>
                        (<button key={i} className="btn btnCat" type="button" value={level} onClick={(e) => handleClick(e.target.value)}>{level}</button>))}
                 </div>
             </div>
          </div>

          <div className="container-fluid row justify-content-center align-items-center ">
              <div className="col m-auto text-center footerEnd">
                  <a href="/"><i className="fa fa-twitter"></i></a>
                  <a href="/"><i className="fa fa-facebook"></i></a>
                  <a href="/"><i className="fa fa-linkedin"></i></a>
                  <a href="/">About Us </a>
                  <a href="/">Contact Us </a>
                  <a href="/">Disclaimer </a>
                  <a href="/">Privacy Policy</a>
                  &copy;<span>Copyright</span>
                </div>
          </div>

        </div>
      </div>
  </div>
  </>);
}

export default Lander;