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

export const setSchedules = (items) => ({
  type: 'SET_SCHEDULES',
  payload: items,
});
