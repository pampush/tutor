import { db } from '../../firebase';
import { auth } from '../../firebase';
import { formatISO } from 'date-fns';
/**
 * middleware thunk function used for async data fetching and
 * dispatching actual event(action) to reducer
 * QUERY FORMAT: ['property', '==', 'value']
 * @param {date} date
 * @returns
 */
export const fetchLessons = (date) => async (dispatch) => {
  const ISODate = formatISO(date, { representation: 'date' });
  dispatch({ type: 'SET_LESSONS_LOADED', payload: false });
  const timer = stopwatch(fastRetrieveLessons);
  const query = ['date', '==', `${ISODate}`];
  try {
    const lessons = await timer(query);
    dispatch(setLessons(lessons));
  } catch (e) {
    console.error(e);
    dispatch({ type: 'SET_LESSONS_LOADED', payload: true });
  }
};

async function fastRetrieveLessons(query) {
  let retrievedLessons = {};
  const lessonsSnapshot = await db
    .collection(`/users/${auth.currentUser.uid}/lessons`)
    .where(...query)
    .orderBy('time')
    .get();
  lessonsSnapshot.forEach((lessonDoc) => {
    retrievedLessons = { ...retrievedLessons, [lessonDoc.id]: lessonDoc.data() };
  });
  return retrievedLessons;
}

export const postLesson = (lesson, { preventIsLoaded } = {}) => async (dispatch) => {
  try {
    if (!preventIsLoaded) dispatch({ type: 'SET_LESSONS_LOADED', payload: false });
    await db.doc(`/users/${auth.currentUser.uid}/lessons/${lesson.id}`).set(lesson);
    dispatch(addLesson(lesson));
  } catch (e) {
    console.error(e);
  }
};

/**
 * retrieve lessons using collectionGroup method
 * @param {object} user
 * @param {object[]} pupils
 * @param {array} query firestore query format array
 * @returns {object[]} lesson result array going to be stored in redux store
 */

export const deleteLesson = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'SET_LESSONS_LOADED', payload: false });
    await db.doc(`/users/${auth.currentUser.uid}/lessons/${id}`).delete();

    dispatch(deleteLessonAction(id));
  } catch (e) {
    console.error(e);
    dispatch({ type: 'SET_LESSONS_LOADED', payload: true });
  }
};

export const deleteLessonsBySmth = ({ field, id }) => async (dispatch) => {
  const lessonsPromises = [];
  try {
    const lessonsSnapshot = await db
      .collection(`/users/${auth.currentUser.uid}/lessons/`)
      .where(`${field}`, '==', id)
      .get();

    lessonsSnapshot.forEach((lessonsSnap) =>
      lessonsPromises.push(
        db.doc(`/users/${auth.currentUser.uid}/lessons/${lessonsSnap.data().id}`).delete(),
      ),
    );

    await Promise.all(lessonsPromises);
  } catch (e) {
    console.error(e);
  }
};

export const changeLesson = ({ id, field, value }) => async (dispatch) => {
  try {
    dispatch({ type: 'SET_LESSONS_LOADED', payload: false });
    await db.doc(`/users/${auth.currentUser.uid}/lessons/${id}`).update({ [field]: value });
    dispatch(updateLesson({ id, field, value }));
  } catch (e) {
    console.error(e);
    dispatch({ type: 'SET_LESSONS_LOADED', payload: true });
  }
};
/**
 * @param {object[]} items lessons array
 * @returns {object} - send action object to reducer
 */
export const setLessons = (items) => ({
  type: 'SET_LESSONS_BY_DATE',
  payload: items,
});

export const addLesson = (item) => ({
  type: 'ADD_LESSON',
  payload: item,
});

export const deleteLessonAction = (id) => ({
  type: 'DELETE_LESSON',
  payload: id,
});

export const updateLesson = ({ id, field, value }) => ({
  type: 'UPDATE_LESSON',
  payload: { id, field, value },
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
