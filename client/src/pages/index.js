import React from "react";
import { Router } from "@reach/router";

import Layout from "../components/layout";
import Home from '../components/homepage/homepage.component';
import '../style/homepage.css';

import "fontsource-sen";
import "fontsource-bree-serif";
import "fontsource-reem-kufi";
import "fontsource-roboto-mono";
import "fontsource-noto-serif";
import "fontsource-josefin-sans";

const Index = () => (
    <Layout>
        <Home/>
    </Layout>
)
  
  export default Index
