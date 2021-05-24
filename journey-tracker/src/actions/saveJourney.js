import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ROOT } from '../constants';

export const SAVE_JOURNEY_SUCCESS = 'SAVE_JOURNEY_SUCCESS';
export const SAVE_JOURNEY_FAIL = 'SAVE_JOURNEY_FAIL';

export const saveJourney = (locations, paths, lastLoc) => {

    return dispatch => {

        return axios.post(API_ROOT + '/map', {
            locations: locations,
            paths: paths,
            lastLoc: lastLoc
        },
            {
                headers: { Authorization: "JWT " + localStorage.getItem('JWT') }
            }
        )
            .then(res => {
                dispatch(saveJourneySuccess())
            })
            .catch(error => dispatch(saveJourneyFail(error.response.data.message)));

    }
}

export const saveJourneySuccess = () => {
    toast.success('Successfully saved data.');
    return {
        type: SAVE_JOURNEY_SUCCESS
    }
}

export const saveJourneyFail = (error) => {
    toast.error('Failed to save data ' + error);
    console.log(error)
    return {
        type: SAVE_JOURNEY_FAIL,
        error: error
    }
}