type NotificationChannel = "EMAIL" | "SMS" | "PUSH";

interface SMSNotificationForm {
    content: string;
    sender: string;
    recipient: string;
    channel: NotificationChannel;
}

interface WebNotificationForm extends SMSNotificationForm {
    title: string;
}

interface Notification extends WebNotificationForm {
    id: number;
    created_at: Date;
}

interface NotificationsTableProps {
    notifications: Notification[];
}

type CreateNotificationForm = WebNotificationForm | SMSNotificationForm

export type { Notification, NotificationChannel, NotificationsTableProps, SMSNotificationForm, WebNotificationForm, CreateNotificationForm };