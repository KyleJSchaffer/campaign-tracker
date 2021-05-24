import axios from 'axios';
import { toast } from 'react-toastify';
import {API_ROOT} from '../constants';

export const REQUEST_MAP_DATA_SUCCESS = 'REQUEST_MAP_DATA_SUCCESS';
export const REQUEST_MAP_DATA_FAIL = 'REQUEST_MAP_DATA_FAIL';

export function fetchMapData(){
    //If client is logged in the API request is sent with the JWT token in the header and the user's data is returned,
    //otherwise guest data will be returned
    return dispatch =>{
        let api_url, authHeader;
        if(localStorage.getItem('Username')){
            api_url = API_ROOT + '/user/' + localStorage.getItem('Username') + '/map';
            authHeader = { Authorization: "JWT " + localStorage.getItem('JWT')}
        }else{
            api_url = API_ROOT+'/map'
            authHeader = {}
        }

        return axios.get(api_url, {headers: authHeader})
        .then(res=>{
                dispatch(requestMapDataSuccess(res.data.locations, res.data.paths, res.data.lastLoc));
        })
        .catch(error=>dispatch(requestMapDataFail(error.response.data.message)));
        
    }
}

export const requestMapDataSuccess = (locations,paths, lastLoc)=>{
    return({
        type: REQUEST_MAP_DATA_SUCCESS,
        locations,
        paths,
        lastLoc
    })
}

export const requestMapDataFail = error=>{
    toast.error('Failed to fetch map data from database.\n' + error);
    return({
        type:REQUEST_MAP_DATA_FAIL,
        error
    })
}