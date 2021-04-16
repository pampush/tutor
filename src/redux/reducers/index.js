import { combineReducers } from 'redux';

import lessons from './lessons';
import pupils from './pupils';
import schedules from './schedules';
import scheduledLessons from './scheduledLessons';
import date from './date'
import users from './users'

const rootReducer = combineReducers({
  users,
  lessons,
  pupils,
  schedules,
  scheduledLessons,
  date,
});

export default rootReducer;
