import React, { useState, useEffect, createContext } from 'react';

import { getReq } from '../components/services/apiReq.component'

export const AdminBlogContext = createContext();
export const AdminTagContext = createContext();

export const AdminBlogProvider = (props) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        getReq('/api/blogs')
            .then( (res) => {
                setBlogs(...res.data)
            })
    })

    return(
        <AdminBlogContext.Provider value={[blogs, setBlogs]}>
            {props.children}
        </AdminBlogContext.Provider>
    )
}

export const AdminTagProvider = (props) => {
    const [tags, setTags] = useState([])

    useEffect(() => {
        getReq('/api/blogs/tags')
            .then( (res) => {
                setTags(...res.data)
            })
    })

    return(
        <AdminTagContext.Provider value={[tags, setTags]}>
            {props.children}
        </AdminTagContext.Provider>
    )
}