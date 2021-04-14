import { db } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const fetchSchedules = () => async (dispatch) => {
  dispatch({ type: 'SET_SCHEDULES_LOADED', payload: false });

  const user = await db.doc('/users/Uyv2wLqViEmqMjoWvjz3/').get();
  const schedules = await retrieveSchedules(user);

  dispatch(setSchedules(schedules));
};

async function retrieveSchedules(user) {
  let schedules = {};
  const snapshot = await db.collection(`/users/${user.id}/schedules/`).get();
  snapshot.forEach((doc) => (schedules = { ...schedules, [doc.id]: doc.data() }));
  return schedules;
}

export const postSchedule = (schedules) => async (dispatch) => {
  dispatch({ type: 'SET_SCHEDULES_LOADED', payload: false });
  const user = await db.doc('/users/Uyv2wLqViEmqMjoWvjz3/').get();
  const schPromises = schedules.map((schedule) =>
    db.doc(`/users/${user.id}/schedules/${schedule.id}`).set({ ...schedule }),
  );
  await Promise.all(schPromises);
  dispatch(addSchedule(schedules));
};

export const addLessonToSchedule = ({ id, date }, { preventIsLoaded } = {}) => async (dispatch) => {
  if (!preventIsLoaded) dispatch({ type: 'SET_SCHEDULES_LOADED', payload: false });
  await db
    .doc(`/users/Uyv2wLqViEmqMjoWvjz3/schedules/${id}/`)
    .update({ lessons: firebase.firestore.FieldValue.arrayUnion(date) });

  dispatch(updateLessonsField({ procedure: 'push', id, date }));
};

export const deleteLessonFromSchedule = ({ date, id }) => async (dispatch) => {
  dispatch({ type: 'SET_SCHEDULES_LOADED', payload: false });
  await db
    .doc(`/users/Uyv2wLqViEmqMjoWvjz3/schedules/${id}/`)
    .update({ lessons: firebase.firestore.FieldValue.arrayRemove(date) });

  dispatch(updateLessonsField({ procedure: 'pop', date, id }));
};

export const setSchedules = (items) => ({
  type: 'SET_SCHEDULES',
  payload: items,
});

export const addSchedule = (data) => ({
  type: 'ADD_SCHEDULE',
  payload: data,
});

export const updateLessonsField = (data) => ({
  type: 'UPDATE_LESSONS_FIELD',
  payload: data,
});
