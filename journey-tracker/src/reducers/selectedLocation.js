import {
    SELECT_LOCATION,
    DELETE_LOCATION,
    SET_MAP_MODE,
    SELECT_PATH,
    CANCEL_ALL_CHANGES
} from '../actions';
import { MapModes } from '../constants';

export const selectedLocation = (state = null, action) => {
    switch (action.type) {
        case SELECT_LOCATION:
            return action.id;
        case SELECT_PATH:
            return null;
        case SET_MAP_MODE:
            if (action.mapMode === MapModes.ADD_MODE) {
                return null
            } else {
                return state
            }
        case CANCEL_ALL_CHANGES:
            return null
        case DELETE_LOCATION:
            return null
        default:
            return state
    }
}