import React, { Component } from 'react';
import { connect } from 'react-redux';


class Orders extends Component {
  render() {
    return (
      <div>
     <p>  this is the orders page of {this.props.auth.user.name}</p>
      </div>
    );
  }
}


const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(Orders);