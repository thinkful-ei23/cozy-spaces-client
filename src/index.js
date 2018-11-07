import React from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.css'
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(<Router>
  <Provider store={store}>
    <App />
  </Provider>
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
