const initialState = {
  selected: ' ',
};

const date = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export default date;
