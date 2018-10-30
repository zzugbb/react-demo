import React, { Component } from 'react';
import BasicLayout from '../layouts/BasicLayout.js';
import { Button } from 'antd';
import {Link } from 'react-router-dom';
import Img404 from '../assets/404.svg';

class NoMatch extends Component {

  render() {
    return (
      <div>
        <BasicLayout history ={this.props.history}>
          <div style={{display:"flex", marginTop: "100px"}}>
            <img style= {{flex: "3"}} src={Img404} alt="" />
            <div style={{flex:"2", marginTop:"50px"}}>
              <h1 style={{
                fontSize: "72px",
                lineHeight: "72px",
                fontWeight: "600",
                color: "#434e59",
                marginBottom: "24px"
              }}>404</h1>
              <p style= {{
                color: "#3333333",
                fontSize: "20px",
                lineHeight: "28px",
                marginBottom: "16px"
              }}>抱歉, 您访问的页面不存在</p>
              <Button type="primary"><Link to="/home">返回首页</Link></Button>
            </div>
          </div>
        </BasicLayout>
      </div>
    );
  }
}

export default NoMatch;