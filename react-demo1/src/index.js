import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'; 
import {createStore, applyMiddleware} from 'redux'; //applyMiddleware处理中间件
import {composeWithDevTools } from 'redux-devtools-extension';//调试工具
import thunk from 'redux-thunk'; //异步处理中间件
import App from './App';
import rootReducer from './rootRedux.js'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
