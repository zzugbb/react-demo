import React from 'react'
import request from '../utils/request.js';
import { withRouter } from 'react-router-dom' //包装任何自定义组件，将react-router的history,location,match 三个对象传入。

//验证组件
@withRouter
class Authorize extends React.Component {

  componentDidMount() {
    const _this = this;
    request('/api/getLoginStatusByCookie')
      .then(function (response) {
        if (response.code === 1 && _this.props.location.pathname === "/") { //已登录,当前为登录页面，重定向到首页
          _this.props.history.push('/home');
        } else if (response.code === 1) {  //已登录，返回当前页面
          _this.props.history.push(_this.props.history.location);
        } else { //未登录，跳至登录页面
          _this.props.history.push('');
        }
      })
  }

  render() {
    return "";
  }
}

export default Authorize;