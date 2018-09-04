import React, {Component} from 'react';
import './Game.css';

var direction = {"down": 1, "up": 2, "left": 3, "right": 4};
var red = <div className="red"></div>;
var black = <div className="black"></div>;

class Game extends Component {

  constructor(props) {
    super(props);
    var snake = [{ "x": 1, "y": 1}];
    var next_red = { "x": 1, "y": 3 };
    this.state = { 
      "score": 0,
      "snake": snake,
      "red_node_position": next_red,
      "direction": direction.right, 
      "size": {"col":15, "row":20},
      "i": "",
      "is_runing": true
    };
  }

  componentDidMount(){
    document.onkeydown = function(e) {
      this._pause();
      var keyNum = window.event ? e.keyCode : e.which;
      if(keyNum === 87) {
        this._move(direction.up);
        this.setState({"direction": direction.up});
      } else if (keyNum === 83) {
        this._move(direction.down);
        this.setState({"direction":direction.down});
      } else if (keyNum === 65) {
        this._move(direction.left);
        this.setState({"direction":direction.left});
      } else if (keyNum === 68) {
        this._move(direction.right);
        this.setState({"direction":direction.right});
      }
      this._start();
    }.bind(this);
    this._start();
  }

  handleClickInit() {
    var snake = [{ "x": 1, "y": 1}];
    var next_red = { "x": 1, "y": 3};
    var init_state = { 
      "score": 0,
      "snake": snake,
      "red_node_position": next_red,
      "direction": direction.right,
      "size": {"col": 15, "row": 20}
    };
    this.setState(init_state); 
  }

  _pause() {
    var i = this.state.i;
    window.clearInterval(i);
    this.setState({"is_runing": false});
  }
  
  _start() {
    var i = setInterval(function() {
      this._move(this.state.direction);
    }.bind(this), 600);
    this.setState({"i": i, "is_runing":true});
  }



  render() {
    var trs = this._refresh();
    var pause_start_btn = <button onClick={this._pause.bind(this)}>暂停</button>;
    if(!this.state.is_runing){
      pause_start_btn =<button onClick={this._start.bind(this)}>开始</button>;
    }

    return (
      <div className="game">
        <div className="game-name">贪吃蛇</div>
        <div className="game-menu">
          <a href=" ">游戏</a>
          <a href=" ">帮助</a>
        </div>
        <div className="game-div">
          <div className="game-background">
            <table border="1">
              <tbody className="t-body">
               {trs}
              </tbody>   
            </table>
          </div>
          <div className="game-info"> 
            <h4>得分: {this.state.score}</h4>
            <h4>控制 W:上 S:下 A:左 D:右</h4> 
            {pause_start_btn} 
            <button onClick={this.handleClickInit.bind(this)} className="restart">重新开始</button>
          </div>    
        </div>
      </div>
    )
  }

  /**
   * 贪吃蛇移动逻辑 
   * 1.贪吃蛇的第一个元素上下左右移动一位
   * 2.后面的元素依次占据它前面元素的位置
   * 3.如果碰到了随机生成的点(吃到了)，则在移动之后再在末尾加一个元素。
   * 棋盘从左到右逐步增大，为y.从上到下逐步增大，为x。
   */
  _move(d) {
    var snake = this.state.snake;
    var first = {"x": snake[0].x, "y": snake[0].y}; //贪吃蛇第一个元素
    var get_red = false; //吃到标志
    var last_node = {};

    if(d === direction.right) { //向右走
      first.y += 1;
    } else if(d === direction.left) { //向左走
      first.y -= 1;
    } else if(d === direction.down) { //向下走
      first.x += 1;
    } else if (d === direction.up) { //向上走
      first.x -= 1;
    }

    if(snake.length > 1 && first.x === snake[1].x && first.y === snake[1].y) { //前进方向不能逆行
      return ;
    }

    if(first.x === this.state.red_node_position.x && first.y === this.state.red_node_position.y) { //吃到红点
      get_red = true; //吃到标志
      this.setState( {"score": this.state.score + 1 }) //得分增加
      var last_node_index = snake.length-1; //原来蛇的最后一个点在数组中位置
      //last_node为最后一个节点的位置
      last_node.x = snake[last_node_index].x;
      last_node.y = snake[last_node_index].y; 
    }

    for(var s in snake) { //后面元素逐步前移
      var next_first = {"x": snake[s].x, "y": snake[s].y}; //先保存下节点，后续此节点会被赋值前移
      snake[s].x = first.x;
      snake[s].y = first.y;
      first = next_first; //逐步替代
    }

    if(get_red) { //追加一个元素，对snake追加一个元素，原来的(0----i-1)，第i个位置点就是原来的last_node
      get_red = false;
      var i = snake.length;
      snake[i] = {"x": last_node.x, "y": last_node.y};
      this._next_red();
    }
    this.setState(snake);
    this._game_over_check();
  }

  /**
   * 游戏结束监测
   * 1.超出边界
   * 2.和自己冲突
   */
  _game_over_check() {
    if (this.state.snake[0].x >= this.state.size.col || this.state.snake[0].x < 0 || this.state.snake[0].y < 0 || this.state.snake[0].y >= this.state.size.row){
      this.handleClickInit();
    }
    for(var s = 1; s < this.state.snake.length && this.state.snake.length > 1; s++) { //snake[0]为最新的格
      if(this.state.snake[s].x === this.state.snake[0].x && this.state.snake[s].y === this.state.snake[0].y) {
        this.handleClickInit();
      }
    }
  }

  /**
   * 生成下一个红点
   */
  _next_red() {
    var nodes = [];
    for(let c = 0; c < this.state.size.col; c++) {
      for(let r = 0; r < this.state.size.row; r++) {
        if(this._get_status(c, r) === 0) {
          var n = {"x": c, "y": r};
          nodes.push(n);
        }
      }
    }
    //从所有满足条件的点中随机选一个
    var next_index = Math.round(Math.random()*nodes.length-1);
    this.setState({"red_node_position":nodes[next_index]})
 }

  /**
   * 校验
   * @param {*列} c 
   * @param {*行} r 
   */
  _get_status(c, r) {
    for(var s in this.state.snake) {
      if(this.state.snake[s].x === c && this.state.snake[s].y === r) { //与蛇冲突
        return 1;
      }
    }
    if(this.state.red_node_position.x === c && this.state.red_node_position.y === r) { //与当前食物冲突
      return 2;
    }
    return 0;
  }

  /**
   * 刷新界面
   */
  _refresh(){
    var background = [];
     //页面背景二维数组，数组值为0 ，1 ，2 ， 空白，蛇，红点
    for(let c = 0 ; c < this.state.size.col ; c++) {
      background[c] = [];
      for(let r = 0 ; r < this.state.size.row ; r++) {
        background[c][r] = this._get_status(c, r);
      }
    }
    //map()方法返回一个新数组，数组中的元素为原始数组元素调用函数处理的后值。 
    //arr.map(function(currentValue，index，arr),thisValue)   
    //value 必须当前元素值, index 可选当前元素的索引值, arr可选当前元素属于的数组对象。 
    return background.map(function(value, index, array) {
      var tds = value.map(function(v, i, a){
        if(v === 0) {
          return <td key={i}></td>
        } else if(v === 1) {
          return <td key={i}>{black}</td>
        } else if (v === 2) {
          return <td key={i}>{red}</td>
        }
      });
      return <tr key={index}>{tds}</tr>;
    });  
  }
}


export default Game;