import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from '../pages/LoadingScreen';
import '../index.css';

const StudentLayout = () => {
    const [isLoading, setIsLoading] = useState(() => !sessionStorage.getItem('hasBooted'));
    const location = useLocation();



    useEffect(() => {
        // Apply student theme to body
        document.body.classList.add('theme-student');

        // Only show loading screen on initial entry to the student section
        // or we can show it on every refresh. 
        // Given the "booting" nature, showing it once per session or on direct load is good.
        // For now, let's show it on mount of this layout.

        if (!sessionStorage.getItem('hasBooted')) {
            const timer = setTimeout(() => {
                sessionStorage.setItem('hasBooted', 'true');
                setIsLoading(false);
            }, 4500); // 4.5s to match the boot sequence roughly
            return () => {
                clearTimeout(timer);
                document.body.classList.remove('theme-student');
            };
        } else {
            setIsLoading(false);
            return () => {
                document.body.classList.remove('theme-student');
            };
        }
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
