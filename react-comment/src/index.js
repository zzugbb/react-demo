import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
//import IndexHigh from './IndexHigh';
import registerServiceWorker from './registerServiceWorker';


class CommentApp extends Component {

  constructor() {
    super()
    this.state = {
      comments: []
    }
  }

  componentWillMount() {
    let comments = localStorage.getItem('comments');
    if (comments) {
      this.setState({
        comments: JSON.parse(comments)
      })
    }
  }

  _saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  handleSubmitComment(comment) {
    if (!comment) return
    if (!comment.userName) return alert('请输入用户名')
    if (!comment.userContent) return alert('请输入评论内容')
    this.state.comments.push(comment)
    this._saveComments(this.state.comments)
    this.setState({
      comments: this.state.comments
    })
  }

  handleDeleteComment(index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
  }

  render() {
    return (
      <div>
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)}/>
      </div> 
    )
  }
}

class CommentInput extends Component {

  //参数校验，传入的onSubmit必须为函数
  static propTypes = { 
    onSubmit: PropTypes.func
  }

  //构造
  constructor() {
    super()
    this.state = {
      userName: "",
      userContent: "",
    }
  }

  //组件渲染前从localStroge获取赋值
  componentWillMount() {
    this.setState({
      userName: localStorage.getItem('userName')
    })
  }

  //组件渲染完毕的状态，评论框自动聚焦
  componentDidMount() {
    this.textarea.focus();
  }

  //用户名实时更新
  handleUserNameChange(e) {
    this.setState({
      userName: e.target.value
    })
  };

  //保存名字的私有方法，注意私有方法一般可以以“_”开头
  _saveUsername(userName) {
    localStorage.setItem('userName', userName)
  }

  handleUserNameBlur(e) {
    this._saveUsername(e.target.value)
  }

  //内容实时更新
  handleContentChange(e) {
    this.setState({
      userContent: e.target.value
    })
  };

  //点击提交, +是转为number类型
  clickButton() { 
    if(this.props.onSubmit) {
      this.props.onSubmit({
        userName: this.state.userName,
        userContent: this.state.userContent,
        createdTime: +new Date() 
      })
    }
    this.setState({
      userContent: ''
    })
  }

  render() {
    return (
      <div className="commentInput">
        <div className="name">
          <span>用户名:</span>
          <input type="text" 
            value={this.state.userName} 
            onChange={this.handleUserNameChange.bind(this)}
            onBlur= {this.handleUserNameBlur.bind(this)}
            />
          <div style={{clear:"both"}}></div>
        </div>
        <div className="content">
          <span>评论内容:</span>
          <textarea value={this.state.userContent} ref={(textarea) => this.textarea = textarea} 
            onChange={this.handleContentChange.bind(this)} />
          <div style={{clear:"both"}}></div>
        </div>
        <div className="submit-button" onClick={this.clickButton.bind(this)}>发布</div>
        <div style={{ clear: "both" }}></div>    
      </div> 
    )
  }
}

class CommentList extends Component {

  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }

  static defaultProps = {
    comments: []
  }

  handleDeleteComment(index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render() {
    return (
      <div className="commentList">
        {
          this.props.comments.map((comment, i) => 
            <Comment comment={comment} key={i} index={i} onDeleteComment={this.handleDeleteComment.bind(this)}/>
          )
        }
      </div> 
    )
  }
}

class Comment extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }

  constructor() {
    super()
    this.state = {
      timeSting: ''
    }
  }

  componentWillMount() {
    this._updateTimeString()
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    )
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  _updateTimeString() {
    const comment = this.props.comment
    const duration = (+Date.now() - comment.createdTime) / 1000
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} 分钟前`
        : `${Math.round(Math.max(duration, 1))} 秒前`
    })
  }

  handleDeleteComment() {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }

  _getProcessedContent(content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }

  render() {
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{this.props.comment.userName}</span>:
        </div>
        <p dangerouslySetInnerHTML={{ __html: this._getProcessedContent(this.props.comment.userContent)}}></p>
        <div style={{ clear: "both" }}></div>
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <div style={{ clear: "both" }}></div>
        <span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}> 
          删除
        </span>
      </div>
    )
  }
}



















// class LikeButton extends Component {

//   static defaultProps = {
//     likedText: '取消',
//     unlikedText: '点赞'
//   }

//   constructor() {
//     super()
//     this.state = {isLiked: false}
//   }

//   clickButton() {
//     this.setState({
//       isLiked: !this.state.isLiked
//     })
//   }

//   render() {
//     return (
//       <button onClick={this.clickButton.bind(this)}>
//         {this.state.isLiked ? this.props.likedText : this.props.unlikedText} 👍
//       </button>
//     )
//   }
// }




// class Title extends Component {
//   handleClickOnTitle(word, e) {
//     console.log('Click on title.');
//     console.log(e.target.innerHTML);
//     console.log(this, word);
//   }

//   render() {
//     return (
//       <h1 onClick={this.handleClickOnTitle.bind(this,'hello')}>React 小书</h1>
//     )
//   }
// }

// class Header extends Component {
//   render() {
//     return (
//       <div>
//         <Title />
//         <h2>This is Header</h2>
//       </div>
//     )
//   }
// }

// class Main extends Component {
//   render() {
//     return (
//       <div>
//         <h2>This is main content</h2>
//       </div>
//     )
//   }
// }

// class Footer extends Component {
//   render() {
//     return (
//       <div>
//         <h2>This is footer</h2>
//       </div>
//     )
//   }
// }

// const users = [
//   { username: 'Jerry', age: 21, gender: 'male' },
//   { username: 'Tomy', age: 22, gender: 'male' },
//   { username: 'Lily', age: 19, gender: 'female' },
//   { username: 'Lucy', age: 20, gender: 'female' }
// ]

// class Index extends Component {
//   render() {
//     return (
//       <div>
//         {
//           users.map((user)=> {
//             return (
//               <div key={user.username}>
//                 <div>姓名: {user.username}</div>
//                 <div>年龄: {user.age}</div>
//                 <div>性别: {user.gender}</div>
//                 <hr/>
//               </div>  
//             )
//           })

//         }
//       </div>
//     )
//   }
// }



ReactDOM.render(<CommentApp />, document.getElementById('root'))

registerServiceWorker();
