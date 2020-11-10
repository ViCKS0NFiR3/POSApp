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
import {Redirect, BrowserHistory} from 'react-router';
import {Router, Link, Switch, Route, useLocation } from 'react-router-dom';
import history from './History';

const store = createStore(allReducer);


function PosApp() {
  const switchToPay = () => history.push("/pay");
  // FIX ERROR CANNOT READ PROPERTY "PUSH OF UNDEFINED"

  return (
    <Provider store={store}>
    <React.StrictMode>
      <App store={store} onClick={() => switchToPay()}/>
      <Router history={history}> 
        <Switch>
          <Route exact path="/" component={ItemList}/>
          <Route path="/pay" render={(props) => (
            <PaymentHandler {...props} store={store}/>
          )} />
        </Switch>
      </Router>
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
