import React from 'react';
import './UserLayout.css';

class UserLayout extends React.PureComponent {

  render() {
    const { children } = this.props;
    return (
      <div className="container">
        <div className="content">
          <div className="top">
            <div className="header">后台管理系统</div>
            <div className="desc">Backstage management system</div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default UserLayout;
