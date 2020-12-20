import React from "react"
import { Link } from "gatsby"

import Image from "../components/image"
import SEO from "../components/seo"
import Layout from "../components/layout"

import Home from '../components/homepage/homepage.component'
import NavBar from '../components/allpage/navbar.component'
import '../style/homepage.css'

const Index = () => (
    <Layout>
        <Home/>
    </Layout>
)
  
  export default Index
