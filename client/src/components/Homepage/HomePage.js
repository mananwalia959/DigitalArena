import React, { Component } from 'react';
import ProductList from './../Product/ProductList'
import { baseapi } from '../../config/values';
import axios from 'axios'
class HomePage extends Component {
  constructor(){
    super();
    this.state={
      loaded:false,
      products:[]
    }
  }
  componentDidMount(){

    axios.get(baseapi+"/products")
    .then((response)=>{
      this.setState(()=>({
        loaded:true,
        products:response.data.products
      }))
    })
    .catch()
   
  }
  render() {
    return (
      <div>
      {!this.state.loaded?<h1>Please wait....</h1>:<ProductList products={this.state.products} />}
      </div>
      
    );
  }
}

export default HomePage;
