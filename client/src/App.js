import React from 'react';
import { Router } from "@reach/router"
import { Layout } from 'antd';

import { PrivateRoute } from './components/adminpage/privateroute.component';
import Navbar from './components/allpage/navbar.component';
import HomePage from './components/homepage/homepage.component';
import AdminPage from './components/adminpage/adminpage.component';
import AdminLoginPage from './components/adminpage/adminloginpage.component';
import BlogPage from './components/blogpage/blogpage.component';
import SingleBlogpage from './components/blogpage/singleBlogpage.component';

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <Layout>
      <Router>
        <Navbar />
          <Route exact path="/" component={withRouter(HomePage)} />
          
          <Route exact path="/blogs" component={withRouter(BlogPage)} />
          <Route exact path="/blogs/:id/:slug" component={withRouter(SingleBlogpage)} />

        <Content>
          <PrivateRoute exact path="/admin" component={withRouter(AdminPage)} />
        </Content>
        
        <Content>
          <Route exact path="/admin/login" component={withRouter(AdminLoginPage)} />
        </Content>

      </Router>
    </Layout>
  );
}

export default App;
