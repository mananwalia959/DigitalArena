import React, { Component } from 'react';
import Router from './routers/Router';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store/store';
import { baseapi } from './config/values';
import { setAuthToken } from './actions/Authactions';



class App extends Component {
  constructor(){
    super();
    this.state = {
      loaded:false
    };
  }

  componentDidMount(){
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      axios.post(baseapi+'/user/test')
      .then((response)=>{
        const {name,email,cart}=response.data;
        store.dispatch( {
          type: 'SET_CURRENT_USER',
          payload: {
            name,
            email
          },
        })

        store.dispatch({
          type: 'SET_CART',
          payload: cart
        })

        this.setState(()=>({
          loaded:true
        }))
      })
      .catch((error)=>{
        setAuthToken(false);
        store.dispatch( {
          type: 'SET_CURRENT_USER',
          payload: {
          },
        })
        this.setState(()=>({
          loaded:true
        }))
      });
      
    }
    else{
      this.setState(()=>({
        loaded:true
      }))
      

    }
  }
  render() {
    return (
      <div>
      {!this.state.loaded?
        <h1> Please Wait</h1>
        :
        <Provider store={store}>
      <Router />
      </Provider>
      }
      
      
      </div>
    );
  }
}

export default App;
