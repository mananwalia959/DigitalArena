import React from 'react';
import axios from 'axios';
import { baseapi } from '../../config/values';
import { connect } from 'react-redux';
import {addToCart,removeFromCart} from '../../actions/CartActions' 

export class Product extends React.Component {
  constructor(){
    super();
    this.state={
      error:'',
      loaded:false,
      product:{}
    }
  }

  componentDidMount(){
    axios.get(baseapi+'/products/'+ this.props.match.params.id)
    .then((response)=>{
      this.setState(()=>({
        loaded:true,
        product:response.data.product
      }))
    })
    .catch(()=>{
      this.setState(()=>({
        loaded:true,
        error:'The product does not exist or is unavailable right now'
      }))

    })

  
  }
  
  render() {
    return(
     <div>
     {this.state.loaded===false?
    <h1>Please wait</h1>
    :
    <div>
    {this.state.error!==''?
    <div>{this.state.error}</div>
    :
    (<div className='row '>
    <div className='card col-lg-3 col-md-6 col-sm-12'>  <img  src={this.state.product.imagePath} alt= {this.state.product.title}
    className='card-img-top'
    /></div>
    <div className='card col-lg-9 col-md-6 col-sm-12'> <div className=' text-center'>
      <h1 className='card-title'> {this.state.product.title} </h1> 
      <h3 className='card-title'><span className='text-danger'> {this.state.product.status}  Price  Rs. {this.state.product.price}</span></h3>
      {this.props.auth.isAuthenticated ?
        <div>{this.props.cart.productList.includes(this.props.match.params.id)?
          <button className = "btn btn-danger" onClick={()=>{
            this.props.removeFromCart(this.props.match.params.id)
          }}> Remove from Cart</button>
            :
            <button className = "btn btn-primary" onClick={()=>{
              this.props.addToCart(this.props.match.params.id)
            }}>{this.props.cart.productList.length>=20?"Cart is Full":"Add to Cart"}</button>
          }</div>

        :


        <button disabled={true} className = "btn btn-primary"> You need to Login to Add to cart</button>}
     
    </div>
    <h4 className='text-secondary'>Description : {this.state.product.description}</h4>
    </div>
     </div>)
  }
  
    </div>
  }
     
     </div>
    )
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});


const mapDispatchToProps = dispatch => ({
  addToCart: (id) => dispatch(addToCart(id)),
  removeFromCart: (id) => dispatch(removeFromCart(id)),
})


export default connect(mapStateToProps,mapDispatchToProps)(Product);
