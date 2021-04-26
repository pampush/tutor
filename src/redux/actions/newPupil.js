import uniqid from 'uniqid';
import { postPupil } from './pupils';
import { postSchedule } from './schedules';

const formHandler = ({ ...data }) => async (dispatch) => {
  const pupilId = uniqid();
  const schedules = data.schedules.map(({ price = 0, ...schedule }) => {
    return {
      id: uniqid(),
      subject: schedule.subject,
      time: schedule.time,
      price: +price,
      day: +schedule.day,
      year: new Date().getFullYear(),
      pupil: pupilId,
      lessons: [],
      timestamp: Date.now(),
    };
  });
  const pupil = {
    id: pupilId,
    name: data.name,
    address: data.address,
    grade: +data.grade,
    parents: data.parents.map((parent) => ({
      person: parent.person,
      contact: parent.contact,
    })),
    schedulesId: schedules.map((schedule) => schedule.id),
    timestamp: Date.now(),
  };

  await dispatch(postSchedule(schedules));
  await dispatch(postPupil(pupil));
};

export default formHandler;
