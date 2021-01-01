import React from 'react';
import { Button, Form, Input } from 'antd';
import { authPostReq } from '../services/apiReq.component';

const TagForm = (props) => {
    const tagFormRef = React.createRef();

    function clearForm(props) {
        tagFormRef.current.setFieldsValue({
            tag_name: ''
        })
    }

    function submitTag(props) {
        authPostReq('/api/auth/blogs/tags', {
                name: props.tag_name
            })
                .then( (response) => {
                    if (response.status === 201) {
                        clearForm();
                    }
                })
                .catch( (err) => {
                    
                })
    }

    return (
        <Form className="create_tag_form" onFinish={ submitTag } layout="vertical" ref={tagFormRef}>
            <h2> Create Tag </h2>
            <Form.Item 
                name="tag_name"
                rules={[
                    {
                        required: true,
                        message: 'Tag name required',
                    },
                ]}
            >
                <Input 
                    placeholder="Tag name" 
                    className="tag_name__input" 
                />
            </Form.Item>

            <Form.Item>
                <Button type="secondary" className="create_tag__btn" onClick={ clearForm }>
                    Clear
                </Button>
                <Button type="primary" htmlType="submit" className="create_tag__btn">
                    Create Tag
                </Button>
            </Form.Item>
        </Form>
    )
}

export default TagForm