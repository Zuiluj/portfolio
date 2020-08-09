import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';


export const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = () => {
        if (Cookies.get('isAuthenticated')) {
            return true
        } else {
            return false
        }
    }
        
    

    return (
        <Route 
            { ...rest }
            render={props =>
                isLoggedIn() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
                )
            
            }
        />
    )
}