import type { RegisterOptions, Path } from "react-hook-form";
import type { UserToRegister, UserRegisterForm } from "@/features/register/types";
import type { WebNotificationForm, SMSNotificationForm, CreateNotificationForm } from "@/features/notifications/types";

// 1. La interfaz recibe el tipo del formulario (por defecto UserRegisterForm)
export interface FieldConfig<T extends object = UserRegisterForm> {
    id: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    rules?: RegisterOptions<T, Path<T>>;
}

// 2. Definimos el objeto asegurando tipado estricto sin perder autocompletado
export const FIELDS = {
    'country-code': {
      id: 'country-code',
      label: 'Country Code',
      type: 'text',
      placeholder: '+1',
      rules: { 
        required: "Country Code is required", 
        pattern: { 
            value: /^(\+\d{1,3})/,
            message: "Must start with + and up to 3 digits"
        } 
      }
    },
    email: {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'name@example.com',
      rules: { 
        required: "Email is required", 
        pattern: { 
          value: /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,4}$/,
          message: "Please enter a valid email address ending in .com" 
        } 
      }
    },
    'first-name': {
      id: 'first-name',
      label: 'First Name',
      type: 'text',
      placeholder: 'John',
      rules: { 
        required: "Name is required"
      }
    },
    'last-name': {
      id: 'last-name',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Doe',
      rules: { 
        required: "Last Name is required", 
      }
    },
    'username': {
      id: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'John.Doe',
      rules: { 
        required: "Username is required", 
      }
    },
    password: {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      rules: { 
          required: "Password is required", 
          pattern: { 
              value: /^(?=.*[!@#$%^&*])/,
              message: "Password must include a special character" 
          } 
      }
    },
    'password-validation': {
      id: 'password-validation',
      label: 'Password Validation',
      type: 'password',
      rules: {},
      placeholder: '••••••••',
    },
    phone: {
      id: 'phone',
      label: 'Phone',
      placeholder: '5555555555',
      type: 'text',
      rules: { 
        required: "Phone is required", 
        pattern: { 
          value: /^\d{10}$/,
          message: "Phone number must be exactly 10 digits"
        } 
      }
    },
    channel: {
      id: 'channel',
      label: 'Channel',
      type: 'radio',
      placeholder: '',
      rules: { 
        required: "Channel is required"
      }
    },
    title: {
      id: 'title',
      label: 'Title',
      placeholder: 'Title',
      type: 'text',
      rules: { 
        required: "Title is required",
        pattern: { 
          value: /^.{1,100}$/,
          message: "Title should not exceed 100 characters"
        } 
      }
    },
    content: {
      id: 'content',
      label: 'Content',
      placeholder: 'Add your message here...',
      type: 'textarea',
      rules: { 
        required: "Content is required"
      }
    },
    recipient: {
      id: 'recipient',
      label: 'Recipient',
      placeholder: 'john.doe',
      type: 'text',
      rules: { 
        required: "Recipient is required"
      }
    }
} as const satisfies Record<string, FieldConfig<UserRegisterForm & CreateNotificationForm>>;

// 3. Tipamos los arrays de campos como tuplas de literales válidos de UserToRegister
export const REGISTER_FIELDS: Array<Path<UserRegisterForm>> = [
  'first-name', 
  'last-name',
  'username', 
  'email', 
  'country-code', 
  'phone', 
  'password', 
  'password-validation'
];

export const LOGIN_FIELDS: Array<Path<UserToRegister>> = ['username', 'password'];
export const SMS_NOTIFICATIONS: Array<Path<SMSNotificationForm>> = ['channel', 'content', 'recipient'];
export const WEB_NOTIFICATIONS: Array<Path<WebNotificationForm>> = ['channel','title', 'content', 'recipient'];

export const FORMS_FIELDS = {
  'login': LOGIN_FIELDS,
  'register': REGISTER_FIELDS,
  'notifications': {
    'sms': SMS_NOTIFICATIONS,
    'web': WEB_NOTIFICATIONS
  }
}

interface notificationsStructure {
  'sms': string[],
  'web': string[]
}

export type FormsFieldsStructure = {
  login: string[]; // o el tipo que corresponda
  register: string[];
  notifications: notificationsStructure
};