import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductList from '../Product/ProductList';
import { baseapi } from '../../config/values';
import axios from 'axios';
import {Link} from 'react-router-dom'

class CartPage extends Component {
  constructor(){
    super();
    this.state={
      loaded:false,
      count:0,
      products:[]
    }
  }
  componentDidMount(){
    axios.post(baseapi+'/products/getproductsbyid',
    {productList:this.props.cart.productList})
    .then((response)=>{
      this.setState(()=>({
        products:response.data.products,
        count:response.data.count
      }))
      
    })
    
  }
    render() {
      return (
        <div>

        <nav className="navbar navbar-dark bg-dark">
        <p className="navbar-brand"> You have {this.props.cart.productList.length} {this.props.cart.productList.length===1?'product':'products'} in your cart</p>


       {this.props.cart.productList.length===0?"":<li className="nav-item">
       <Link to='/checkout' className="btn btn-primary"> Checkout </Link>
     </li>}
        </nav>
       

       <ProductList products={this.state.products} />
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
      auth: state.auth,
      cart: state.cart
    });
    
  export default connect(mapStateToProps)(CartPage);