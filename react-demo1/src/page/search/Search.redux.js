//action types
const ADD_NUM_INSEARCH = 'ADD_NUM_INSEARCH';
const DELETE_NUM_INSEARCH = "DELETE_NUM_INSEARCH";
const EMPTY_NUM_INSEARCH = 'EMPTY_NUM_INSEARCH';

let num = 0;
const initState = {
  num: num
};

//reducer处理函数, 入参为`state`及`action`
export function editNumInSearch(state = initState, action) {
  switch (action.type) {
    case ADD_NUM_INSEARCH : 
      return {
        num: state.num + 1
      } 
    case DELETE_NUM_INSEARCH: 
      return {
        num: state.num - 1
      }  
    case EMPTY_NUM_INSEARCH: 
      return {
        num: 0
      }
    default: 
      return state;  
  }
} 

//reducer 相关的 action creators
export function addNum() {
  return {
    type: ADD_NUM_INSEARCH
  }
}

export function deleteNum() {
  return {
    type: DELETE_NUM_INSEARCH
  }
}

export function emptyNum() {
  return {
    type: EMPTY_NUM_INSEARCH
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addNum: () => {
      dispatch(addNum());
    },
    deleteNum: () => {
      dispatch(deleteNum());
    },
    emptyNum: () => {
      dispatch(emptyNum());
    }
  }  
}