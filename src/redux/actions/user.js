import { db } from '../../firebase';

export const postUser = ({ id, name, timestamp, business }) => async (dispatch) => {
  await db.doc(`/users/${id}`).set({ id, name, timestamp, business });
};

export const fetchUser = (id) => async (dispatch) => {
  dispatch({ type: 'SET_USER_LOADED', payload: false });
  const user = await db.doc(`/users/${id}`).get();
  dispatch(addUser(user.data()));
};

export const addUser = (data) => ({
  type: 'SET_USER',
  payload: data,
});
