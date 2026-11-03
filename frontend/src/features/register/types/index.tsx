interface UserToRegister {
    'first-name': string;
    'last-name': string;
    email: string;
    'country-code': string;
    phone: string;
    username: string;
    password: string;
}

interface UserRegisterForm extends UserToRegister {
    'password-validation': string;
}

export type {
    UserToRegister,
    UserRegisterForm
}