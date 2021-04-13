const initialState = {
  items: {},
  isLoaded: false,
};

const scheduledLessons = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCHEDULED_LESSONS':
      return {
        ...state,
        items: { ...action.payload },
        isLoaded: true,
      };
    case 'SET_SCHEDULED_LESSONS_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default scheduledLessons;
