const initialState = {
    year: '',
  };
  
  const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_YEAR':
        return {
          ...state,
          year: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default movieReducer;
  