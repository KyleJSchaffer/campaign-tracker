import { combineReducers } from 'redux';
import { locations } from './locations';
import { mapMode } from './mapMode';
import { selectedLocation } from './selectedLocation';
import { paths } from './paths';
import { selectedPath } from './selectedPath';
import { sessions } from './sessions';

export default combineReducers({
    locations,
    mapMode,
    selectedLocation,
    paths,
    selectedPath,
    sessions
});