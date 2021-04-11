import uniqid from 'uniqid';
import { getDaysInYear, addDays } from 'date-fns';
import { postPupil } from './pupils';
import { postSchedule } from './schedules';
import { postLessons } from './lessons';

const formHandler = ({ ...data }) => async (dispatch) => {
  const pupilId = uniqid();

  const schedules = data.schedules.map((schedule) => ({
    id: uniqid(),
    subject: schedule.subject,
    time: schedule.time,
    price: +schedule.price,
    day: schedule.day,
    year: new Date().getFullYear(),
    pupil: pupilId,
    timestamp: Date.now(),
  }));

  const pupil = {
    id: pupilId,
    name: data.name,
    address: data.address,
    grade: data.grade,
    parents: data.parents,
    contacts: data.contacts,
    schedulesId: schedules.map((schedule) => schedule.id),
    timestamp: Date.now(),
  };

  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - tzoffset);
  let targetDay = today.getDate() + 1;
  
  // while (targetDay !== schedule.day) {
  //   targetDay = addDays(targetDay, 1);
  // }
  const lessons = data.schedules.map((schedule) => new Array());

  dispatch(postPupil(pupil));
  dispatch(postSchedule(schedules));
  dispatch(postLessons(lessons));
};

export default formHandler;
