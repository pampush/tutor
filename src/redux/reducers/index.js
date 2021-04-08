import { combineReducers } from 'redux';

import lessons from './lessons';
import pupils from './pupils'

const rootReducer = combineReducers({
  lessons,
  pupils
});

export default rootReducer;
