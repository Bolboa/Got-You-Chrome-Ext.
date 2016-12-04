import {combineReducers} from 'redux';
import Example from './example'; 
const allReducers = combineReducers({
	example:Example
});

export default allReducers;