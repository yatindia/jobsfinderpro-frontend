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
import register from '../components/asserts/register.png'
import getJob from '../components/asserts/getJob.png'
import arrow from '../components/asserts/arrow.svg'
import up from '../components/asserts/up.png'
import Helmet from "react-helmet";

import TopHiring from './home/topHire'

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
  const  [place, setPlace] =  useState('Job Title...')

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
const regFree=()=>{
  history.push({pathname:"/register", tab: 'seeker' })
}

    return (<>
    <Helmet>
      <title>Welcome to JobsFinderPro - India's New OneStop Career Solution</title>
      <meta property="og:title" content="JobsFinderPro.com" />
      <meta property="og:description" content="India's New OneStop Career Solution" />
      <meta property="og:image" content="http://localhost:3000/static/media/logo.ea0e8d5b.svg" />
    </Helmet>
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
              <div className='justify-content-start'>
                <h4 className="search-header">Find your next job here, fast.</h4>
                <h4 className="search-header-sub">Search by Job Title, Skills. Any Industry. One-click apply.</h4>
              </div>
              <div className='row justify-content-center  d-flex'>
                <div className="input-group mb-3">
                  <input type="text" className="formInput form-control" name="jobTitle"
                    onChange={changeHandle} placeholder={place}   ref={input1} onKeyPress={e => { if (e.key === "Enter"){  handleSubmit();  }  }}/>
                  <div className="input-group-append">
                    <button className="btn formButton effect" type="button" onClick={handleSubmit}>Search Jobs</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-cs pt-3 justify-content-center">

            <div className="container-sub boxx">
                <h5 className="text-center">Upload Resume</h5>
                  <div className="img-arr text-center">
                    <div className="slide-cs">
                        <p>Create <br/> Account</p>
                        <img src={register} alt=""/>
                    </div>
                    <div className="arrow">
                        <img src={arrow} alt="arr"/> 
                    </div>
                    <div className="slide-cs">
                        <p>Upload <br/> Details</p>
                        <img src={up} alt=""/>
                    </div>
                    <div className="arrow">
                    <img src={arrow} alt="arr"/>  
                    </div>
                    <div className="slide-cs">
                        <p>Get your <br/>Dream Job</p>
                        <img src={getJob} alt=""/>
                    </div>
                </div>
                <div className="">
                    <button className="resume-button" onClick={regFree}>Register</button>
                </div>
            </div>

            <div className="container-sub boxx">
                <h5 className="text-center">For Recruiter</h5>
                <div className="img-arr text-center">
                    <div className="slide-cs">
                        <p>Post Jobs <br/>for Free</p>
                        <img src={post} alt=""/>  
                    </div>
                    <div className="arrow">
                      <img src={arrow} alt="arr"/> 
                    </div>
                    <div className="slide-cs">
                        <p>Transparent Search</p>
                        <img src={rSearch} alt=""/>
                    </div>
                    <div className="arrow">
                      <img src={arrow} alt="arr"/> 
                    </div>
                    <div className="slide-cs">
                        <p>Resumes Diversity</p>
                        <img src={datas} alt=""/>
                    </div>
                </div>
                <div className="">
                    <button className="resume-button" onClick={postJob}>Post Job</button>
                </div>
            </div>
          </div>

          <div className="container-fluid row justify-content-center">
            <TopHiring/>
          </div>
          <div className="homeContent"></div>
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
                      <button className="btn formButton effect " type="button" onClick={handleSubmit}>Search Jobs</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="homeContent2"></div>
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
                      <button className="btn formButton effect " type="button" onClick={handleSubmit}>Search Jobs</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="homeContent2"></div>
        </>:""}

          <div className="container-fluid row justify-content-center align-items-center">
             <div className="">
                 <div className="col text-center m-auto p-2 footerCenter">
                 <button className="btn btn-text btnCat" disabled={true}><b>Categories:</b> </button>
                 <a className="btn btnCat" href="/categories"><b>All</b> </a>
                    {cate.slice(0,6).map((level,i)=>
                        (<button key={i} className="btn btnCat" type="button" value={level} onClick={(e) => handleClick(e.target.value)}>{level}</button>))}
                 </div>
             </div>
          </div>
        </div>
      </div>
      <div className="container-fluid row justify-content-center m-auto bg-light p-3 border shadow">
              <div className="col-sm-5 footerEnd text-center">
                  <a target="_blank" href="https://www.instagram.com/jobsfinderpro/"><i className="fa fa-instagram fa-lg"></i></a>
                  <a target="_blank" href="https://www.facebook.com/jobsfinderpro"><i className="fa fa-facebook fa-lg"></i></a>
                  <a target="_blank" href="https://www.linkedin.com/company/jobsfinderpro"><i className="fa fa-linkedin fa-lg"></i></a>
              </div>
              <div className="col-sm-2 text-center footerEnd">
                  &copy;<span>JobsFinderPro</span>
              </div>
              <div className="col-sm-5 m-auto text-center footerEnd p-2">
                  <a href="/about_us">About Us </a>
                  <a href="/terms" >Terms of Use</a>
                  <a href="/privacy_policy" >Privacy Policy</a>
              </div>
          </div>
  </div>
  </>);
}

export default Lander;