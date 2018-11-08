import React, { Component } from 'react';
import axios from 'axios';
import {baseapi} from '../../config/values';
import {Redirect} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup'

class SignupPage extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          email: '',
          password: '',
          password2: '',
          errors: {},
          pageError:'',
          redirect:false
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
  
          onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
      onSubmit(e) {
        e.preventDefault();

        const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2:this.state.password2
        };
        axios.post(baseapi+"/user/signup",newUser)
        .then((response)=>{
            if (response.status===201){
              console.log('haha') 
              this.setState({redirect:true})
            }

        })
        .catch((error)=>{
            console.log('crix');
            console.log(error.response.data.errors)
      
            if (error.response.status===409){
              this.setState(()=>({errors:error.response.data.errors}))
            }
            else {
              this.setState(()=>({pageError:"something went wrong Please try again later or refresh"}))
            }
        })
        console.log(newUser)
      }
  render() {
    return (
      <div>
      {this.state.redirect && <Redirect to='/login' />}
      <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">
              Create your Digital Arena account
            </p>

     {this.state.pageError && <p>{this.state.pageError}</p>}
      <form onSubmit={this.onSubmit}>


        <TextFieldGroup 
        type="text"
        value= {this.state.name}
        onChange={this.onChange}
        name="name"
        placeholder="Name"
        error={this.state.errors.name}
        />

       
        <TextFieldGroup 
        type="text"
        value= {this.state.email}
        onChange={this.onChange}
        name="email"
        placeholder="E-Mail"
        error={this.state.errors.email}
        />
        

      
        <TextFieldGroup 
        type="password"
        value= {this.state.password}
        onChange={this.onChange}
        name="password"
        placeholder="Password"
        error={this.state.errors.password}
        />
      


        <TextFieldGroup 
        type="password"
        value= {this.state.password2}
        onChange={this.onChange}
        name="password2"
        placeholder="Confirm Password"
        error={this.state.errors.password2}
        />

   
        <input type="submit" className="btn btn-info btn-block mt-4" />
      </form>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default SignupPage;
