import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Button, Form, Input, Select } from 'antd';

import { authPostReq, authPutReq } from '../services/apiReq.component';
import BlogEditor from './markdownEditor.component';

const AdminBlogForm = (props) => {
    const blogFormRef = React.createRef();
    useEffect( () => {}, [props.isUpdateReq])
    useEffect( () => {
        blogFormRef.current.setFieldsValue({
            blog_title: props.currentBlog.title,
            blog_tags: props.currentBlog.tags
        })
    }, [props.currentBlog])

    async function submitForm (form) {
        let blogContent = props.currentBlog.content
        console.log(`@ADMIN BLOG FORM: UPDATE? ${props.isUpdateReq}`)
        if (props.isUpdateReq) {
            await authPutReq(`/api/auth/blogs/${props.currentBlog._id}`, {
                title: form.blog_title,
                tags: form.blog_tags,
                content: blogContent
            })
                .then( (response) => {
                    // TODO: 
                    if (response.status === 200) {
                        // clear form
                        props.clearContent()
                    }
                })
                .catch( (err) => {
                    
                })
        } else {
            await authPostReq('/api/auth/blogs', {
                title: form.blog_title,
                tags: form.blog_tags,
                content: blogContent
            })
                .then( (response) => {
                    if (response.status === 200) {
                        // clear form
                        props.clearContent()
                    }
                })
                .catch( (err) => {
                   
                })
        }

    }

    return (
        <Form
            onFinish={ submitForm }
            ref={ blogFormRef }
            onValuesChange={ props.changeFormValues }
        >
            <Form.Item
                label="Title"
                name="blog_title"
                rules={[
                    {
                        required: true,
                        message: 'Please provide the title'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Tags"
                name="blog_tags"
                rules={[
                    {
                        required: true,
                        message: 'Please provide the tags'
                    }
                ]}
            >
                <Select mode="multiple">
                    {
                        props.tags.map( (tag) => {
                            return <Select.Option key={tag._id} value={tag.name}> { tag.name } </Select.Option>
                        })
                    }
                </Select>
            </Form.Item>

            <Form.Item>
                <BlogEditor 
                    value={props.mdContent}
                    changeFormValues={props.changeFormValues}    
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="configureBlogs__btn"> Create Blog </Button>
            </Form.Item>
        </Form>
    )
    
}

export default AdminBlogForm