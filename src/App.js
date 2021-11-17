import React, {useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import './components/style.css'

import Lander from "./pages/mainLander";
import UserLander from './pages/jobSeeker/userLander'
import EmpLander from './pages/employer/empLander'
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Fetcher from "./pages/jobList/fetcher";
import FindJobs from "./pages/jobList/findJob";
import ErrorPage from "./components/errorPage";
import SearchCate from "./pages/home/searchCate";

function App () {

const [userRoute,setUserRoute]=useState(false)
const [empRoute, setEmpRoute]=useState(false)

useEffect(()=>{
  const userDetails = JSON.parse(localStorage.getItem( 'userDetails'));
        if(!userDetails){
            setEmpRoute(false)
            setUserRoute(false)
        } 
        else if(userDetails.Role_Type === "employer"){
            setEmpRoute(true)
        }
        else if(userDetails.Role_Type === "seeker"){
            setUserRoute(true) 
        }
    
},[])

    return (
      <Router>
        {/* <NavBar></NavBar> */}
        <Switch>
            <Route active exact path="/" component={Lander}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {userRoute===true?<Route path="/users/dashboard/" component={UserLander}/>:''}
            {empRoute===true?<Route path="/employers/dashboard" component={EmpLander}/>:''}   
            <Route exact path="/categories" component={SearchCate}/>         
            <Route exact path="/categories/search" component={Fetcher}/>
            <Route exact path="/jobs" component={FindJobs}/>
            <Route path ="*" exact={true} component={ErrorPage}/>
          </Switch>
          {/* <Footer></Footer> */}
      </Router>
    );
}

export default App;
