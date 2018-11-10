const initialState = {
    productList:[]
  };
  
  export default (state = initialState, action)=> {
    switch (action.type) {
      case 'SET_CART':
        return {
          ...state,
          productList:action.payload
        };
      default:
        return state;
    }
  }
  

