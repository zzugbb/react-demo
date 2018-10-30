import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'; 
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools } from 'redux-devtools-extension'; //调试工具
import thunk from 'redux-thunk'; //异步处理中间件
import App from './App';
import rootReducer from './rootRedux' //全局reducer
import registerServiceWorker from './registerServiceWorker'; // 用于在生产环境中为用户在本地创建一个service worker 来缓存资源到本地，提升应用的访问速度

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') );


registerServiceWorker();
