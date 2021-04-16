import { db } from '../../firebase';

export const postUser = ({ id, name, timestamp }) => async (dispatch) => {
  await db.doc(`/users/${id}`).set({ id, name, timestamp });
  dispatch(addUser({ id, name, timestamp }));
};

export const addUser = (data) => ({
  type: 'ADD_USER',
  payload: data,
});
