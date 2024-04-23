import React, { useState, useEffect } from 'react'
import { useToken } from './useToken'

// Custom hook
export const useUser = () => {
    const [token] = useToken();
    
    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1];
        const user = JSON.parse(atob(encodedPayload));
        return user;
    };

    const [user, setUser] = useState(() => {
        if(!token) return null;
        return getPayloadFromToken(token);
    });

    useEffect(() => {
        if(!token){
            setUser(null);
        }else{
            setUser(getPayloadFromToken(token));
        }

    }, [token]);

    if(user) return user;
    return null;
}
