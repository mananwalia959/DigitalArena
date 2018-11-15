import React from 'react';
import ProductGridLayout from './ProductGridLayout'


const ProductList=(props)=>(
  <div className="row">
  {console.log(props.products.length)}
  {props.products.length===0?<p>No Product Found</p>:
    props.products.map((product)=>{
       return (<ProductGridLayout  product={product} key ={product._id} />)
     }) }
  
      
</div>
    
)

export default ProductList

