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

    default:
      return state;
  }
};

export default lessons;
