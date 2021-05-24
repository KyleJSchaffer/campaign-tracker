import { combineReducers } from 'redux';
import {currentUser} from './currentUser';
import {serverResponse} from './serverResponse';
export default combineReducers({
    currentUser,
    serverResponse
})