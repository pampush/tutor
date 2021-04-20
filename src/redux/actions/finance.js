import { db } from '../../firebase';
import { auth } from '../../firebase';

export const fetchPrices = async (date) => {
  const prices = {};
  const lessonsPromises = [];
  const pupilsSnapshot = await db.collection(`/users/${auth.currentUser.uid}/pupils`).get();

  pupilsSnapshot.forEach((pupil) => {
    prices[pupil.data().id] = { sum: 0, name: pupil.data().name };
    lessonsPromises.push(
      db
        .collection(`/users/${auth.currentUser.uid}/lessons`)
        .where('pupil', '==', pupil.data().id)
        .where('date', '>=', date + '-00')
        .where('date', '<=', date + '31')
        .get(),
    );
  });

  const lessonsByPupil = await Promise.all(lessonsPromises);
  lessonsByPupil.forEach((lessonsSnapshot) =>
    lessonsSnapshot.forEach((lessonsSnap) => {
      prices[lessonsSnap.data().pupil].sum =
        prices[lessonsSnap.data().pupil].sum + lessonsSnap.data().price;
    }),
  );

  return prices;
  //lessonsSnapshot.forEach(lesson => )
};
