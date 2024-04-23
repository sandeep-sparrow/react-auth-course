import { Routes } from './Routes';
import { useEffect } from 'react';

export const App = () => {
    
    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div className="page-container">
            <Routes />
        </div>
    );
}
