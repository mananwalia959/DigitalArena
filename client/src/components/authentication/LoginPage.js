import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/Authactions';
import { setCart } from '../../actions/CartActions';
import TextFieldGroup from '../common/TextFieldGroup';
import axios from 'axios';
import {baseapi} from '../../config/values';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      PageError:'',
      error:''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post(baseapi+"/user/login",userData)
    .then((response)=>{
        if (response.status===200){
          this.props.loginUser(response.data)
          this.props.setCart(response.data.cart)
        }

    })
    .catch((error)=>{
        console.log(error);  
        if (error.response.status &&error.response.status===401){
          this.setState(()=>({error:error.response.data.message}))
        }
        else {
          this.setState(()=>({pageError:"something went wrong Please try again later or refresh"}))
        }
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Digital Arena account
              </p>
              {this.state.pageError && <p>{this.state.pageError}</p>}
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />

                
                {this.state.error && <p>{this.state.error}</p>}


                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
  setCart: products => dispatch(setCart(products)),
})




export default connect(mapStateToProps,mapDispatchToProps)(Login);

