import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ROOT } from '../constants';

export const REQUEST_SESSIONS_SUCCESS = 'REQUEST_SESSIONS_SUCCESS';
export const REQUEST_SESSIONS_FAIL = 'REQUEST_SESSIONS_FAIL';

export function requestSessions() {
    //If client is logged in the API request is sent with the JWT token in the header and the user's data is returned,
    //otherwise guest data will be returned
    return dispatch => {
        let api_url, authHeader;
        if (localStorage.getItem('Username')) {
            api_url = API_ROOT + '/user/' + localStorage.getItem('Username') + '/session';
            authHeader = { Authorization: "JWT " + localStorage.getItem('JWT') }
        } else {
            api_url = API_ROOT + '/session'
            authHeader = {}
        }
        
        return axios.get(api_url, { headers: authHeader })
            .then(res => {
                dispatch(requestSessionsSuccess(res.data.sessions));
            })
            .catch(error => dispatch(requestSessionsFail(error.response.data.message)));

    }
}

export const requestSessionsSuccess = sessions => ({
    type: REQUEST_SESSIONS_SUCCESS,
    sessions
});

export const requestSessionsFail = error => {
    toast.error('Failed to fetch map data from database.\n' + error);
    return {
        type: REQUEST_SESSIONS_FAIL,
        error: error
    }
}
