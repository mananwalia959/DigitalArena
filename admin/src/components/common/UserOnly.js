import React from 'react';
import { Route, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



const UserOnly = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps,null,null,{
    pure: false
  })(UserOnly));