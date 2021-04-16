const initialState = {
  items: {},
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        [action.payload.id]: action.payload, 
      };

    default:
      return state;
  }
};

export default users;
