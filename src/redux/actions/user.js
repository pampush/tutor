import { db } from '../../firebase';

export const postUser = ({ id, name, timestamp, email }) => async (dispatch) => {
  await db.doc(`/users/${id}`).set({ id, name, timestamp, email });
  //dispatch(addUser({ id, name, timestamp }));
};

export const fetchUser = (id) => async (dispatch) => {
  const user = await db.doc(`/users/${id}`).get();
  dispatch(addUser(user.data()));
};

export const addUser = (data) => ({
  type: 'SET_USER',
  payload: data,
});
