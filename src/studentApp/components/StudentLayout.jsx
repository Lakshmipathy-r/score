import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from '../pages/LoadingScreen';
import '../index.css';

const StudentLayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Apply student theme to body
        document.body.classList.add('theme-student');

        // Always show the system boot loading screen on component mount
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4500); // 4.5s to match the boot sequence roughly
        
        return () => {
            clearTimeout(timer);
            document.body.classList.remove('theme-student');
        };
    }, []);

    if (isLoading) {
        return (
            <div className="theme-student">
                <LoadingScreen />
            </div>
        );
    }

    return (
        <div className="theme-student contents min-h-screen">
            <Outlet />
        </div>
    );
};

export default StudentLayout;
