const initialState = {
  name: '',
  id: '',
  timestamp: '',
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;

    default:
      return state;
  }
};

export default user;