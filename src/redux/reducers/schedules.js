const initialState = {
  items: {},
  isLoaded: false,
};

const schedules = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCHEDULES':
      return {
        ...state,
        items: { ...action.payload },
        isLoaded: true,
      };
    case 'SET_SCHEDULES_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      };
    case 'ADD_SCHEDULE': {
      let schedules = {};
      action.payload.forEach(
        (item) =>
          (schedules = {
            ...schedules,
            [item.id]: item,
          }),
      );
      return {
        ...state,
        items: { ...state.items, ...schedules },
        isLoaded: true,
      };
    }
    case 'UPDATE_LESSONS_FIELD': {
      let newLessons = [...state.items[action.payload.id].lessons];
      if (action.payload.procedure === 'push') newLessons.push(action.payload.date);
      if (action.payload.procedure === 'pop')
        newLessons = newLessons.filter((item) => item !== action.payload.date);
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            lessons: newLessons,
          },
        },
        isLoaded: true,
      };
    }
    default:
      return state;
  }
};

export default schedules;
