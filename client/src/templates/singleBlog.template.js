import React, { Component } from 'react';
import Layout from "../components/layout"

import SingleBlog from '../components/blogpage/singleBlogpage.component'

const Blog = (props) => (
    <Layout>
        <SingleBlog blog={props.pageContext.blog}/>
    </Layout>
)

export default Blog
