import { combineReducers } from 'redux';

import lessons from './lessons';
import pupils from './pupils';
import schedules from './schedules';
import scheduledLessons from './scheduledLessons';
import date from './date';
import user from './user';

const rootReducer = combineReducers({
  user,
  lessons,
  pupils,
  schedules,
  scheduledLessons,
  date,
});

export default rootReducer;
