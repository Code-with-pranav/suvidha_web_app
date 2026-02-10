import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSessionTimeout = (timeoutMs: number = 120000) => {
    const navigate = useNavigate();

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                navigate('/');
            }, timeoutMs);
        };

        // Events to detect user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

        // Add event listeners
        events.forEach(event => document.addEventListener(event, resetTimer));

        // Initial start
        resetTimer();

        // Cleanup
        return () => {
            clearTimeout(timeout);
            events.forEach(event => document.removeEventListener(event, resetTimer));
        };
    }, [navigate, timeoutMs]);
};
