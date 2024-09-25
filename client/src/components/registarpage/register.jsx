import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import google from "../../assets/google.png";
import separator from "../../assets/Separator.png";
import "./register.css";
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShow((show) => !show);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3006/api/v1/register', {
                email,
                username,
                password
            });

            //localStorage.setItem('token', response.data.token);
            navigate('/timer'); // navigate to timer page to successful login
        }catch (error) {
            console.error('Registration failed:', error.response?.data?.error || 'Unknown error');
        }

    };

    return (
        <div className='rg-page'>
            <div className='page'>
                <div className='Title'>
                    <h1>Create your new account</h1>
                    <p>Create an account to start looking for the food you like</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='Input_email'>
                        <label>Email Address</label>
                        <div className='inputmail'>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="Input_username">
                        <label>User Name</label>
                        <div className='inputuser'>
                            <input
                                type="text"
                                placeholder='Enter User Name'
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>


                    <div className='Input_passwordS'>
                        <label>Password</label>
                        <div className='password-wp'>
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
                                                className="password-visibility-button"
                                            >
                                                {show ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            id="egcheckbox"
                            name="egcheckbox"
                            required
                        />
                        <label htmlFor="egcheckbox">
                            I agree with <a href='/'>Terms of Service</a> and <a href='/'>Privacy Policy</a>
                        </label>
                    </div>

                    <div className='in_button'>
                        <button type="submit">Register</button>
                    </div>
                    <div className='separator'>
                        <span>
                            <img src={separator} alt='separator' />
                        </span>
                    </div>

                    <div className='google'>
                        <button type="button">
                            <img src={google} alt="google" />
                        </button>
                    </div>
                    <div className='login'>
                        <p>Have an account?<Link to='/login' className='link'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;

