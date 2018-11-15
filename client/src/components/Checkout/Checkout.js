import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { baseapi } from '../../config/values';

class Orders extends Component {
    constructor(){
        super();
        this.state={
            products:[],
            message:'',
            address:'',
            pincode:'',
            pincodemessage:'',
            amount:0,
            loaded:true,
            link:''
        }
    }
    componentDidMount(){
        axios.post(baseapi+'/products/getproductsbyid',
        {productList:this.props.cart.productList})
        .then((response)=>{

            const array = response.data.products
        .filter((product)=>product.status==="Available")
        const modifiedarray = array.map((product)=>{
            return ({
                ...product,count:1
            })
        })
        console.log(modifiedarray)
          this.setState(()=>({
            products:modifiedarray,
          }))
          this.CalculateAmount();
        })

    }

    componentDidUpdate(){
        let amount=0;
        this.state.products.forEach((product)=>{
            amount = amount + ((product.price)*(product.count))
        })
        if(amount !== this.state.amount){
            this.CalculateAmount();
        }
        
       
    }

    Createorder=()=>{
               const modifiedproducts=this.state.products.map(element=>{
            return {
                productid:element._id,
                count:element.count
            }

        })
        this.setState(()=>({loaded:false}))
        


       axios.post(baseapi+'/orders/create',{
           products:modifiedproducts,
           address:this.state.address,
           amount:this.state.amount,
           pincode:this.state.pincode
       })
       .then((response)=>{
           console.log(response.data)
           this.setState(()=>({
               link:response.data.payment_link,
               loaded:true
            }))
           
       })
       .catch((error)=>{
           console.log(error.response)
           if(error.response.data.message){
               this.setState(()=>{
                   return {
                    message:error.response.data.message,
                    loaded:true  
                   }
               })
           }
           else{
            this.setState(()=>{
                return {
                 message:'Something went wrong please refresh',
                 loaded:true 
                }
            })
           }
       })
    }

    CalculateAmount=()=>{
        let amount=0;
        this.state.products.forEach((product)=>{
            amount = amount + ((product.price)*(product.count))
        })
        console.log(amount)
        this.setState(()=>({
            amount:amount
        }))


    }
    CheckAvailability=()=>{
        axios.post(baseapi+'/orders/checkpincode/',{
            pincode:this.state.pincode
        }).then(()=>{


            this.setState(()=>({
                pincodemessage:'Delievery is possible in this area'
            }))
        })
        .catch(()=>{

            this.setState(()=>({
                pincodemessage:'Delievery is not possible in this area'
            }))

        })
        
    }


    handleClick = (event,p_id) => {
        const count=event.target.value
        const modifiedproducts=this.state.products.map((product)=>{
            if(product._id===p_id){
                return {...product,count}
            }
            else{
                return product
            }
        })
        this.setState(()=>{
            return {
                products:modifiedproducts
            }
        })

        this.CalculateAmount();
       
        
      }

      onChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value });
      }
      onNumberChange=(e)=>{
          if (e.target.value>=0||e.target.value===''){
            this.setState({ [e.target.name]: e.target.value });
          }

      }
    

  render() {
    return (
      !this.state.loaded?<h1 className='centereverything'>Loading</h1>:
      
      this.state.link!==''?<div className='centereverything'>
      <a href={this.state.link} className='btn btn-danger'> Go To Payment portal</a>
      
      
      </div>:
      
      (<div>
        {this.state.message===''?'':<div className = 'row'>
        
        <h3 className='mx-auto'> {this.state.message} </h3>
        <br/>
           </div>}


      <div className='card px-3 py-3'>
      <div className='row'>
        <div className='col-8 col-md-8 col-lg-8'> 
            <h5 className= 'text-dark'>
             Your Total price is {this.state.amount}
            </h5>
        </div>
     
            <div className='col-4  col-md-4 col-lg-4 '> 

            {this.state.amount===0?'':<button  onClick={this.Createorder} className='btn btn-primary'>Create Order</button>}
            </div>
      </div>
      </div>

      <br/>
      <div className='card px-3 py-3 bg-light'> 
      
      <div className=' row'>
        <div className='col-10 col-md-3  '><h4> Address</h4></div>
        <div className='col-11 col-md-9 '>  
        <textarea  
        className="form-control noresize"
         rows="5"
         onChange={this.onChange}
         value={this.state.address}
         name='address'>
        </textarea> </div>
        <div></div>

      </div>

      <div className='row'>
               <div className='col-4 col-md-3' > <h4 > Pincode</h4></div>
                <div className='col-7 col-md-4'><input  name='pincode'
                type='number'
                value={this.state.pincode}
                onChange={this.onNumberChange}
                className="form-control noresize"
                    rows="5" id="comment"></input></div>

                <button className= 'col-6 col-md-4 btn btn-primary' onClick={this.CheckAvailability} 
                
                > Check Availability 
                </button>
      <div>
      </div>
      </div>
      <div className='mx-auto'><h4> <br/> {this.state.pincodemessage}</h4></div>

    </div>
      <br/>
  

      {this.state.products.map((product)=>{
        return (
            <div className='card mt-2 mb-2' key ={product._id}>
                <div className='row'>
                <h4
                 className=' col-md-6 col-sm-12'>
                 {product.title}
                 </h4>  
                <select
                value={product.count} 
                className='col-md-3 col-sm-8 col-8 mx-auto form-control'
                onChange={(e)=>{
                    this.handleClick(e,product._id)
                }}
                >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>

                </select>
                <h5
                 className=' col-md-3 col-sm-12'>
                 Unit Price:{product.price}
                 </h5>  
                </div>
            </div>
        )
    })}

    


    
      </div>)
    );
  }
}
const mapStateToProps = state => ({
    auth: state.auth,
    cart:state.cart
  });
  
export default connect(mapStateToProps)(Orders);


