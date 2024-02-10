import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import eye icons

function Login() {
    const [data, setData] = useState({
        Email: '',
        Password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const [SubOrNot, setSubOrNot] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubOrNot(true);

        const storedUsers = JSON.parse(localStorage.getItem('Users')) || [];
        const existingUser = storedUsers.find((user) => user.Email === data.Email && user.Password === data.Password);

        if (existingUser) {
            console.log('Login successful:', data);
        } else {
            if (storedUsers.some((user) => user.Email === data.Email)) {
                setErrors({
                    email: '',
                    password: 'Wrong password. Please try again.',
                });
                console.log('Login failed. Wrong password.');
            } else {
                setErrors({
                    email: 'Invalid email. Please try again.',
                    password: '',
                });
                console.log('Login failed. Invalid email.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '40%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginLeft: '30%', marginTop: '10%', fontSize: '120%', marginTop: '6%' }}>
            <Form style={{ textAlign: 'left', marginLeft: '2%' }} onSubmit={handleSubmit}>
                <br />
                <center>
                    <h2 className='RegBrand'>Login</h2>
                </center>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={data.Email}
                        onChange={handleChange}
                        name="Email"
                        isInvalid={SubOrNot && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <InputGroup>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={data.Password}
                            onChange={handleChange}
                            name="Password"
                            isInvalid={SubOrNot && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        <Button variant="outline-secondary" onClick={handleTogglePassword}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} /> {/* Replace "Show" with eye icon */}
                        </Button>
                        {/* <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback> */}
                    </InputGroup>
                </Form.Group>

                <center>
                    <Button variant="primary" type="submit" style={{ backgroundColor: 'black', color: 'white', width: '40%' }}>
                        Login
                    </Button>
                </center>
                <br />
            </Form>
        </div>
    );
}

export default Login;
