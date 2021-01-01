import React, { Component } from 'react';
import { navigate } from "@reach/router";
import { Link, graphql } from "gatsby";
import { Layout, Card, notification, Tag, Form, Select, DatePicker, Button, Input } from 'antd';
import { stateToHTML } from 'draft-js-export-html';
import 'antd/dist/antd.less';
import axios from 'axios';
import { convertFromRaw } from 'draft-js';
import queryString from 'query-string'
import ReactHtmlParser from 'react-html-parser';

import { getReq } from '../services/apiReq.component';
import PageTitle from '../allpage/pageTitle.component';
import '../../style/blogpage.css';

export default class BlogPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blogs: [],
            loading: false,
            page: 0,
            prevY: 0
        }

        this.openNotif = this.openNotif.bind(this);
        this.handleObserver = this.handleObserver.bind(this);
        this.getBlogs = this.getBlogs.bind(this);
    }

    getBlogs() {
        this.setState({ loading: true });
        getReq(`/api/blogs?page=${this.state.page}`)
            .then( (res) => {
                if (res.data.data.length > 0 && res.data.data !== this.blogs) {
                    this.setState({
                        blogs: [...this.state.blogs, ...res.data.data],
                        loading: false,
                        page: this.state.page + 1
                    })
                }
            })
    }

    componentDidMount() {
        this.getBlogs();

        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        )

        this.observer.observe(this.loadingRef);

    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
           this.getBlogs()
        }
        this.setState({ prevY: y });
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            getReq(`/api/blogs${this.props.location.search}`)
                .then( (response) => {
                    this.setState({
                        blogs: response.data.data
                    })
                })
                .catch( (err) => {
                    this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
                })
        }
    }

    openNotif(msg, type, desc) {
        notification[type]({
            message: msg,
            description: desc
        })
    }

    render() {    
        // Additional css
        const loadingCSS = {
          height: "100px",
          margin: "30px"
        };

        return (
            <Layout>
                <PageTitle 
                    classPageHeader="blog_header"
                    classPageHeaderTitle="blog_header__title"
                    title="My Blogs"
                />

                <div className="blogs_parent">
                    <BlogsFilter reactHistory={this.props.history}/>
                    <div className="blogs">
                        {
                            this.state.blogs.map( (blog) => {
                                return <Card 
                                    hoverable 
                                    title={ blog.title } 
                                    className="a_blog"
                                    extra={ <Link to={"/blogs/" + blog.slug }> Read more </Link >} 
                                    key={ blog._id }
                                >
                                    <div className="content_peek">
                                        { ReactHtmlParser(stateToHTML(convertFromRaw(JSON.parse(blog.content)))) }
                                    </div>
                                    <div className="blogs_date"> Created: { new Date(blog.created_at).toDateString() } </div>
                                    <div className="blog_tags"> { blog.tags.map( (tag) => <Tag key={tag}> { tag } </Tag> ) } </div>
                                </Card>
                            })
                        }
                        
                    <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                    >

                    </div>

                    </div>
                </div>
            </Layout>
        );
    }

}


class BlogsFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tags: []
        }

        this.submitFilters = this.submitFilters.bind(this)
    }

    componentDidMount() {
        getReq('/api/blogs/tags')
        .then( (response) => {
            this.setState({
                tags: response.data.data
            })
        })
        .catch( (err) => {
            this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
        })
    }

    submitFilters(props) {
        let searchTerms = props.blog_filter_w_search ? encodeURIComponent(props.blog_filter_w_search) : undefined
        let tags = props.blog_filter_w_tags ? encodeURIComponent(props.blog_filter_w_tags) : undefined
        let date = props.blog_filter_w_weeks ? encodeURIComponent(props.blog_filter_w_weeks) : undefined

        let rawParams = {
            searchTerms: searchTerms,
            tags: tags,
            date: date
        }

        const transformedParams = queryString.stringify(rawParams)
        navigate(`/blogs?${transformedParams}`)
    }

    render() {
        return (
            <div className="blogs_filter_parent">
                <div className="blogs_filter">
                    <h1 className="blogs_filter__title"> Blogs Filter </h1>
                    <Form layout="vertical" onFinish={ this.submitFilters }>
                        <Form.Item
                        name="blog_filter_w_search"
                        label="Search"
                        >
                            <Input placeholder="Search blogs"/>
                        </Form.Item>

                        <Form.Item
                        name="blog_filter_w_tags"
                        label="Select by Topic Tags"
                        >
                            <Select mode="multiple" placeholder="Blog tags">
                            {
                                this.state.tags.map( (tag) => {
                                    return <Select.Option key={tag._id} value={tag.name}> { tag.name } </Select.Option>
                                })
                            }
                            </Select>
                        </Form.Item>

                        <Form.Item
                        name="blog_filter_w_weeks"
                        label="Created from"
                        >
                            <DatePicker />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Show filtered blogs 
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }

}