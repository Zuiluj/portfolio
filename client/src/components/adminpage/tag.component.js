import React, { Component } from 'react';
import { Row, Col, Button, Form, Input, Select, notification } from 'antd';

import TagList from './adminTagList.component';
import TagForm from './adminTagForm.component';
import { getReq, authPostReq, authDelReq } from '../services/apiReq.component';
import '../../style/adminTag.css';

class ConfigureTag extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
    }

    componentDidMount() {
        getReq('/api/blogs/tags')
            .then( (res) => {
                this.setState({
                    tags: res.data.data
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
                    </Col>
                </Row>

            </div>
        )
    }
}

export default ConfigureTag