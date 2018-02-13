import { combineReducers } from 'redux';
import topics from './topics';

/**
 * Reducers are combined in this file so the store creator only needs to have a
 * single import from the reducers folder
 */
export default combineReducers({
  topics,
});
