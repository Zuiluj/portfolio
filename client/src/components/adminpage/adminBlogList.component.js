import React, { Component, useEffect } from 'react';
import { BsTrash, BsPen } from 'react-icons/bs';

import { authDelReq } from '../services/apiReq.component';
import ModalConfirm from '../allpage/modal.component';

const BlogList = (props) => {
    useEffect( () => {}, [props.blogs])

    function handleDeleteClick(blog) {
        ModalConfirm({ 
            desc: `Blog to be deleted: '${blog.title}'`,
            onConfirm: () => { authDelReq(`/api/auth/blogs/${blog._id}`, {},
                {
                    message: `Blog successfully deleted!`,
                    desc: `Blog: '${blog.title}' deleted!`
                })
            }
        });
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