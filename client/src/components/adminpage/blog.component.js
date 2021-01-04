import React, { Component, useContext } from 'react';
import { Row, Col, Button, Form, Input, Select, notification } from 'antd';

import AdminBlogForm from '../adminpage/adminBlogForm.component';
import BlogList from './adminBlogList.component';
import { getReq } from '../services/apiReq.component';
import PageNavigator from '../allpage/pageswitcher.component';
import '../../style/adminBlog.css'

class ConfigureBlog extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isUpdateReq: false,
            tags: [],
            blogs: [],
            currentBlog: {},
            blogPage: 0,
        }

        this.changeFormValues = this.changeFormValues.bind(this);
        this.clearContent = this.clearContent.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        getReq('/api/blogs/tags')
            .then( (res) => {
                this.setState({
                    tags: res.data?.data || []
                })
            })

        getReq('/api/blogs')
            .then( (res) => {
                this.setState({
                    blogs: res.data?.data || []
                })
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

    nextPage() {
        getReq(`/api/blogs?page=${this.state.blogPage + 1}`)
            .then( (res) => {
                this.setState({
                    blogs: res.data?.data,
                    blogPage: this.state.blogPage + 1,
                })
            })
    }

    prevPage() {
        if (!this.state.blogPage < 1) {
            getReq(`/api/blogs?page=${this.state.blogPage - 1}`)
            .then( (res) => {
                this.setState({
                    blogs: res.data?.data,
                    blogPage: this.state.blogPage - 1,
                })
            })
        }
    }

    refresh() {
        getReq(`/api/blogs?page=${this.state.blogPage}`)
            .then( (res) => {
                this.setState({
                    blogs: res.data?.data
                })
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

                        <PageNavigator 
                            prev={this.prevPage}
                            next={this.nextPage}
                            refresh={this.refresh}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
   
}

export default ConfigureBlog