import React, { Component } from 'react';
import './App.css';

import configureStore from './store';
import { Provider } from 'react-redux';
import AppContainer from './Components/AppContainer/AppContainer';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </div>
    );
  }
}

export default App;
