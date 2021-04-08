import { db } from '../../firebase';

export const fetchPupils = (date) => async (dispatch) => {
  dispatch({ type: 'SET_PUPILS_LOADED', payload: false });

  const user = await db.doc('/users/Uyv2wLqViEmqMjoWvjz3/').get();
  const pupils = await retrievePupils(user);

  dispatch(setPupils(pupils));
};

async function retrievePupils(user) {
  let retrievedPupils = {};
  const pupilsSnapshot = await db.collection(`/users/${user.id}/pupils/`).get();
  pupilsSnapshot.forEach(
    (pupilDoc) => (retrievedPupils = { ...retrievedPupils, [pupilDoc.id]: pupilDoc.data() }),
  );
  return retrievedPupils;
}

export const setPupils = (items) => ({
  type: 'SET_PUPILS',
  payload: items,
});
