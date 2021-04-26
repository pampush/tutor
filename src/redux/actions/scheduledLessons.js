import { db } from '../../firebase';
import { auth } from '../../firebase';
import { getISODay, formatISO } from 'date-fns';

async function retrieveSchedulesByDay(date) {
  let schedules = {};
  const today = getISODay(date);
  //const localISODate = date.toISOString().slice(0, 10);
  const localISODate = formatISO(date, { representation: 'date' });

  const snapshot = await db
    .collection(`/users/${auth.currentUser.uid}/schedules/`)
    .where('day', '==', today)
    .get();

  snapshot.forEach((doc) => {
    if (!doc.data().lessons.includes(localISODate))
      schedules = { ...schedules, [doc.id]: doc.data() };
  });
  return schedules;
}

export const fetchScheduledLessons = (date, { preventIsLoaded } = {}) => async (dispatch) => {
  try {
    if (!preventIsLoaded) dispatch({ type: 'SET_SCHEDULED_LESSONS_LOADED', payload: false });
    const schedules = await retrieveSchedulesByDay(date);

    dispatch(setScheduledLessons(schedules));
  } catch (e) {
    console.error(e);
    dispatch({ type: 'SET_SCHEDULED_LESSONS_LOADED', payload: false });
  }
};

export const setScheduledLessons = (items) => ({
  type: 'SET_SCHEDULED_LESSONS',
  payload: items,
});

export const setScheduledLessonsLoaded = (value) => ({
  type: 'SET_SCHEDULED_LESSONS_LOADED',
  payload: value,
});
