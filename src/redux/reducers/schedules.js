const initialState = {
  items: {},
  isLoaded: false,
};

const schedules = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCHEDULES':
      return {
        ...state,
        items: { ...state.items, ...action.payload },
        isLoaded: true,
      };
    case 'SET_SCHEDULES_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default schedules;
