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
      waiting:true
    };
  }

  componentWillMount(){
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      axios.post(baseapi+'/user/test')
      .then((response)=>{
        const {name,email}=response.data;
        store.dispatch( {
          type: 'SET_CURRENT_USER',
          payload: {
            name,
            email
          },
        })
      })
      .catch((error)=>{
        setAuthToken(false);
      });
      
    }
    console.log("haha")


  }
  render() {
    return (
      <div>
      <Provider store={store}>
      <Router />
      </Provider>
      </div>
    );
  }
}

export default App;
