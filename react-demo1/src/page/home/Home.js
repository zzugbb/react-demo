import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import {connect} from 'react-redux';
import { 
  mapDispatchToProps
} from './Home.redux.js';

//mapStateToProps负责将state的数据映射到展示组件的this.props
//相当与从store中得到state，然后赋给了props
//此函数会订阅store,state更新后，会触发组件重绘 
const mapStateToProps = (state) => {
  return {
    num: state.editNum.num
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <header className="navigation">
          <div className="commonWidth">
            <ul className="navigation-ul">
              <li>Num(<span className="quest-num">{this.props.num}</span>)</li>
              <li><Link to="/Search">搜索页面</Link></li>
            </ul>
            <div className="clear"></div>
          </div>  
        </header>
        <div className="commonWidth body-content">
          <h1 className="welcome">欢迎来到我的主页！</h1>
          <button onClick={this.props.addNum}>+</button>
          <button onClick={this.props.deleteNum}>-</button>
          <button onClick={this.props.addNumAsync}>异步两秒增加num</button>
        </div>
      </div>
    );
  }
}

//对展示组件封装为容器组件，利用react-redux的connect高阶函数建立组件与redux联系
export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home); 
