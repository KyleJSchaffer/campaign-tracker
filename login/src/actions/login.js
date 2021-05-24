import axios from 'axios';
import { API_ROOT } from '../constants'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const requestLogin = (username, password) => {
    //Send a login request to the API server. If successful save the returned username and JWT to localstorage
    return dispatch => {
        axios.post(API_ROOT + '/auth/login', {
            username: username,
            password: password
        })
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('Username', res.data.username);
                    localStorage.setItem('JWT', res.data.token);
                    dispatch(loginSuccess(res.data.username))
                }else{
                    dispatch(loginFail('Login Failed'))
                }
            })
            .catch(err=>dispatch(loginFail('Login Failed')))
    }
}


export const loginSuccess = username => ({
    type: LOGIN_SUCCESS,
    username
})

export const loginFail = error => ({
    type: LOGIN_FAIL,
    error
})