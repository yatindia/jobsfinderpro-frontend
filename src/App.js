import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";

import Lander from "./pages/mainLander";
import UserAuth from "./pages/jobSeeker/userAuth";
import EmpAuth from "./pages/employer/empAuth";
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
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} exact/>
            <Route exact path="/users" component={UserAuth}/>
            <Route path="/users/dashboard" component={UserLander}  />
            <Route exact path="/employers" component={EmpAuth}  />
            <Route path="/employers/dashboard" component={EmpLander}  />
          </Switch>
          <Footer></Footer>
      </Router>
    );
  }
}

export default App;
