import React, { Component } from 'react';
import BasicLayout from '../../layouts/BasicLayout.js'
import './Home.css';

class Home extends Component {

  render() {
    return (
      <div>
        <BasicLayout history ={this.props.history}>
          <div className="text">
            欢迎进入后台管理系统，请在左侧导航栏进行选择页面
          </div>
        </BasicLayout>
      </div>
    );
  }
}

export default Home;