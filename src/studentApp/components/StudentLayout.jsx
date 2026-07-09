import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from '../pages/LoadingScreen';
import { useAuthStore } from '../store/authStore';
import '../index.css';

const StudentLayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { user } = useAuthStore();

    // Determine the theme based on the user's role
    const getThemeClass = () => {
        if (!user || !user.role) return 'theme-student';
        if (user.role === 'Alumni/Mentor' || user.role === 'mentor' || user.role === 'Mentor') {
            return 'theme-mentor';
        }
        if (user.role === 'recruiter' || user.role === 'Recruiter') {
            return 'theme-recruiter';
        }
        return 'theme-student';
    };

    const themeClass = getThemeClass();

    useEffect(() => {
        // Apply theme to body whenever the user's role changes
        document.body.classList.remove('theme-student', 'theme-mentor', 'theme-recruiter');
        document.body.classList.add(themeClass);
        return () => {
            document.body.classList.remove(themeClass);
        };
    }, [themeClass]);

    useEffect(() => {
        // Boot screen plays ONCE on initial mount only.
        // Using a ref-guarded timer so navigating between routes doesn't replay it.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4500);
        return () => clearTimeout(timer);
    }, []); // empty deps — runs once on mount

    if (isLoading) {
        return (
            <div className={themeClass}>
                <LoadingScreen />
            </div>
        );
    }

    return (
        <div className={`${themeClass} contents min-h-screen`}>
            <Outlet />
        </div>
    );
};

export default StudentLayout;
