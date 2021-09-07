import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import "./App.css";
import './components/style.css'

import Lander from "./pages/mainLander";
import UserLander from './pages/jobSeeker/userLander'
import EmpLander from './pages/employer/empLander'
import NavBar from "./components/navBar";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Footer from "./components/footer";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar></NavBar>
        <Switch>
            <Route exact path="/" component={Lander}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/users/dashboard" component={UserLander}/>
            <Route exact path="/employers/dashboard" component={EmpLander}/>
            <Redirect to ='/'/>
          </Switch>
          <Footer></Footer>
      </Router>
    );
  }
}

export default App;
