import { db, auth } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const fetchSchedules = ({ preventIsLoaded } = {}) => async (dispatch) => {
  if (!preventIsLoaded) dispatch({ type: 'SET_SCHEDULES_LOADED', payload: false });

  const schedules = await retrieveSchedules();

  dispatch(setSchedules(schedules));
};

async function retrieveSchedules() {
  let schedules = {};
  const snapshot = await db.collection(`/users/${auth.currentUser.uid}/schedules/`).get();
  snapshot.forEach((doc) => (schedules = { ...schedules, [doc.id]: doc.data() }));
  return schedules;
}

export const postSchedule = (schedules) => async (dispatch) => {
  dispatch({ type: 'SET_SCHEDULES_LOADED', payload: false });

  try {
    const schPromises = schedules.map((schedule) =>
      db.doc(`/users/${auth.currentUser.uid}/schedules/${schedule.id}`).set({ ...schedule }),
    );
    await Promise.all(schPromises);
    schedules.forEach((schedule) => dispatch(addSchedule(schedule)));
  } catch (e) {
    console.log(e);
    dispatch({ type: 'SET_SCHEDULES_LOADED', payload: true });
  }
};

export const addLessonToSchedule = ({ id, date }, { preventIsLoaded } = {}) => async (dispatch) => {
  if (!preventIsLoaded) dispatch({ type: 'SET_SCHEDULES_LOADED', payload: false });
  await db
    .doc(`/users/${auth.currentUser.uid}/schedules/${id}/`)
    .update({ lessons: firebase.firestore.FieldValue.arrayUnion(date) });

  const schedule = await db.doc(`/users/${auth.currentUser.uid}/schedules/${id}/`).get();
  dispatch(updateSchedule(schedule.data()));
};

export const deleteLessonFromSchedule = ({ date, id }) => async (dispatch) => {
  dispatch({ type: 'SET_SCHEDULES_LOADED', payload: false });
  await db
    .doc(`/users/${auth.currentUser.uid}/schedules/${id}/`)
    .update({ lessons: firebase.firestore.FieldValue.arrayRemove(date) });

  const schedule = await db.doc(`/users/${auth.currentUser.uid}/schedules/${id}/`).get();
  dispatch(updateSchedule(schedule.data()));
};

export const deleteSchedulesByPupil = (id) => async (dispatch) => {
  const schedulesPromises = [];
  const schedulesSnapshot = await db
    .collection(`/users/${auth.currentUser.uid}/schedules/`)
    .where('pupil', '==', id)
    .get();

  schedulesSnapshot.forEach((schedulesSnap) =>
    schedulesPromises.push(
      db.doc(`/users/${auth.currentUser.uid}/schedules/${schedulesSnap.data().id}`).delete(),
    ),
  );

  await Promise.all(schedulesPromises);
};

export const deleteScheduleAction = (id) => async (dispatch) => {
  try {
    await db.doc(`/users/${auth.currentUser.uid}/schedules/${id}`).delete();
  } catch (e) {
    console.error(e);
    dispatch({ type: 'SET_SCHEDULES_LOADED', payload: true });
  }
};

export const updateScheduleAction = (id, data) => async (dispatch) => {
  try {
    console.log(id, data);
    await db.doc(`/users/${auth.currentUser.uid}/schedules/${id}/`).update(data);

    const schedule = await db.doc(`/users/${auth.currentUser.uid}/schedules/${id}/`).get();

    dispatch(updateSchedule(schedule));
  } catch (e) {
    console.error(e);
    dispatch({ type: 'SET_SCHEDULES_LOADED', payload: true });
  }
};

export const setSchedules = (items) => ({
  type: 'SET_SCHEDULES',
  payload: items,
});

export const addSchedule = (data) => ({
  type: 'ADD_SCHEDULE',
  payload: data,
});

export const updateSchedule = (schedule) => ({
  type: 'UPDATE_SCHEDULE',
  payload: schedule,
});

export const deleteSchedule = (id) => ({
  type: 'DELETE_SCHEDULE',
  payload: id,
});
