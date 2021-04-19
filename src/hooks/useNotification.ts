import React from 'react';

interface NotificationInformation {
    title: string;
    body: string;
    icon?: string;
}

export const useNotification = () => {
    const requestPermission = async (): Promise<NotificationPermission> => {
        return await Notification.requestPermission();
    };

    const notifyInternal = (options: NotificationInformation) => {
        const { title, body, icon } = options;
        new Notification(title, {
            body: body,
            icon: icon ?? '/bbon-icon.png',
        });
    };

    const notify = (options: NotificationInformation) => {
        if (Notification.permission === 'default') {
            requestPermission().then((result) => {
                if (result === 'granted') {
                    notifyInternal(options);
                }
            });
        } else {
            notifyInternal(options);
        }
    };

    return {
        requestPermission,
        notify,
    };
};

type UseNotificationHook = typeof useNotification;
export type UseNotification = ReturnType<UseNotificationHook>;
