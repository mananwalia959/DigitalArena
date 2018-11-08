import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import HomePage from '../components/Homepage/HomePage'
import LoginPage from '../components/authentication/LoginPage'
import SignupPage from '../components/authentication/SignupPage'
import Header from '../components/header/Navbar'
import Dashboard from '../components/Dashboard/Dashboard'
import UserOnly from "../components/common/UserOnly";
import GuestOnly from "../components/common/GuestOnly";

const BasicExample = () => (
  <Router>
    <div>
    <Header />
    
      <div className="container">
      <Route exact path="/" component={HomePage} />
      <Switch>
      <GuestOnly exact={true} path="/login" component={LoginPage} />
      <GuestOnly exact={true} path="/signup" component={SignupPage} />
      </Switch>
      <Switch>
      <UserOnly exact={true} path = "/dashboard" component={Dashboard} />
      </Switch>
      </div>
    </div>
  </Router>
);
export default BasicExample;