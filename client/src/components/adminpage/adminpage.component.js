import React, { Component } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.less';

import PageTitle from '../allpage/pageTitle.component';
import LogoutButton from './adminLogout.component'
import ConfigureBlog from './blog.component';
import ConfigureTag from './tag.component';
import '../../style/adminpage.css';

const { TabPane } = Tabs;

class AdminPage extends Component {

    constructor(props) {
        super(props);
        console.log(`@ADMIN PAGE: ${props.location}`)
    }

    render() {
        return (
            <div className="admin">
                <PageTitle 
                    classPageHeader="admin_header"
                    classPageHeaderTitle="admin_header__title"
                    title="Admin"
                />
                <LogoutButton reactHistory={this.props.location}/>
                <div className="admin_tabs">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Create/Edit Blog" key="1">
                            <ConfigureBlog />
                        </TabPane>
                        <TabPane tab="Create/Edit Tags" key="2">
                            <ConfigureTag />
                        </TabPane>
                    </Tabs>
                </div>
                
            </div>
        )
    }

}

export default AdminPage