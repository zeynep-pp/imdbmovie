import { combineReducers } from 'redux';

// Reducer to handle year filter
const yearReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_YEAR':
      return action.payload;
    default:
      return state;
  }
};

// Combine reducers if you have more filters later
const rootReducer = combineReducers({
  year: yearReducer,
});

export default rootReducer;


