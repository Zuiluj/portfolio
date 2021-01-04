import React, { Component } from 'react';
import { Row, Col, Button, Form, Input, Select, notification } from 'antd';

import TagList from './adminTagList.component';
import TagForm from './adminTagForm.component';
import { getReq, authPostReq, authDelReq } from '../services/apiReq.component';
import '../../style/adminTag.css';
import PageNavigator from '../allpage/pageswitcher.component';

class ConfigureTag extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            tagPage: 0
        }
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        getReq('/api/blogs/tags')
            .then( (res) => {
                this.setState({
                    tags: res.data?.data || []
                })
            })
    }

    nextPage() {
        getReq(`/api/blogs/tags?page=${this.state.tagPage + 1}`)
            .then( (res) => {
                this.setState({
                    tags: res.data?.data || [],
                    tagPage: this.state.tagPage + 1,
                })
            })
    }

    prevPage() {
        if (!this.state.tagPage < 1) {
            getReq(`/api/blogs/tags?page=${this.state.tagPage - 1}`)
                .then( (res) => {
                    this.setState({
                        tags: res.data?.data || [],
                        tagPage: this.state.tagPage - 1,
                    })
                })
        }
    }

    refresh() {
        getReq(`/api/blogs/tags?page=${this.state.tagPage}`)
            .then( (res) => {
                this.setState({
                    tags: res.data?.data || []
                })
            })
    }
    
    render() {
        return (
            <div>
                <Row justify="center" align="middle" gutter={[40, 20]}>
                    <Col span={24}> 
                        <TagForm/>
                    </Col>
                    <Col span={24}>
                        <TagList
                            tags={this.state.tags}
                        />
                        <PageNavigator 
                            prev={this.prevPage}
                            next={this.nextPage}
                            refresh={this.refresh}
                        />
                    </Col>
                </Row>

            </div>
        )
    }
}

export default ConfigureTag