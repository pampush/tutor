import { db } from '../../firebase';
import { auth } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const fetchPupils = () => async (dispatch) => {
  try {
    dispatch({ type: 'SET_PUPILS_LOADED', payload: false });

    const pupils = await retrievePupils();

    dispatch(setPupils(pupils));
  } catch (e) {
    console.error(e);
    dispatch({ type: 'SET_PUPILS_LOADED', payload: true });
  }
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
  try {
    dispatch({ type: 'SET_PUPILS_LOADED', payload: false });
    await db.doc(`/users/${auth.currentUser.uid}/pupils/${id}/`).set({ id, ...data });
    dispatch(addPupil({ id, ...data }));
  } catch (e) {
    console.error(e);
    dispatch({ type: 'SET_PUPILS_LOADED', payload: false });
  }
};

export const pullScheduleFromPupil = (pupilId, scheduleId) => async (dispatch) => {
  try {
    await db
      .doc(`/users/${auth.currentUser.uid}/pupils/${pupilId}/`)
      .update({ schedulesId: firebase.firestore.FieldValue.arrayRemove(scheduleId) });
    const pupil = await db.doc(`/users/${auth.currentUser.uid}/pupils/${pupilId}/`).get();
    dispatch(updatePupil(pupil.data()));
  } catch (e) {
    console.error(e);
  }
};

export const pushScheduleToPupil = (pupilId, scheduleId) => async (dispatch) => {
  try {
    await db
      .doc(`/users/${auth.currentUser.uid}/pupils/${pupilId}/`)
      .update({ schedulesId: firebase.firestore.FieldValue.arrayUnion(scheduleId) });
    const pupil = await db.doc(`/users/${auth.currentUser.uid}/pupils/${pupilId}/`).get();
    dispatch(updatePupil(pupil.data()));
  } catch (e) {
    console.error(e);
  }
};

export const deletePupilAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'SET_PUPILS_LOADED', payload: false });
    await db.doc(`/users/${auth.currentUser.uid}/pupils/${id}/`).delete();
    dispatch(deletePupil(id));
  } catch (e) {
    console.error(e);
  }
};

export const setPupils = (items) => ({
  type: 'SET_PUPILS',
  payload: items,
});

export const addPupil = (data) => ({
  type: 'ADD_PUPIL',
  payload: data,
});

export const deletePupil = (id) => ({
  type: 'DELETE_PUPIL',
  payload: id,
});

export const updatePupil = (pupil) => ({
  type: 'UPDATE_PUPIL',
  payload: pupil,
});
