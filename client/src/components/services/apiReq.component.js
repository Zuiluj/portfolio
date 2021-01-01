import React from 'react';
import { navigate } from '@reach/router'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const authPostReq = ( async (url, body={}) => {
    let response = {}
    await axios.post(url, body)
        .then( (res) => {
            response = res
        })
        .catch( (err) => {
            if (err.response.data.message.name === 'TokenExpiredError') {
                navigate('/admin/login')
            } else {
                throw err
            }
        })
    return response
})

export const authGetReq = ( async (url, body={}) => {
    let response = {}
    await axios.get(url, body)
        .then( (res) => {
            response = res
        })
        .catch( (err) => {
            if (err.response.data.message.name === 'TokenExpiredError') {
                navigate('/admin/login')
            } else {
                throw err
            }
        })
    return response
})

export const authPutReq = ( async (url, body={}) => {
    let response = {}
    await axios.put(url, body)
        .then( (res) => {
            response = res
        })
        .catch( (err) => {
            if (err.response.data.message.name === 'TokenExpiredError') {
                navigate('/admin/login')
            } else {
                throw err
            }
        })
    return response
})

export const authDelReq = ( async (url, body={}) => {
    let response = {}
    await axios.delete(url, body)
        .then( (res) => {
            response = res
        })
        .catch( (err) => {
            if (err.response.data.message.name === 'TokenExpiredError') {
                navigate('/admin/login')
            } else {
                throw err
            }
        })
    return response
})


export const getReq = ( async (url) => {
    let response = {}
    await axios.get(url)
        .then( (res) => {
            response = res
        })
    return response
})

export const postReq = ( async (url, body={}) => {
    let response = {}
    await axios.post(url, body)
        .then( (res) => {
            response = res
        })

    return response
})