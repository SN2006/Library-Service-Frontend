import axios from 'axios';
import {jwtDecode} from "jwt-decode";

axios.defaults.baseURL = "http://localhost:8088/api/v1";

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthToken = (token) => {
    window.localStorage.setItem('auth_token', token);
};

export const request = (method, url, data, headers, params) => {
    const token = getAuthToken();
    if (token !== null && token !== "null"){
        const decoded = jwtDecode(token);
        if (new Date().getTime() > decoded.exp * 1000){
            setAuthToken(null);
        }else{
            headers["Authorization"] = `Bearer ${getAuthToken()}`;
        }
    }

    return axios.request({
        method: method,
        url: url,
        data: data,
        headers: headers,
        params: params
    })
}