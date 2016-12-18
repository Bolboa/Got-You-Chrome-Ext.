import {combineReducers} from 'redux';

import LocalStorage from './localStorage';
import GetInfo from './getInfo';

const allReducers = combineReducers({
	local:LocalStorage,
	info:GetInfo
});

export default allReducers;