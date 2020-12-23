// Logout component. React history MUST be passed as a prop
import React, { Component } from 'react';
import { navigate } from "@reach/router";
import { Button } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.less';

export default class LogoutButton extends Component {
    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this)
    }
    
    logout(props) {
        axios.get('/api/auth/logout')
            .then( (response) => {
                // Redirect after successful login
                if (response.status === 200) {
                    navigate('/admin/login')
                }
                
            })
            .catch( (err) => {
                console.log(JSON.stringify(err))
                this.setState({
                    form_error: "Wrong username or password"
                })
            })
    }
    
    render() {
        return (
            <Button onClick={ this.logout } className="logout_btn"> 
                LOGOUT 
            </Button>
        )
    }

}