import { db } from '../../firebase';

export const fetchSchedules = () => async (dispatch) => {
  dispatch({ type: 'SET_SCHEDULES_LOADED', payload: false });

  const user = await db.doc('/users/Uyv2wLqViEmqMjoWvjz3/').get();
  const schedules = await retrieveSchedules(user);

  dispatch(setSchedules(schedules));
};

async function retrieveSchedules(user) {
  let retrievedSchedules = {};
  const schedulesSnapshot = await db.collection(`/users/${user.id}/schedules/`).get();
  schedulesSnapshot.forEach(
    (scheduleDoc) =>
      (retrievedSchedules = { ...retrievedSchedules, [scheduleDoc.id]: scheduleDoc.data() }),
  );
  return retrievedSchedules;
}

export const postSchedule = (schedules) => async (dispatch) => {
  dispatch({ type: 'SET_SCHEDULES_LOADED', payload: false });
  const user = await db.doc('/users/Uyv2wLqViEmqMjoWvjz3/').get();
  const schPromises = schedules.map((schedule) =>
    db.doc(`/users/${user.id}/schedules/${schedule.id}`).set({ ...schedule }),
  );
  await Promise.all(schPromises);
  dispatch(addSchedule(schedules))
  //schedules.forEach((schedule) => dispatch(addSchedule(schedule)));
};

export const setSchedules = (items) => ({
  type: 'SET_SCHEDULES',
  payload: items,
});

export const addSchedule = (data) => ({
  type: 'ADD_SCHEDULE',
  payload: data,
});
