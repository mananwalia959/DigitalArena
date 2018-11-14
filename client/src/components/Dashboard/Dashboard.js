import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


class DashBoard extends Component {
  render() {
    return (
   
      <div className='text-xs-center text-xl-center0.'>
     <h1 className='card-title'> {this.props.auth.user.name}'s Dashboard</h1>
     <br/>
     <div className='row'>
     <div className=' col-md-6 col-sm-12 '>
     <Link to="/mycart" className=" pt-4 pb-4 btn btn-primary container-fluid"><h4 className='card-title'> Go To Cart </h4></Link>
     </div>


     <div className=' col-md-6 col-sm-12 '>
     <Link to="/orders" className=" pt-4 pb-4 btn btn-primary container-fluid"><h4 className='card-title'> Go To Orders </h4></Link>
     </div>
     </div>


      </div>
 
    );
  }
}


const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(DashBoard);