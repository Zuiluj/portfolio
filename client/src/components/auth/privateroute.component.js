import React from 'react';
import { navigate } from "@reach/router";
import Cookies from 'js-cookie';
import LoginPage from "../adminpage/adminloginpage.component"

const PrivateRoute = ({ component: Component, location, ...rest }) => {

    const isLoggedIn = () => {
        if (Cookies.get('isAuthenticated')) {
            return true
        } else {
            return false
        }
    }

    if (!isLoggedIn() && location.pathname !== `/admin/login`) {
        navigate('/admin/login')
        return <LoginPage redirectPath={location.pathname}/>
    }

    return <Component {...rest}/>
}

export default PrivateRoute