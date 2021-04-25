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
    case 'ADD_PUPIL': {
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload },
        isLoaded: true,
      };
    }
    case 'DELETE_PUPIL': {
      const newState = { ...state.items };
      delete newState[action.payload];
      return {
        ...state,
        items: newState,
        isLoaded: true,
      };
    }
    case 'UPDATE_PUPIL': {
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload },
        isLoaded: true
      };
    }
    default:
      return state;
  }
};

export default pupils;
