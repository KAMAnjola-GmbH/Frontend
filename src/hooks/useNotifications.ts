// src/hooks/useNotifications.ts
import { useState, useCallback } from 'react';
import { Notification, NotificationType } from '../types';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback((message: string, type: NotificationType = 'info') => {
        const newNotification: Notification = {
            id: Date.now(),
            message,
            type,
        };
        setNotifications((prev) => [...prev, newNotification]);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
        }, 5000);
    }, []);

    const removeNotification = useCallback((id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return { notifications, addNotification, removeNotification };
};