import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class Success extends Component {
  render() {
    return (
      <div
       className="text-xs-center text-xl-center0." 
       >
      <h1>Your order was Successful</h1>

      <Link to = '/orders' className = 'btn btn-primary'> Go To my Orders</Link>
      </div>
    );
  }
}


export default Success