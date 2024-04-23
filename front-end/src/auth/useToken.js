import React, { useState } from 'react'

// custom hook
export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    });

    // define a function 
    const setToken = newToken => {
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    };

    return [token, setToken];
}
