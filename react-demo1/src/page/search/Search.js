import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import './Search.css';
import {connect} from 'react-redux';
import { 
  mapDispatchToProps
} from './Search.redux.js';
import Mock from "mockjs";

//值映射
const mapStateToProps = (state) => {
  return {
    num: state.editNumInSearch.num
  }
}

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      check: false,
      questData: [],
      serchContent: ""
    };
  }

  //输入框值变化
  handleSerchContentChange(e) {
    this.setState({
      serchContent: e.target.value
    })
  }

  //输入框enter事件
  handleSerchContentEnter(e) {
    if (e.which === 13) {
      this.handleClickSearchButton();
    }
  }

  //触发搜索button点击事件,请求接口获取数据
  handleClickSearchButton() {
    const _this = this; //此处必须先得到this, 否则后面的setState不生效
    axios.get('/getquests', {  //此处mock拦截，返回模拟数据
    })
      .then(function (response) {
        //console.log(JSON.stringify(response.data, null, 2)); //第二个参数为序列化，第三个为缩进值
        response.data.resultList.forEach(item => { 
          item.check = false
        })
        _this.setState({
          questData: response.data.resultList
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //单个的选择
  handleQuestInputChange(e) {
    let questId = e.target.value;
    if(e.target.checked) { //选中
      this.props.addNum();
    } else { //取消选中
      this.props.deleteNum();
    }
    let questData = this.state.questData;
    questData.forEach(item => {
      if(item.id === questId) {
        item.check = item.check ? false: true
      }
    })
    this.setState({
      questData: questData
    })
  }

  //点击全选
  handleAllInputChange(e) {
    let questData = this.state.questData;
    if(e.target.checked) { //选中
      questData.forEach(item => {  
        if(!item.check) { //此时没选中的进行选择
          item.check = true;
          this.props.addNum();  //需要去重
        }
      })
    } else { //取消选中
      questData.forEach(item => {  
        if(item.check) {
          this.props.deleteNum();
          item.check = false;
        }
      })
    }
    this.setState({
      check: this.state.check ? false : true,
      questData: questData
    })
  }

  //触发清空
  handleClickEmpty() {
    this.props.emptyNum();
    let questData = this.state.questData;
    questData.forEach(item => { 
      item.check = false
    })
    this.setState({
      questData: questData
    })
  }

  render() {
    return (
      <div className="">
        <header className="navigation">
          <div className="commonWidth">
            <ul className="navigation-ul">
              <li>Num( <span className="quest-num">{this.props.num}</span> )</li>
              <li className="empty" onClick={this.handleClickEmpty.bind(this)}>清空</li>
              <li><Link to="/">主页</Link></li>
            </ul>
            <div className="clear"></div>
          </div>  
        </header>
        <div className="commonWidth">
          <div className="search-area">
            <input placeholder="请输入关键词" type="text" className="search-name"
              value={this.state.serchContent} 
              onChange={this.handleSerchContentChange.bind(this)}
              onKeyPress={this.handleSerchContentEnter.bind(this)}
            />
            <span className="search-button" onClick={this.handleClickSearchButton.bind(this)}>搜索</span>
          </div>
          <div className="all-input-area">
            <input type="checkbox" checked={this.state.check} onChange={this.handleAllInputChange.bind(this)} />
            <span>全选</span>
          </div>
          <div className="">
            { 
              this.state.questData.map(item => 
                <div key={item.id}>
                  <input type="checkbox" className="quest-input" 
                    checked = {item.check}
                    onChange = {this.handleQuestInputChange.bind(this)} 
                    value={item.id}
                  />
                  <span>{item.seq}.</span>
                  <div className="quest-area" dangerouslySetInnerHTML={{__html: item.content}}></div>
                  <div className="quest-from"> 
                    <span className="quest-from-name">来源:  </span>
                    <span>
                      <img src={item.resourceName} alt="来源图"/>
                      {item.resourceName}
                    </span>
                  </div> 
                </div> 
              )
            } 
          </div>    
        </div>  
      </div>
    );
  }
}

Mock.mock("/getquests", {
  'resultList|1-10': [
    {
      'id|+1': 1,
      'content': '@cparagraph',
      'seq|+1': 1,
      'resourceName': Mock.Random.image('200x20', '#4A7BF7', 'Hello')
    }
  ]
});

export const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search); 

