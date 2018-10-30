import React from 'react';
import {connect} from 'react-redux';
import { Layout, Icon, Button} from 'antd';
import './BasicLayout.css';
import {LoginOut} from '../pages/Login/Login.redux.js';
import SiderMenu from "../components/SiderMenu.js";

const { Header, Sider, Content } = Layout;

@connect(
  state => state,
  {LoginOut}
)
class BasicLayout extends React.PureComponent {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleLogoutClick = () => {
    this.props.history.push('');
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <Layout>
          <Sider
            trigger={null}
            collapsible  //是否可收起
            collapsed={this.state.collapsed}  //当前收起状态
            className="basic-slider"
          >
            <div className="logo">
              <h3>后台系统</h3>
            </div>
            <SiderMenu theme="dark" mode="inline"/>
          </Sider>
          <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ background: '#fff', padding: 0, boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)" }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Button style={{margin: '16px 80px 0 0', float: "right"}} onClick={this.handleLogoutClick}>退出登录</Button>
            </Header>
            <Content style={{ margin: '24px 16px'}}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}


export default BasicLayout;
