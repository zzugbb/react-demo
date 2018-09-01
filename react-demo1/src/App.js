import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import {HomeContainer as Home} from "./page/home/Home";
import {SearchContainer as Search} from "./page/search/Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home}/>
        <Route path="/Search" component={Search}/>
      </div>
    );
  }
}

export default App;
