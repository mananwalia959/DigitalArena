import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


class DashBoard extends Component {
  render() {
    return (
   
      <div className='text-xs-center text-xl-center0.'>
     <p>  this is the DashBoard page of {this.props.auth.user.name}</p>

     <Link to="/mycart" className="btn btn-primary"> Go To Cart </Link>
     <br/>
     <Link to="/orders" className="btn btn-primary"> Go To Orders </Link>
      </div>
 
    );
  }
}


const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(DashBoard);