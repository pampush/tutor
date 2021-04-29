const initialState = {
  items: {},
  isLoaded: false,
};

const lessons = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LESSONS_BY_DATE':
      return {
        ...state,
        items: { ...action.payload },
        isLoaded: true,
      };
    case 'SET_LESSONS_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      };
    case 'ADD_LESSON': {
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload },
        isLoaded: true,
      };
    }
    case 'UPDATE_LESSON': {
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload },
        isLoaded: true,
      };
    }

    case 'DELETE_LESSON': {
      const newState = { ...state.items };
      delete newState[action.payload];
      return {
        ...state,
        items: newState,
        isLoaded: true,
      };
    }
    default:
      return state;
  }
};

export default lessons;
