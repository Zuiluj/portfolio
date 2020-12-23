import React from "react";
import { Router } from "@reach/router";

import Layout from "../components/layout";
import Home from '../components/homepage/homepage.component';
import AdminPage from "../components/adminpage/adminpage.component";
import Login from "../components/adminpage/adminloginpage.component";
import PrivateRoute from "../components/auth/privateroute.component";
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
