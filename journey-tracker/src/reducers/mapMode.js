import {
    SET_MAP_MODE,
    ADD_LOCATION,
    SAVE_JOURNEY_SUCCESS
} from '../actions'

import { MapModes } from '../constants'

//Map modes determine whether some components are displayed and the interaction between some components
export const mapMode = (state = MapModes.VIEW_MODE, action) => {
    switch (action.type) {
        case SET_MAP_MODE:
            return action.mapMode;
        case ADD_LOCATION:
            return MapModes.VIEW_MODE;
        case SAVE_JOURNEY_SUCCESS:
            return MapModes.VIEW_MODE;
        default:
            return state;
    }
}