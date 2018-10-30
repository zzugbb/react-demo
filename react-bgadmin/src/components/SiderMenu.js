import React from 'react';
import {Link } from 'react-router-dom';
import {Menu} from 'antd';

class SiderMenu extends React.PureComponent {

  constructor (props) {
    super(props);
    this.state = {
      data: [],
      openKeys: []
    };
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          "id": 1,
          "name": "测试1",
          "sonResources": [
            {
              "id": 2,
              "name": "首页",
              "url": "/ceshi1/home",
            },
          ]
        },
        {
          "id": 4,
          "name": "测试2",
          "sonResources": [
            {
              "id": 5,
              "name": "列表",
              "url": "/ceshi2/list",
            }
          ]
        }
      ]
    })  
  }
  

  handleOpenChange(openKeys) {
    const moreThanOne = openKeys.length > 1 ? true : false ;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
    
  }

  renderMenu(item) {
    if (item.sonResources.length <= 0) {
      return (
        <Menu.Item key={item.id}>
         <span>{item.name}</span>
        </Menu.Item>
      ) 
    } else {
      return (
        <Menu.SubMenu key={item.id} title={<span>{item.name}</span>}>
          {
            item.sonResources.map((subItem)=>
              <Menu.Item key={subItem.id}><Link to={subItem.url}>{subItem.name}</Link></Menu.Item>
            )
          }
        </Menu.SubMenu>
      ) 
    }
  }

  render() {
    return (
      <div>
        <Menu theme={this.props.theme} mode={this.props.mode} 
          openKeys={this.state.openKeys}
          onOpenChange= {this.handleOpenChange.bind(this)} 
        >
          { 
            this.state.data.length > 0 ? 
            this.state.data.map((item) => this.renderMenu(item)) : ""
          }
        </Menu>
      </div>
    );
  }
}


export default SiderMenu;
