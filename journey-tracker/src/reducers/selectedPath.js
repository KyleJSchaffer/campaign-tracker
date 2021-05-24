import {
    SELECT_PATH,
    SET_MAP_MODE,
    SELECT_LOCATION,
    CANCEL_ALL_CHANGES
} from '../actions';
import { MapModes } from '../constants';

export const selectedPath = (state = null, action) => {
    switch (action.type) {
        case SELECT_PATH:
            return action.id
        case SELECT_LOCATION:
            return null
        case CANCEL_ALL_CHANGES:
            return null
        case SET_MAP_MODE:
            if (action.mapMode === MapModes.ADD_MODE) {
                return null
            } else {
                return state
            }
        default:
            return state;
    }
}