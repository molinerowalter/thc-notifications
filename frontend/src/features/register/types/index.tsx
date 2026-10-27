interface UserToRegister {
    first_name: string;
    last_name: string;
    email: string;
    country_code: string;
    phone: string;
    username: string;
    password: string;
}

interface UserRegisterForm extends UserToRegister {
    password_validation: string;
}

export type {
    UserToRegister,
    UserRegisterForm
}