import React from "react";

import SEO from "../components/seo";
import Layout from "../components/layout";

import Blogs from '../components/blogpage/blogpage.component';

const HomePage = (props) => (
    <Layout>
        <SEO title="Blogs"/>
        <Blogs location={props.location}/>
    </Layout>
)
  
export default HomePage
