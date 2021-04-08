import { db } from '../../firebase';
import getISODay from 'date-fns/getISODay';

/**
 * middleware thunk function used for async data fetching and
 * dispatching actual event(action) to reducer
 * QUERY FORMAT: ['property', '==', 'value']
 * @param {date} date
 * @returns
 */
//TODO: integrate with auth
//TODO: - getTimezoneOffset()/60
export const fetchLessons = (date) => async (dispatch) => {
  dispatch({ type: 'SET_LESSONS_LOADED', payload: false });
  const user = await db.doc('/users/Uyv2wLqViEmqMjoWvjz3/').get();
  const timer = stopwatch(fastRetrieveLessons);
  console.log(date);
  const query = ['date', '==', `${date.toISOString().slice(0, 10)}`];
  const lessons = await timer(user, query);

  dispatch(setLessons(lessons));
};

/**
 * retrieve lessons using collectionGroup method
 * @param {object} user
 * @param {object[]} pupils
 * @param {array} query firestore query format array
 * @returns {object[]} lesson result array going to be stored in redux store
 */
async function fastRetrieveLessons(user, query) {
  let retrievedLessons = {};
  const lessonsSnapshot = await db
    .collection(`/users/${user.id}/lessons`)
    .where(...query)
    .get();
  lessonsSnapshot.forEach(
    (lessonDoc) => (retrievedLessons = { ...retrievedLessons, [lessonDoc.id]: lessonDoc.data() }),
  );
  return retrievedLessons;
}

async function retrieveSchedules(user, query) {
  let retrievedSchedules = {};
  const schedulesSnapshot = await db
    .collection(`/users/${user.id}/schedules/`)
    .where(...query)
    .get();
  schedulesSnapshot.forEach(
    (scheduleDoc) =>
      (retrievedSchedules = { ...retrievedSchedules, [scheduleDoc.id]: scheduleDoc.data() }),
  );
  return retrievedSchedules;
}
/**
 * retrieve lesson. At first we retrieve specific schedule collections of every pupil,
 * after that we create schedule object with keys corresponding with promises order.
 * [first schedule collection promise] - 0
 * [second schedule collection promise] - 1
 * @async
 * @function retrievedLessons
 * @param {object} user
 * @param {object[]} pupils
 * @returns {object[]} lesson result array going to be stored in redux store
 */
async function retrieveLessons(user, pupils) {
  let lessonPromises = [];
  let schedule = {};
  let retrievedLessons = {};
  const schPromises = pupils.map((pupil) =>
    db.collection(`/users/${user.id}/pupils/${pupil.id}/schedule/`).get(),
  );
  let scheduleSnaps = await Promise.all(schPromises);

  for (let i = 0; i < pupils.length; i++) {
    if (!schedule[i]) schedule[i] = [];

    scheduleSnaps[i].forEach((scheduleDoc) => {
      schedule[i].push(scheduleDoc.data());
    });
  }

  for (let i = 0; i < pupils.length; i++) {
    lessonPromises = [
      ...lessonPromises,
      ...schedule[i].map((schedule) =>
        db
          .collection(`/users/${user.id}/pupils/${pupils[i].id}/schedule/${schedule.id}/lessons`)
          .where('date', '==', '2021-04-19')
          .get(),
      ),
    ];
  }

  const lessons = await Promise.all(lessonPromises);

  lessons.forEach((lesson) => {
    lesson.forEach(
      (lesDoc) => (retrievedLessons = { ...retrievedLessons, [lesDoc.id]: lesDoc.data() }),
    );
  });
  console.log(retrievedLessons);
  return retrievedLessons;
}

/**
 * @param {object[]} items lessons array
 * @returns {object} - send action object to reducer
 */
export const setLessons = (items) => ({
  type: 'SET_LESSONS_BY_DATE',
  payload: items,
});

/**
 * util func for performance measuring needs
 * @param {*} fn
 * @returns
 */
function stopwatch(fn) {
  return async (...args) => {
    const before = performance.now();
    const result = await fn.apply(this, args);
    const after = performance.now();
    console.log(`finished: ${after - before}`);
    return result;
  };
}
