import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import { notification } from 'antd';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const openNotif = ( (msg, type, desc)  => {
    notification[type]({
        message: msg,
        description: desc
    })
})

export const authPostReq = ( async (url, body={}, notice={}) => {
    let response = {}
    await axios.post(url, body)
        .then( (res) => {
            response = res
            openNotif(notice.message, 'success', notice.desc)
        })
        .catch( (err) => {
            if (err.response?.data?.message?.name === 'TokenExpiredError') {
                navigate('/admin/login')
            } else {
                openNotif('Error!', 'error', JSON.stringify(err.message) || JSON.stringify(err))
                console.log(`@ELSE BLOCK`)
                response = err
            }
        })
    return response
})

export const authGetReq = ( async (url, body={}, notice={}) => {
    let response = {}
    await axios.get(url, body)
        .then( (res) => {
            response = res
            openNotif(notice.message, 'success', notice.desc)
        })
        .catch( (err) => {
            if (err.response?.data?.message?.name === 'TokenExpiredError') {
                navigate('/admin/login')
            } else {
                openNotif('Error!', 'error', JSON.stringify(err.message) || JSON.stringify(err))
                console.log(`@ELSE BLOCK`)
                response = err
            }
        })
    return response
})

export const authPutReq = ( async (url, body={}, notice={}) => {
    let response = {}
    await axios.put(url, body)
        .then( (res) => {
            response = res
            openNotif(notice.message, 'success', notice.desc)
        })
        .catch( (err) => {
            if (err.response?.data?.message?.name === 'TokenExpiredError') {
                navigate('/admin/login')
            } else {
                openNotif('Error!', 'error', JSON.stringify(err.message) || JSON.stringify(err))
                console.log(`@ELSE BLOCK`)
                response = err
            }
        })
    return response
})

export const authDelReq = ( async (url, body={}, notice={}) => {
    let response = {}
    await axios.delete(url, body)
        .then( (res) => {
            response = res
            openNotif(notice.message, 'success', notice.desc)
        })
        .catch( (err) => {
            if (err.response?.data?.message?.name === 'TokenExpiredError') {
                navigate('/admin/login')
            } else {
                openNotif('Error!', 'error', JSON.stringify(err.message) || JSON.stringify(err))
                console.log(`@ELSE BLOCK`)
                response = err
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
        .catch ( (err) => {
            openNotif('Error!', 'error', err || JSON.stringify(err.message))
        })
    return response
})

export const postReq = ( async (url, body={}, notice={}) => {
    let response = {}
    await axios.post(url, body)
        .then( (res) => {
            response = res
            openNotif(notice.message, 'success', notice.desc)
        })
        .catch ( (err) => {
            openNotif('Error!', 'error', err || JSON.stringify(err.message))
        })

    return response
})