import axios from 'axios';
import jsonp from 'jsonp';

//action types
const ADD_NUM = 'ADD_NUM'
const DELETE_NUM = 'DELETE_NUM'

let num = 0;
const initState = {
  num: num
};

//reducer处理函数, 入参为`state`及`action`
export function editNum(state = initState, action) {
  switch (action.type) {
    case ADD_NUM : 
      return {
        num: state.num + 1
      }
    case DELETE_NUM: 
      return {
        num: state.num - 1
      }
    default: 
      return state;  
  }
} 

//reducer 相关的 action creators
export function addNum() {
  return {
    type: ADD_NUM
  }
}

export function deleteNum() {
  return {
    type: DELETE_NUM
  }
}

//mapDispatchToProps负责定义发送action的函数映射到展示组件的this.props
//将（action）映射到props, 后续调用时，实际是调用 store.dispatch(),修改状态
export const mapDispatchToProps = (dispatch) => {
  return {
    addNum: () => {
      dispatch(addNum());
    },
    deleteNum: () => {
      dispatch(deleteNum());
    },
    addNumAsync: () => {
      console.log("两秒前时间   " + new Date());
      setTimeout( () => {
        console.log("两秒后时间  " + new Date());
        dispatch(addNum());
      }, 2000)
    },
    deleteNumByApi: () => { //axios访问会报跨域，可以走代理，在package.json中配置
      axios.get('', {
        params: {
          content : ""
        }
      })
        .then(function(response) {
          console.log(response.data);
          dispatch(deleteNum());
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addNumByApi: () => { //jsonp解决跨域
      jsonp('', null, (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(data);
          dispatch(addNum());
        }
      });
    }
  }
}