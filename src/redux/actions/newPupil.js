import uniqid from "uniqid";
import { addPupil } from "./pupils";
import { addSchedule } from "./schedules";
import { db, auth } from "../../firebase";
import genHomeworkLink from "../../components/addPupilForm/bitlyAPI";

const formHandler =
  ({ ...data }) =>
  async (dispatch) => {
    const pupilId = uniqid();

    let test = Object.entries(data).filter(([key, value]) => {
      if (typeof value === "string") return value.trim();
      if (typeof value === "number") return value;
      return true;
    });

    test = Object.fromEntries(test);
    test.parents = test.parents
      .filter((parent) => parent.person || parent.contact)
      .map((parent) => ({ person: parent.person, contact: parent.contact }));

    if (!test.parents.length) delete test.parents;
    const { schedules, ...pupil } = test;

    let resSchedules = schedules.map(({ price = 0, ...schedule }) => ({
      id: uniqid(),
      subject: schedule.subject,
      time: schedule.time,
      price: +price,
      day: +schedule.day,
      pupil: pupilId,
      lessons: [],
      timestamp: Date.now(),
    }));

    const homeworkLink = await genHomeworkLink(auth.currentUser.uid, pupilId);
    console.log(homeworkLink);
    const resPupil = {
      id: pupilId,
      timestamp: Date.now(),
      schedulesId: resSchedules.map((schedule) => schedule.id),
      homeworkLink,
      ...pupil,
    };

    const batch = db.batch();

    resSchedules.forEach((schedule) => {
      const schRef = db.doc(
        `/users/${auth.currentUser.uid}/schedules/${schedule.id}`
      );
      batch.set(schRef, { ...schedule });
    });

    const pupilRef = db.doc(
      `/users/${auth.currentUser.uid}/pupils/${resPupil.id}/`
    );
    batch.set(pupilRef, { ...resPupil });

    try {
      await batch.commit();
      resSchedules.forEach((schedule) => dispatch(addSchedule(schedule)));
      dispatch(addPupil(resPupil));
      return Promise.resolve(pupilId);
    } catch (e) {
      console.error(e);
      return Promise.reject("error");
    }
  };

export default formHandler;
