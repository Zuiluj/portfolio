import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { Row, Col } from 'antd';

import '../../style/adminBlog.css'

class ConfigureBlog extends Component {

    render() {
        return (
            <div>
                <Row justify="center" align="middle" gutter={[40, 20]}>
                    <Col span={16}> <SimpleMDE /> </Col>
                    <Col span={4}> Blog Selection </Col>
                </Row>
            </div>
        )
    }
}

export default ConfigureBlog