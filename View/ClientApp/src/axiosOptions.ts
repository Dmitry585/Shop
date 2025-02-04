﻿import axios from 'axios';

export default function setAuthorizationToken(token:string|null) {
    if(token) {
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['authorization'];
    }
}