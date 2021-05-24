export const LOGOUT = 'LOGOUT';

export const logout = () => {
    //Delete the username and jwt from localstorage
    localStorage.removeItem('Username');
    localStorage.removeItem('JWT');
    return {
        type: LOGOUT
    }
};