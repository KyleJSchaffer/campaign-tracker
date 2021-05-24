import axios from'axios';
import {API_ROOT} from '../constants';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export const registerUser = (username, password) =>{
    return dispatch =>{
        axios.post(API_ROOT + '/auth/register',{
            username: username,
            password: password
        })
        .then(res=>{
            if(res.data.success){
                dispatch(registerUserSuccess());
            }else{
                dispatch(registerUserFail(res.data.message));
            }
        })
        .catch(err=>{
            dispatch(registerUserFail(err.response.data.message));
        })
        
    }
}

export const registerUserSuccess = ()=>({
    type: REGISTER_USER_SUCCESS
})

export const registerUserFail = error =>({
    type: REGISTER_USER_FAIL,
    error
})