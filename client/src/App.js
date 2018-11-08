import React, { Component } from 'react';
import Router from './routers/Router';


import { Provider } from 'react-redux';
import store from './store/store';

class App extends Component {
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
