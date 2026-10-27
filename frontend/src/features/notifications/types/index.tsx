enum NotificationChannel {
    EMAIL = "email",
    SMS = "sms",
    PUSH = "push",
}

interface Notification {
    id: number;
    title?: string;
    content: string;
    sender: string;
    recipient: string;
    channel: NotificationChannel;
    createdAt: Date;
}

export type { Notification, NotificationChannel };