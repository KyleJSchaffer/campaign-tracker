import { API_ROOT } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

export const requestSessions = () => {
    //If client is logged in the API request is sent with the JWT token in the header and the user's data is returned,
    //otherwise guest data will be returned
    let api_url, authHeader;
    if (localStorage.getItem('Username')) {
        api_url = API_ROOT + '/user/' + localStorage.getItem('Username') + '/session';
        authHeader = { Authorization: "JWT " + localStorage.getItem('JWT') }
    } else {
        api_url = API_ROOT + '/session'
        authHeader = {}
    }

    //Send the request to the API server, return the sessions if the request is a success, otherwise returns null
    return axios.get(api_url, { headers: authHeader })
        .then(res => {
            //Sort the sessions in descending order by sessionNumber
            const sortedSessions = [...res.data.sessions].sort((a, b) => (b.sessionNumber - a.sessionNumber));
            return sortedSessions;
        }).catch(error => {
            toast.error('Failed to connect to database. ' + error.response.data.message)
            return null
        });
}

export const addSession = session => {
    //Sends the post request to the API server, returns true on success and false on failure
    return axios.post(API_ROOT + '/session', {
        sessionNumber: session.sessionNumber,
        sessionTitle: session.sessionTitle,
        description: session.description,
        currency: session.currency,
        itemList: session.itemList
    },
        {
            headers: { Authorization: "JWT " + localStorage.getItem('JWT') }
        }
    )
        .then(res => {
            toast.success('Succesfully added session.');
            return true
        }).catch(error => {
            toast.error('Failed to add session. ' + error.response.data.message)
            return false
        });
}

export const editSession = session => {
    axios.post(API_ROOT + '/session/' + session._id, {
        sessionNumber: session.sessionNumber,
        sessionTitle: session.sessionTitle,
        description: session.description,
        currency: session.currency,
        currencies: session.currencies,
        itemList: session.itemList
    }, {
            headers: { Authorization: "JWT " + localStorage.getItem('JWT') }
        }).then(res => {
            toast.success('Succesfully edited session.');
        }).catch(error => {
            toast.error('Failed to edit session. ' + error.response.data.message)
        });
}

export const deleteSession = id => {
    axios.delete(API_ROOT + '/session/' + id, {
        headers: { Authorization: "JWT " + localStorage.getItem('JWT') }
    }).then(res => {
        toast.success('Succesfully deleted session.');
    }).catch(error => {
        toast.error('Failed to delete session. ' + error.response.data.message)
    });
}

export const requestSingleSession = id => {
    //If client is logged in the API request is sent with the JWT token in the header and the user's data is returned,
    //otherwise guest data will be returned
    let api_url, authHeader;
    if (localStorage.getItem('Username')) {
        api_url = API_ROOT + '/user/' + localStorage.getItem('Username') + '/session/' + id;
        authHeader = { Authorization: "JWT " + localStorage.getItem('JWT') }
    } else {
        api_url = API_ROOT + '/session/' + id;
        authHeader = {}
    }
    return axios.get(api_url, { headers: authHeader })
        .then(res => {
            return res.data.session;
        })
        .catch(error => {
            toast.error('Failed to connect to database. ' + error.response.data.message)
            return null;
        });
}