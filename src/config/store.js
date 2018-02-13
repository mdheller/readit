import { createStore } from 'redux';
import reducers from '../reducers';

/**
 * Redux store creation happens here. Middleware will be inserted here as well.
 */
export default createStore(reducers);
