import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

import LoginPage from '../components/authentication/LoginPage'
import Header from '../components/header/Navbar'
import Dashboard from '../components/Dashboard/Dashboard'
import UserOnly from "../components/common/UserOnly";
import GuestOnly from "../components/common/GuestOnly";

const BasicExample = () => (
  <Router>
    <div>
    <Header />
    
      <div className="container">
      <Switch>
      <GuestOnly exact={true} path="/login" component={LoginPage} />
      <UserOnly exact={true} path = "/" component={Dashboard} />
      </Switch>
      </div>
    </div>
  </Router>
);
export default BasicExample;