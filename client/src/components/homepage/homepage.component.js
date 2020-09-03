import React, { Component } from 'react';
import axios from 'axios';
import { Layout, Row, Col, Divider, Input, Button, Form, notification } from 'antd';

import Jump from 'react-reveal/Jump';

import '../../style/homepage.css'

const { Content } = Layout

export default class HomePage extends Component {
    contactFormRef = React.createRef();

    constructor(props) {
        super(props)
        this.state = {
            my_titles: [
                "A Full-stack Web Developer"
            ],
            current_title: ""
        }

        this.changeCurrentTitle = this.changeCurrentTitle.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.openNotif = this.openNotif.bind(this)
    }

    openNotif(msg, type, desc) {
        notification[type]({
            message: msg,
            description: desc
        })
    }

    sendEmail(props) {
        // connect to API to login
        axios.post('http://localhost:5000/api/send_mail', {
            name: props.name,
            email: props.email,
            message: props.message
        })
            .then( (response) => {
                // Redirect after successful login
                if (response.status === 200) {
                    this.openNotif('Message sent!', 'success', `Kindly wait for reply ${props.name} Looking forward to work with you!`)

                    this.contactFormRef.current.setFieldsValue({
                        name: '',
                        email: '',
                        message: ''
                    })
                }
                
            })
            .catch( (err) => {
                this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
            })
        
        
    }

    componentDidMount() {
        this.changeCurrentTitle();

    }

    changeCurrentTitle() {
        this.state.my_titles.forEach( (title, index) => {
            setTimeout( () => {
                this.setState({ current_title: title })
            }, index * 5000);
        })
    }


    render() {

        return (
            <Content className="intro">

                <div id="home" className="home">
                    <div className="home__text">
                        Good day! I am
                        <br />
                        <span id="my_name"> Juliuz Christian Llanillo </span>
                        <br />

                        <Jump key={this.state.current_title}> 
                        <div>
                            <span id="my_title"> 
                                    { this.state.current_title }
                            </span>
                        </div>
                        </Jump>
                    </div>
                </div>

                <div id="works" className="works">
                    <Divider orientation="center" className="works__divider" style={{ 
                        color: '#33968B', 
                        fontSize: '40px', 
                        lineHeight: '30px',
                        mixBlendMode: 'darken',
                        margin: '3rem 0',
                        fontFamily: 'Unica One'
                    }}>
                        WEB WORKS
                    </Divider>

                    <Row justify="space-around" gutter={[5, 20]} style={{ margin: "0 2rem" }}>
                        <Col span={23}>
                            <div className="works_single" style={{ background: `url( ${ require('../../img/works-digestiveimprovement.webp') } )`  }}>
                                <div className="works_single__text">
                                    <a href="https://digestiveimprovement.com/" rel="noopener noreferrer" target="_blank"> Digestive Improvement </a>
                                </div>
                            </div>
                        </Col>
                        
                    </Row>


                    <Row justify="space-around" gutter={[5, 20]} style={{ margin: "0 2rem" }}>

                        <Col span={8}>
                            <div style={{ background: `url( ${ require('../../img/works-lemonwater.webp') } )` }} className="works_single">
                                <div className="works_single__text">
                                    <a href="https://codepen.io/JulzChristian/full/MWYjXWg" target="_blank" rel="noopener noreferrer"> Lemon Water Product Page </a>
                                </div>
                            </div>
                        </Col>

                        <Col span={14}>
                            <div className="works_single" style={{ background: `url( ${ require('../../img/works-tetris.webp') } )`  }}>
                                <div className="works_single__text">
                                    <a href="https://codepen.io/JulzChristian/full/RwNGyXj" target="_blank" rel="noopener noreferrer"> Tetris </a>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>

                
                <Divider orientation="center" id="about" style={{ 
                        color: '#33968B', 
                        fontSize: '40px', 
                        lineHeight: '30px',
                        mixBlendMode: 'darken',
                        margin: '3rem 0',
                        fontFamily: 'Unica One'
                    }}>
                        ABOUT ME
                </Divider>
                
                <div className="about"> 
                    <div className="about__text">
                        Hello! I'm a full-stack developer who aims to give your business 
                        a remarkable online presence. Solutions to further increase
                        your leads by bringing new audience and also upsells to 
                        increase your sales
                    </div>
                </div>

                <div id="contact" className="contact"> 
                    
                    <Divider orientation="center" style={{ 
                        color: '#33968B', 
                        fontSize: '40px', 
                        lineHeight: '30px',
                        mixBlendMode: 'darken',
                        margin: '3rem 0',
                        fontFamily: 'Unica One'
                    }}>
                        CONTACT
                    </Divider>

                    <div className="contact__form">

                        <h5>
                            Send me your problem and let's talk about how we can solve it
                        </h5>
                        
                        <Form onFinish={ this.sendEmail } ref={this.contactFormRef}>
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name! Even your first name will do!',
                                    },
                                    {
                                        max: 254,
                                        message: 'Character exceeded. Now, now, you don\' need to put all of your family names...'
                                    }
                                ]}
                            >
                                <Input placeholder="Name" />
                            </Form.Item>
                        
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email! How can we have a great talk if you don\'t provide one?',
                                    },
                                    {
                                        max: 254,
                                        message: 'Character exceeded. That\'s quite a long email address...'
                                    }
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="message"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Explain your problem briefly.',
                                    },
                                    {
                                        max: 240,
                                        message: 'Character exceeded. Ain\'t that a long message?'
                                    }
                                ]}
                            >
                                <Input.TextArea rows={5} placeholder="Message"/>
                            </Form.Item>

                            <Form.Item >
                                    <Button type="primary" htmlType="submit" className="contact__submit_btn">
                                    Send
                                    </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <footer>

                </footer>
                
            </Content>
            
        );
    }

}
