import React from 'react';
import axios from 'axios';
import { baseapi } from '../../config/values';


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
    <div>{this.state.product.title}</div>
  }
  
    </div>
  }
     
     </div>
    )
  }
};

export default Product
