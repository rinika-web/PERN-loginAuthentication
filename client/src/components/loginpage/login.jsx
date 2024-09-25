import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import google from "../../assets/google.png";
import separator from "../../assets/Separator.png";
import "./login.css";
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // State to manage password input
    const [show, setShow] = useState(false); // State to manage password visibility
    const navigate = useNavigate(); // hook for navigate

    const handleClickShowPassword = () => setShow((show) => !show); // to toggle the visibility of the password

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3006/api/v1/login', {
                email,
                password
            });

            
            navigate('/timer'); // navigate to timer page to successful login
        }catch (error){
            console.error('Login failed:', error.response?.data?.error||error.massage);
        }

    };

    return (
        <div className='main-page'>
            <div className='Title'>
                <h1>Login to your account</h1>
                <p>Please sign in to your account</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='Input_email'>
                    <label>Email Address</label>
                    <div className='input'>
                        <TextField
                            type="email"
                            placeholder='Enter Email'
                            variant="outlined"
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}

                            required
                            fullWidth
                        />
                    </div>
                </div>

                <div className='Input_password_login'>
                    <label>Password</label>
                    <div className='password-wp_login'>
                        <TextField
                            id="pass"
                            type={show ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            variant="outlined"
                            required
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle_password_visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {show ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                </div>

                <div className='Forgot_password'>
                    <a href="#">Forgot password?</a>
                </div>
                <div className='in_button_login'>
                    <button type="submit">Sign in</button>
                </div>
                <div className='separator'>
                    <span>
                        <img src={separator} alt='separator' />
                    </span>
                </div>

                <div className='google_login'>
                    <button type="button">
                        <img src={google} alt="google" />
                    </button>
                </div>
                <div className='register'>
                    <p>Don't have an account?
                        <Link to='/register' className='link'>Register</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
