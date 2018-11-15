import React from 'react';
import {Link} from 'react-router-dom'


const ProductGridLayout=(props)=>(
    
    <div className="card col-lg-3 col-md-4 col-sm-6"  >
      <img  src={props.product.imagePath} 
      className='card-img-top'
      alt={props.product.title}
      />
    <div className="card-body">
      <h5 className="card-title">{props.product.title} </h5>
      <h6 className="card-subtitle mb-2 text-danger ">X{props.product.count}</h6>
      <Link to={`/product/${props.product._id}`} className="btn btn-primary">Go to Product</Link>
    </div>
  </div>
    

)

export default ProductGridLayout



