import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ItemList from './ItemList';
import PaymentHandler from './PaymentHandler'; 
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';
import {Router, Switch, Route } from 'react-router-dom';
import history from './History';

const store = createStore(allReducer);


function PosApp() {
  return (
    <Provider store={store}>
    <React.StrictMode>
      <h1>Point-of-Sale System</h1>
      <Router history={history}> 
        <Switch>
          <Route exact path="/" render={(props) => (
            <App {...props} store={store}/>
          )} />
          <Route exact path="/pay" render={(props) => (
            <PaymentHandler {...props} store={store}/>
          )} />
        </Switch>
      </Router>
      <ItemList store={store}/>
    </React.StrictMode>
  </Provider>
  );
}

ReactDOM.render(
  <PosApp />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
