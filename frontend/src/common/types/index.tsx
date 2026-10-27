import type { RegisterOptions, FieldValues, Path } from "react-hook-form";
import type { Notification } from "../../features/notifications/types";

interface Field {
    name: string;
    label: string;
    value: string;
}

interface Form<T extends Field> {
    fields: T[];
    getFieldValue: (fieldName: string) => string | undefined;
}

interface LoggedUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    phone: string;
    token: string;
    sent: Notification[];
    received: Notification[];
}

interface FieldConfig<T extends FieldValues> {
    id: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    rules?: RegisterOptions<T, Path<T>>;
}

export type { Field, Form, LoggedUser, FieldConfig };