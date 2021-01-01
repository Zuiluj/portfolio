import React, { Component } from 'react';
import { BsTrash, BsPen } from 'react-icons/bs';

import { authDelReq } from '../services/apiReq.component';

const BlogList = (props) => {

    function handleDeleteClick(blog) {
        authDelReq(`/api/auth/blogs/${blog._id}`)
            .then( (response) => {
                // if (response.status === 200) {
                //     this.setState({
                //         confirmLoading: false,
                //         modalVisible: false,
                //         currentBlogId: ''
                //     })
                // }
                // this.openNotif('Blog deleted!', 'success', 'Blog was successfully deleted! Klik-klank!')
                
            })
            .catch( (err) => {
                // this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
            })
    }

    return (
        <div className="admin_blogs">
            { props.blogs.map( (blog) => {
                    return <Blog 
                        key={ blog._id }
                        blog={blog}
                        changeFormValues={ props.changeFormValues }
                        handleDeleteClick={ handleDeleteClick }
                        />
                })
            }
        </div>
    )
}

const Blog = (props) => {
    return (
        <div className="admin_single_blog">
            <div className="admin_single_blog__date">
                Created: { new Date(props.blog.created_at).toUTCString() }
                <br />
                Updated: { new Date(props.blog.updated_at).toUTCString() }
            </div>
            <div className="admin_single_blog__title">
                { props.blog.title }
            </div> 
            <div className="admin_single_blog__modify">
                <button className="admin_single_blog__modify_btn" id="edit_blog" onClick={ () => props.changeFormValues(props.blog) } > < BsPen /> </button>
                <button className="admin_single_blog__modify_btn" id="delete_blog" onClick={ () => props.handleDeleteClick(props.blog) } > < BsTrash /> </button>
            </div>
        </div>
    )
}

export default BlogList