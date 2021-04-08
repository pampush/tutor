const initialState = {
  items: {},
  isLoaded: false,
};

const pupils = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PUPILS': {
      return {
        ...state,
        items: { ...state.items, ...action.payload },
        isLoaded: true,
      };
    }
    case 'SET_PUPILS_LOADED': {
      return {
        ...state,
        isLoaded: action.payload,
      };
    }
    default:
      return state;
  }
};

export default pupils;
