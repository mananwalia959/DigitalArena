import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from '../components/Homepage/HomePage'
import LoginPage from '../components/authentication/LoginPage'
import SignupPage from '../components/authentication/SignupPage'
import Header from '../components/header/Navbar'

const BasicExample = () => (
  <Router>
    <div>
    <Header />
    
      <div className="container">
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      </div>
    </div>
  </Router>
);
export default BasicExample;