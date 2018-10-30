import React, { Component } from 'react';
import {connect} from 'react-redux';
import './Login.css';
import UserLayout from '../../layouts/UserLayout.js'
import ItemMap from './map.js';
import {Form, Input, Button, Alert} from 'antd';
import {LoginIn} from './Login.redux.js';

const FormItem = Form.Item;
@connect(
  state => state,
  {LoginIn}
)


class LoginForm extends Component {

  constructor (props){
    super(props);
    this.state = {
      loginStatus: "",  //登录回调的状态
      message: "",  //登录回调的提示
    }
  }


  //表单提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.history.push('/home');
      }
    });
  }  


  //错误提示函数
  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  //点击验证码输入框, 更改验证码渲染状态，可以渲染
  handleClikCaptchaInput() {
    this.setState({
      captchaRenderState: true
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form;
    return (
      <div>
        <UserLayout>
          <div className="main">
            {this.state.loginStatus !== "" && this.state.message !== "" && this.renderMessage(this.state.message)}
            <h3 className="title"> · 员工登录</h3> 
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('mobile', {
                    rules: ItemMap.Mobile.rules,
                  })(
                  <Input className="input-mobile" placeholder="请输入手机号" size="large" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                    rules: ItemMap.Password.rules,
                  })(
                  <Input type="password" className="input-password" placeholder="请输入密码" size="large"/>
                )}  
              </FormItem>  
              <FormItem>
                {getFieldDecorator('captcha', {
                    rules: ItemMap.Captcha.rules,
                  })(
                  <Input className="input-captcha" placeholder="请输入验证码" size="large" onClick={this.handleClikCaptchaInput.bind(this)}/>
                )} 
                {/* TODO: 补充图形验证码 */}
              </FormItem>  
              <FormItem>
                <a className="reset-password" href="">重置密码</a>
                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
              </FormItem>
            </Form>
          </div>
        </UserLayout>
      </div>
    );
  }
}

//经过Form.create 包装的组件将会自带 this.props.form 属性, this.props.form提供 getFieldDecorator 等api
// getFieldDecorator(id, options) 装饰 Form.Item 的child
const Login = Form.create()(LoginForm); 

export default Login;