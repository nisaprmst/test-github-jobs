import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const cookies = new Cookies();
const LoginForm = () => {
    const [uname, setUname] = useState("");
    const [pass, setPass] = useState("");
    const handleSubmit = e => {
        var res;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: uname,
                password: pass
            })
        };
        fetch('http://localhost:5000/login', requestOptions)
        .then(response => {
            res = response.json();
            cookies.remove('username');
            cookies.set('username', uname, {
                maxAge: 86400,
            });
        })
        .catch(err => alert(err));
    }

    const handleUsername = e => {
        const value = e.target.value;
        setUname(value);
    }

    const handlePassword = e => {
        const value = e.target.value;
        setPass(value);
    }

    return (
        <>
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={handleUsername} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
            </Form.Group>
            <Button onClick={handleSubmit} variant="primary" type="submit">
                Login
            </Button>
        </Form>
        </>
    )
}
export default LoginForm;