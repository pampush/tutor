import { db } from '../../firebase';

/**
 * middleware thunk function used for async data fetching and
 * dispatching actual event(action) to reducer
 * QUERY FORMAT: ['property', '==', 'value']
 * @param {date} date
 * @returns
 */
//TODO: integrate with auth
export const fetchLessons = (date) => async (dispatch) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - tzoffset).toISOString().slice(0, 10);
  
  dispatch({ type: 'SET_LESSONS_LOADED', payload: false });
  const user = await db.doc('/users/Uyv2wLqViEmqMjoWvjz3/').get();
  const timer = stopwatch(fastRetrieveLessons);
  const query = ['date', '==', `${localISOTime}`];
  const lessons = await timer(user, query);

  dispatch(setLessons(lessons));
};

export const postLessons = (lessons) => async (dispatch) => {
  dispatch({ type: 'SET_LESSONS_LOADED', payload: false });
  const user = await db.doc('/users/Uyv2wLqViEmqMjoWvjz3/').get();
  const schPromises = lessons.map((schedule) =>
    db.doc(`/users/${user.id}/schedules/${schedule.id}`).set({ ...schedule }),
  );
  await Promise.all(schPromises);
  dispatch(addLessons(lessons))
} 
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

/**
 * @param {object[]} items lessons array
 * @returns {object} - send action object to reducer
 */
export const setLessons = (items) => ({
  type: 'SET_LESSONS_BY_DATE',
  payload: items,
});

export const addLessons = (items) => ({
  type: 'ADD_LESSONS',
  payload: items,
})

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
