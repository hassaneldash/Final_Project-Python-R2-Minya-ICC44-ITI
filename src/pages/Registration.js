import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import eye icons
import { useHistory } from 'react-router-dom';

function Register() {
    const history = useHistory();

    const [data, setData] = useState({
        Email: '',
        Name: '',
        Username: '',
        Password: '',
        ConfirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [errors, setErrors] = useState({
        Email: '',
        Name: '',
        Username: '',
        Password: '',
        ConfirmPassword: '',
    });

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateUsername = (username) => !/\s/.test(username);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const validateConfirmPassword = (confirmPassword) => confirmPassword === data.Password;

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
        setSubmitAttempted(true);

        const newErrors = {
            Email: '',
            Name: '',
            Username: '',
            Password: '',
            ConfirmPassword: '',
        };

        if (!validateEmail(data.Email)) {
            newErrors.Email = 'Please enter a valid email address';
        }

        // Check if the email already exists
        const storedUsers = JSON.parse(localStorage.getItem('Users')) || [];
        if (storedUsers.some(user => user.Email === data.Email)) {
            newErrors.Email = 'This email is already registered';
        }

        if (data.Name.trim() === '') {
            newErrors.Name = 'Please enter your name';
        }

        if (data.Username.trim() === '') {
            newErrors.Username = 'Username is required';
        } else if (!validateUsername(data.Username)) {
            newErrors.Username = 'Username cannot contain spaces';
        }

        if (!validatePassword(data.Password)) {
            newErrors.Password = 'Password must be at least 8 characters, with one lowercase, one uppercase, one digit, and one special character';
        }

        if (!validateConfirmPassword(data.ConfirmPassword)) {
            newErrors.ConfirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === '')) {
            const newUser = {
                Email: data.Email,
                Name: data.Name,
                Username: data.Username,
                Password: data.Password,
            };

            // Store the new user only if the email is unique
            localStorage.setItem('Users', JSON.stringify([...storedUsers, newUser]));

            history.push('/login');
        } else {
            console.log('Validation failed');
        }
    };

    return (
        <div style={{ maxWidth: '40%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginLeft: '30%', marginTop: '10%', fontSize: '120%', marginTop: '6%' }}>
            <Form style={{ textAlign: 'left', marginLeft: '2%' }} onSubmit={handleSubmit}>
                <br />
                <center>
                    <h2 className='RegBrand'>SignUP</h2>
                </center>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={data.Email}
                        onChange={handleChange}
                        name="Email"
                        isInvalid={submitAttempted && errors.Email !== ''}
                    />
                    <Form.Control.Feedback type="invalid">{errors.Email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control type="text" placeholder="Enter your name" value={data.Name} onChange={handleChange} name="Name" />
                    <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={data.Username}
                        onChange={handleChange}
                        name="Username"
                        isInvalid={submitAttempted && errors.Username !== ''}
                    />
                    <Form.Control.Feedback type="invalid">{errors.Username}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <InputGroup>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={data.Password}
                            onChange={handleChange}
                            name="Password"
                            isInvalid={submitAttempted && errors.Password !== ''}
                        />
                        <Button variant="outline-secondary" onClick={handleTogglePassword}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} /> {/* Replace "Show" with eye icon */}
                        </Button>
                        <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={data.ConfirmPassword}
                        onChange={handleChange}
                        name="ConfirmPassword"
                        isInvalid={submitAttempted && errors.ConfirmPassword !== ''}
                    />
                    <Form.Control.Feedback type="invalid">{errors.ConfirmPassword}</Form.Control.Feedback>
                </Form.Group>

                <center>
                    <Button variant="primary" type="submit" style={{ backgroundColor: 'black', color: 'white', width: '40%' }}>
                        Register
                    </Button>
                </center>
                <br />
            </Form>
        </div>
    );
}

export default Register;
