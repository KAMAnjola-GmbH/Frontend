// src/hooks/useNotifications.ts
import { useState, useCallback, useEffect, useRef } from 'react';
import { Notification, NotificationType } from '../types';

/** Auto-dismiss delay in milliseconds */
const AUTO_DISMISS_DELAY = 5000;

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Track active timeouts for cleanup
    const timeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
    // Counter for unique IDs (safer than Date.now() for rapid calls)
    const idCounterRef = useRef(0);

    // Cleanup all timeouts on unmount
    useEffect(() => {
        const timeouts = timeoutsRef.current;
        return () => {
            timeouts.forEach((timeout) => clearTimeout(timeout));
            timeouts.clear();
        };
    }, []);

    const addNotification = useCallback((message: string, type: NotificationType = 'info') => {
        const id = ++idCounterRef.current;
        const newNotification: Notification = {
            id,
            message,
            type,
        };
        setNotifications((prev) => [...prev, newNotification]);

        // Auto-dismiss after delay with proper cleanup tracking
        const timeoutId = setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
            timeoutsRef.current.delete(id);
        }, AUTO_DISMISS_DELAY);

        timeoutsRef.current.set(id, timeoutId);
    }, []);

    const removeNotification = useCallback((id: number) => {
        // Clear timeout if notification is manually dismissed
        const timeoutId = timeoutsRef.current.get(id);
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutsRef.current.delete(id);
        }
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return { notifications, addNotification, removeNotification };
};