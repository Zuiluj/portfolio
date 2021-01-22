import { Layout, Input, Button, Form } from 'antd';
import React, { Component } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import 'antd/dist/antd.less';

import { postReq } from '../services/apiReq.component'
import '../../style/adminloginpage.css';

const { Header, Content } = Layout

axios.defaults.withCredentials = true;
export default class AdminLoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form_error: ""
        }
        this.loginUser = this.loginUser.bind(this)
    }

    async loginUser (props) {
        var today = new Date();
        var date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        // connect to API to login
        await postReq('/api/login', { 
            username: props.username, 
            password: props.password
        }, {
            message: 'Successful login!',
            desc: `${props.username} logged in at ${date} ${time}`
        })
            .then( (response) => {
                // Redirect after successful login
                if (response.status === 200) {
                    navigate(this.props.redirectPath)
                }
            })
            .catch( (err) => {
                this.setState({
                    form_error: "Wrong username or password"
                })
            })
    }

    render() {
        return (
            <Layout>
                <Header></Header>
                <Content className="login_parent">
                    <div className="login_welcome">
                        <h1>
                            Welcome admin!
                        </h1>
                    </div>

                    <div className="login_form">
                        <Form onFinish={ this.loginUser }>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Username required',
                                    },
                                ]}
                            >
                                <Input placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password required'
                                    }
                                ]}
                            >
                                <Input.Password placeholder="Password"/>
                            </Form.Item>

                            <Form.Item >
                                    <Button type="primary" htmlType="submit" className="contact__submit_btn">
                                    LOGIN
                                    </Button>
                            </Form.Item>

                            <div className="login_form__custom_error">
                                { this.state.form_error }
                            </div>
                        </Form>
                    </div>
                    
                </Content>

            </Layout>
        );
    }
}