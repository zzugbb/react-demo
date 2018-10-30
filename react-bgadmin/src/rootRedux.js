import { combineReducers } from 'redux';
import {Login} from './pages/Login/Login.redux.js'; 

//多个reducer合并
const rootReducer = combineReducers({
  Login
})

export default rootReducer;