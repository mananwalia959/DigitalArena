import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { baseapi } from '../../config/values';
import ProductList from './ProductList'


class Orders extends Component {
  constructor(){
    super();
    this.state={
      loaded:false,
      orders:[]
    }
  }

  componentDidMount(){
    axios.get(baseapi+'/user/getorders')
    .then((response)=>{
      this.setState(()=>{
        return {orders:response.data.orders}
      })
    })
  }
  render() {
    return (
      <div>
      
     
    { this.state.orders.map(order => (
      <div key='order._id'>
        <div className='nav-bar navbar-dark bg-dark'>
        <div className='row'>
        <h3 className='navbar-brand col-6 col-md-8 pd-x-2'>Order no:{order._id}</h3> 
        <h3 className='navbar-brand col-6 col-md-3 centereverything text-info'>Rs.{order.amount}</h3>    
        </div> 
        </div> 
        <div>
        {console.log(  order.productlist.length)}

       
        <ProductList products={order.productlist.map(product=>({count:product.count,...product.productid}))} />
        
        </div>
      </div>
    ))}
      </div>
    );
  }
}
// {
//             order.ProductList.map((product)=>{
//               return {...product.ProductList.productid,count:product.ProductList.count}

//             })}
  
        
const mapStateToProps = state => ({
    auth: state.auth
  });
 
export default connect(mapStateToProps)(Orders);