import { db, auth } from '../../firebase';
import { updateSchedule } from './schedules';
import { addLesson } from './lessons';
import firebase from 'firebase/app';

const lessonFromTemplate = (lesson) => async (dispatch) => {
  const batch = db.batch();

  const lessonRef = db.doc(`/users/${auth.currentUser.uid}/lessons/${lesson.id}`);
  batch.set(lessonRef, lesson);

  const schRef = db.doc(`/users/${auth.currentUser.uid}/schedules/${lesson.schedule}/`);
  batch.update(schRef, { lessons: firebase.firestore.FieldValue.arrayUnion(lesson.date) });
  try {
    await batch.commit();

    dispatch(addLesson(lesson));
    const schedule = await db
      .doc(`/users/${auth.currentUser.uid}/schedules/${lesson.schedule}/`)
      .get();
    dispatch(updateSchedule(schedule));
    return Promise.resolve('success');
  } catch (e) {
    console.error(e);
    return Promise.reject('reject');
  }
};

export default lessonFromTemplate;
