import { baseapi } from "../config/values";
import axios from 'axios'

export const setCart = products =>dispatch => {
  return (dispatch({
    type: 'SET_CART',
    payload: products
  }));
};

export const addToCart = id =>dispatch => {
  axios.post(baseapi+'/cart/'+id)
  .then(response=>{
    console.log(response.data)
    const products=response.data.cart
    return (dispatch({
      type: 'SET_CART',
      payload: products
    }));
  })
  .catch((error)=>{
    console.log(error)
  }

)

};


export const removeFromCart = id =>dispatch => {
  axios.delete(baseapi+'/cart/'+id)
  .then(response=>{
    console.log(response.data)
    const products=response.data.cart
    return (dispatch({
      type: 'SET_CART',
      payload: products
    }));
  })
  .catch((error)=>{
    console.log(error)
  }
)

};


export const setCartDirectly = products => {
  return {
    type: 'SET_CART',
    payload: products
  };
};