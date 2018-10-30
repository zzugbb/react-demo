import React, { Component } from 'react';
import { Button } from 'antd';
import {Link } from 'react-router-dom';
import Img500 from '../../assets/500.svg';

class Exception500 extends Component {

  render() {
    return (
      <div>
        <div style={{display:"flex", marginTop: "180px"}}>
          <img style= {{flex: "3"}} src={Img500} alt="500"/>
          <div style={{flex:"2"}}>
            <h1 style={{
              fontSize: "72px",
              lineHeight: "72px",
              fontWeight: "600",
              color: "#434e59",
              marginBottom: "24px"
            }}>500</h1>
            <p style= {{
              color: "#3333333",
              fontSize: "20px",
              lineHeight: "28px",
              marginBottom: "16px"
            }}>抱歉，服务器出错了</p>
            <Button type="primary"><Link to="/home">返回首页</Link></Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Exception500;