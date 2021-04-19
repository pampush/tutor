import { combineReducers } from 'redux';

import lessons from './lessons';
import pupils from './pupils';
import schedules from './schedules';
import scheduledLessons from './scheduledLessons';
import date from './date';
import user from './user';

const appReducer = combineReducers({
  user,
  lessons,
  pupils,
  schedules,
  scheduledLessons,
  date,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_SIGNOUT') state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
