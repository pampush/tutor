import { db } from '../../firebase';
import { auth } from '../../firebase';

export const fetchPupils = () => async (dispatch) => {
  dispatch({ type: 'SET_PUPILS_LOADED', payload: false });

  const pupils = await retrievePupils();

  dispatch(setPupils(pupils));
};

async function retrievePupils() {
  let retrievedPupils = {};
  const pupilsSnapshot = await db.collection(`/users/${auth.currentUser.uid}/pupils/`).get();
  pupilsSnapshot.forEach(
    (pupilDoc) => (retrievedPupils = { ...retrievedPupils, [pupilDoc.id]: pupilDoc.data() }),
  );
  return retrievedPupils;
}

export const postPupil = ({ id, ...data }) => async (dispatch) => {
  dispatch({ type: 'SET_PUPILS_LOADED', payload: false });
  await db.doc(`/users/${auth.currentUser.uid}/pupils/${id}/`).set({ id, ...data });
  dispatch(addPupil({ id, ...data }));
};

export const setPupils = (items) => ({
  type: 'SET_PUPILS',
  payload: items,
});

export const addPupil = (data) => ({
  type: 'ADD_PUPIL',
  payload: data,
});
