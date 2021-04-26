const initialState = {
  name: '',
  id: '',
  timestamp: '',
  email: '',
  business: false,
  isLoaded: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      };
    case 'SET_USER':
      return { ...action.payload, isLoaded: true };
    default:
      return state;
  }
};

export default user;
