import type { RegisterOptions, Path } from "react-hook-form";
import type { UserToRegister } from "@/features/register/types";

// 1. La interfaz recibe el tipo del formulario (por defecto UserToRegister)
export interface FieldConfig<T extends object = UserToRegister> {
    id: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    rules?: RegisterOptions<T, Path<T>>;
}

// 2. Definimos el objeto asegurando tipado estricto sin perder autocompletado
export const FIELDS = {
    'country-code': {
      id: 'country_code',
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
      id: 'first_name',
      label: 'First Name',
      type: 'text',
      placeholder: 'John',
      rules: { 
        required: "Name is required"
      }
    },
    'last-name': {
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Doe',
      rules: { 
        required: "Last Name is required", 
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
    'password-validator': {
      id: 'password_validation',
      label: 'Password Validation',
      type: 'password',
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
    }
} as const satisfies Record<string, FieldConfig<UserToRegister>>;

// 3. Tipamos los arrays de campos como tuplas de literales válidos de UserToRegister
export const REGISTER_FIELDS: Array<Path<UserToRegister>> = [
    'first_name', 
    'last_name', 
    'email', 
    'country_code', 
    'phone', 
    'password', 
    'password_validation'
];

export const LOGIN_FIELDS: Array<Path<UserToRegister>> = ['email', 'password'];