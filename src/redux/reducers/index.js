import { combineReducers } from 'redux';

import lessons from './lessons';
import pupils from './pupils';
import schedules from './schedules';

const rootReducer = combineReducers({
  lessons,
  pupils,
  schedules,
});

export default rootReducer;
