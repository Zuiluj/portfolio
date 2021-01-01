import React, { Component, useContext } from 'react';
import { Row, Col, Button, Form, Input, Select, notification } from 'antd';

import AdminBlogForm from '../adminpage/adminBlogForm.component';
import BlogList from './adminBlogList.component';
import { getReq, authPostReq, authPutReq, authDelReq } from '../services/apiReq.component';
import '../../style/adminBlog.css'

class ConfigureBlog extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isUpdateReq: false,
            tags: [],
            blogs: [],
            currentBlog: {},

            modalVisible: false,
            confirmLoading: false,
            modalErrors: ''
        }

        this.changeFormValues = this.changeFormValues.bind(this);
        this.openNotif = this.openNotif.bind(this);
        this.clearContent = this.clearContent.bind(this);
    }
    
    componentDidMount() {
        getReq('/api/blogs/tags')
            .then( (res) => {
                this.setState({
                    tags: res.data.data
                })
            })

        getReq('/api/blogs')
            .then( (res) => {
                this.setState({
                    blogs: res.data.data
                })
            })
    }

    openNotif(msg, type, desc) {
        this.setState({})
        notification[type]({
            message: msg,
            description: desc
        })
    }

    changeFormValues(blog) {
        if (blog._id) this.setState({ isUpdateReq: true })
        // Prevent overriding the title and tag form when writing in md editor
        if (blog !== this.state.currentBlog) {
            if (typeof(blog) === 'string') {
                this.setState({
                    currentBlog: { ...this.state.currentBlog, content: blog }
                })
            } else if (blog.blog_title) {
                this.setState({
                    currentBlog: { ...this.state.currentBlog, title: blog.blog_title}
                })
            } else if (blog.blog_tags) {
                this.setState({
                    currentBlog: { ...this.state.currentBlog, tags: blog.blog_tags}
                })
            } else {
                this.setState({
                    currentBlog: blog
                })
            }
        }
    }

    clearContent() {
        this.setState({
            isUpdateReq: false,
            currentBlog: {}
        })
    }

    render() {
        return (
            <div className="configureBlogs">
                <Row justify="center" align="middle" gutter={[40, 20]}>
                    <Col span={24}>
                        <AdminBlogForm 
                            tags={this.state.tags}
                            currentBlog={this.state.currentBlog} 
                            isUpdateReq={this.state.isUpdateReq}
                            mdContent={this.state.currentBlog.content}
                            changeFormValues={this.changeFormValues}
                            openNotif={this.openNotif}
                            clearContent={this.clearContent}
                        />
                        <Button onClick={this.clearContent} className="configureBlogs__btn"> Clear </Button>
                    </Col>
                    <Col span={24}> 
                        <BlogList
                            blogs={this.state.blogs}
                            changeFormValues={this.changeFormValues}
                            openNotif={this.openNotif}
                        /> 
                    </Col>
                </Row>
            </div>
        )
    }
   
}

export default ConfigureBlog