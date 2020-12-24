import React from 'react';
import { navigate } from '@reach/router'
import axios from 'axios';

axios.defaults.withCredentials = true;
const AuthReq = ( (method, url) => {
    axios.method(url)
        .then( (res) => {
            return res
        })
        .catch( (err) => {
            if (err.message.name === 'TokenExpiredError') {
                navigate('/admin/login')
            } else {
                return JSON.stringify(err)
            }
        })
})

export default AuthReq