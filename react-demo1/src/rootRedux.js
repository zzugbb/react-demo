import { combineReducers } from 'redux';

import {editNum} from './page/home/Home.redux.js'; 
import {editNumInSearch} from './page/search/Search.redux.js'; 

const rootReducer = combineReducers({
  editNum,
  editNumInSearch
})

export default rootReducer;