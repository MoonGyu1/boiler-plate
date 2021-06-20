import axios from 'axios';
import { 
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)

    //Reducer의 역할: (previousState, action) => nextState
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data)

    //Reducer의 역할: (previousState, action) => nextState
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/users/auth')
    .then(response => response.data)

    //Reducer의 역할: (previousState, action) => nextState
    return {
        type: AUTH_USER,
        payload: request
    }
}