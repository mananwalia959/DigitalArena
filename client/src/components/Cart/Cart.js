import React, { Component } from 'react';
import { connect } from 'react-redux';

class CartPage extends Component {
    render() {
      return (
        <div>
       <p>  this is the Cart page of {this.props.auth.user.name}</p>
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
      auth: state.auth
    });
    
  export default connect(mapStateToProps)(CartPage);