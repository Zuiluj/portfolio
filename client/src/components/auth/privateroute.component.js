import React from 'react';
import { navigate } from "@reach/router";
import Cookies from 'js-cookie';
import LoginPage from '../adminpage/adminLogin.component';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const isLoggedIn = () => {
        if (Cookies.get('isAuthenticated')) {
            return true
        } else {
            return false
        }
    }

    if (!isLoggedIn()) {
        navigate('/admin/login')
        //return null
        return <LoginPage redirectPath={location.pathname}/>
    }

    return <Component {...rest}/>
}

export default PrivateRoute