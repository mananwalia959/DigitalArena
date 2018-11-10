export const setCart = products =>dispatch => {
  return (dispatch({
    type: 'SET_CART',
    payload: products
  }));
};

export const addTCart = products =>dispatch => {
  return (dispatch({
    type: 'SET_CART',
    payload: products
  }));
};


export const removeFromCart = products =>dispatch => {
  return (dispatch({
    type: 'SET_CART',
    payload: products
  }));
};


export const setCartDirectly = products => {
  return {
    type: 'SET_CART',
    payload: products
  };
};