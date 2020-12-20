import React from "react"
import { Link } from "gatsby"

import Image from "../components/image"
import SEO from "../components/seo"
import Layout from "../components/layout"

import Blogs from '../components/blogpage/blogpage.component'

const HomePage = (props) => (
    <Layout>
        <Blogs location={props.location}/>
    </Layout>
)
  
  export default HomePage
