import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useToken } from '../auth/useToken';
import axios from 'axios';

export const SignUpPage = () => {
    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const history = useHistory();

    const onSigUpClicked = async () => {
        // load data from server
        const response = await axios.post('/api/signup', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data;
        setToken(token);
        history.push('/');
    };

    return (
        <div className="content-container">
            <h1>Sign Up</h1>
            {errorMessage && <div className='fail'>{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)} 
                placeholder="someone@gmail.com"
            />
            <input
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                type="password"
                placeholder="password"
            />
            <input
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)}
                type="password"
                placeholder=" confirm password"
            />
            <hr/>
            <button
                disabled={
                    !emailValue || !passwordValue || 
                    passwordValue != confirmPasswordValue} 
                onClick={onSigUpClicked}>Sign Up
            </button>
            <button onClick={() => history.push('/login')}>Already have an account? Login In</button>
        </div>
    );
}
