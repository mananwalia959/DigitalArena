import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import HomePage from '../components/Homepage/HomePage'
import LoginPage from '../components/authentication/LoginPage'
import SignupPage from '../components/authentication/SignupPage'
import Header from '../components/header/Navbar'
import Dashboard from '../components/Dashboard/Dashboard'
import UserOnly from "../components/common/UserOnly";
import GuestOnly from "../components/common/GuestOnly";
import NotfoundPage from '../components/common/NotfoundPage'
import Product from '../components/Product/Product'
import CartPage from '../components/Cart/Cart'
import Orders from '../components/orders/Orders'
import Success from '../components/orders/Success'
import Checkout from '../components/Checkout/Checkout'


const MainRouter = () => (
  <Router>
    <div>
    <Header />
    
      <div className="container">
      <Switch>
      <Route exact path="/" component={HomePage} /> 
      <GuestOnly exact={true} path="/login" component={LoginPage} />
      <GuestOnly exact={true} path="/signup" component={SignupPage} />
      <UserOnly exact={true} path = "/dashboard" component={Dashboard} />
      <UserOnly exact={true} path = "/mycart" component={CartPage} />
      <Route path="/product/:id" component={Product} />
      <UserOnly exact={true} path="/orders" component={Orders} />
      <Route exact={true} path="/order/success" component={Success} />
      <UserOnly exact={true} path ='/checkout' component={Checkout}/>
      <Route component={NotfoundPage} />
      </Switch>
      </div>
    </div>
  </Router>
);
export default MainRouter;