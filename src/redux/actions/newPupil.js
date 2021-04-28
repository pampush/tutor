import uniqid from 'uniqid';
import { postPupil } from './pupils';
import { postSchedule } from './schedules';

const formHandler = ({ ...data }) => async (dispatch) => {
  const pupilId = uniqid();

  let test = Object.entries(data).filter(([key, value]) => {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number') return value;
    return true;
  });

  test = Object.fromEntries(test);
  if (!test.parents.filter((parent) => parent.person || parent.contact).length) delete test.parents;
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
  // const pupil = {
  //   id: pupilId,
  //   name: data.name,
  //   address: data.address,
  //   grade: +data.grade,
  //   parents: data.parents
  //     .filter((parent) => parent.person || parent.contact)
  //     .map((parent) => ({ person: parent.person, contact: parent.contact })),
  //   schedulesId: schedules.map((schedule) => schedule.id),
  //   timestamp: Date.now(),
  // };
  const resPupil = {
    id: pupilId,
    timestamp: Date.now(),
    schedulesId: resSchedules.map((schedule) => schedule.id),
    ...pupil,
  };
  console.log(resPupil, resSchedules);
  await dispatch(postSchedule(resSchedules));
  await dispatch(postPupil(resPupil));
};

export default formHandler;
