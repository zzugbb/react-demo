//action types
const LOGIN_IN = 'LOGIN_IN'
const LOGIN_OUT = 'LOGIN_OUT'

const initState = {
  userInfo: {
  }
};

//reducer处理函数, 入参为`state`及`action`
export function Login(state = initState, action) {
  switch (action.type) {
    case LOGIN_IN : 
      return {
        userInfo: action.userInfo
      }
    case LOGIN_OUT: 
      return {
        userInfo: {
        }
      }
    default: 
      return state;  
  }
} 

//reducer 相关的 action creators
export const LoginIn = (userInfo) => {
  return { 
    type: LOGIN_IN, 
    userInfo
  }
} 

export function LoginOut() {
  return {
    type: LOGIN_OUT
  }
}