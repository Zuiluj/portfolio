import React, { Component } from 'react';
import { Layout, Row, Col, Divider, Input, Button, Form } from 'antd';

import Jump from 'react-reveal/Jump';

import SampleWork from './sampleWork.component';
import '../../style/homepage.css';
import { postReq } from '../services/apiReq.component';

const { Content } = Layout

export default class HomePage extends Component {
    contactFormRef = React.createRef();

    constructor(props) {
        super(props)
        this.sendEmail = this.sendEmail.bind(this);
    }

    async sendEmail(props) {
        // connect to API to login
        await postReq('/api/send_mail', {
            name: props.name,
            email: props.email,
            message: props.message
        }, {
            message: 'Message sent!',
            desc: `Kindly wait for reply ${props.name} Looking forward to work with you!`
        })
            .then( (response) => {
                if (response.status === 200) {
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

    render() {
        const dividerTextStyle = { 
            color: '#33968B', 
            fontSize: '30px', 
            lineHeight: '30px',
            mixBlendMode: 'darken',
            margin: '3rem 0',
            fontFamily: 'Reem Kufi'
        }
        return (
            <Content className="intro">
                <div id="home" className="home">
                    <div className="home__text">
                        Good day! I am
                        <br />
                        <span id="my_name"> Juliuz Christian Llanillo </span>
                        <br />

                        <Jump> 
                        <div>
                            <span id="my_title"> 
                                A Fullstack Web Developer
                            </span>
                        </div>
                        </Jump>
                    </div>
                </div>

                <div id="works" className="works">
                    <Divider orientation="center" className="works__divider" style={dividerTextStyle}>
                        WEB WORKS
                    </Divider>

                    <Row justify="space-around" gutter={[5, 20]} style={{ margin: "0 2rem" }}>
                        <Col span={14}>
                            <SampleWork 
                                background={`url( ${ require('../../img/works-pixelart.jpeg') } )`}
                                link={`https://codepen.io/JulzChristian/full/mdryxgd`}
                                name={`JS Canvas Pixel Art Editor`}
                            />
                        </Col>
                        <Col span={8}>
                            <SampleWork 
                                background={`url( ${ require('../../img/works-digestiveimprovement.webp') } )`}
                                link={`https://digestiveimprovement.com/`}
                                name={`Digestive Improvement`}
                            />
                        </Col>
                    </Row>


                    <Row justify="space-around" gutter={[5, 20]} style={{ margin: "0 2rem" }}>

                        <Col span={8}>
                            <SampleWork 
                                background={`url( ${ require('../../img/works-lemonwater.webp') } )`}
                                link={`https://codepen.io/JulzChristian/full/MWYjXWg`}
                                name={`Lemon Water Product Page`}
                            />
                        </Col>

                        <Col span={14}>
                            <SampleWork 
                                background={`url( ${ require('../../img/works-tetris.webp') } )`}
                                link={`https://codepen.io/JulzChristian/full/RwNGyXj`}
                                name={`Tetris`}
                            />
                        </Col>

                    </Row>
                </div>

                
                <Divider orientation="center" id="about" style={dividerTextStyle}>
                        ABOUT ME
                </Divider>
                
                <div className="about"> 
                    <div className="about__text">
                    I'm  a  full-stack  developer  who  enjoys  building creative  solutions  to  complex  problems.
                    I  love learning  new  technologies  as  it  expands  my mind's  library  for  more  innovative
                    features. Interested  in  sparking and improving people's creativity using Python and JavaScript.
                    </div>
                </div>

                <div id="contact" className="contact"> 
                    
                <Divider orientation="center" style={dividerTextStyle}>
                    CONTACT
                </Divider>

                    <div className="contact__form">

                        <h5>
                            Want to contact me? Just fill this form and send it!
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
                
            </Content>
            
        );
    }

}
