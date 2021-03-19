import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import Cookies from 'universal-cookie';

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const cookies = new Cookies();
        const username = cookies.get('username');
        if (username) {
            setLoggedIn(true);
        }

    }, [])
    if (loggedIn) {
        return (
            <div>
                <div>
                    <Redirect to="/jobs" />
                </div>
            </div>
        );
    }
        
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <div className="container center-align">
                <h3>Login</h3>
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;