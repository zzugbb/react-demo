import React, { Component } from 'react';
import {Switch, Route} from 'react-router';
import './App.css';
import Authorize from "./components/Authorize.js";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import Exception500 from "./pages/Exception/500.js";
import NoMatch from "./pages/404.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Authorize></Authorize>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/500" component={Exception500}/>
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
