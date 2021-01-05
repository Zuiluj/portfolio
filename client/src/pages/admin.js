import React from "react";
import { Router } from "@reach/router";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PrivateRoute from "../components/auth/privateroute.component";
import AdminPage from "../components/adminpage/adminpage.component";
import LoginPage from "../components/adminpage/adminLogin.component";

const Admin = (props) => (
    <Layout>
        <SEO title="Admin"/>
        <Router>
            <PrivateRoute path="/admin" component={AdminPage}/>
            <LoginPage path="/admin/login" redirectPath={"/admin"}/>
        </Router>
    </Layout>
)

export default Admin
