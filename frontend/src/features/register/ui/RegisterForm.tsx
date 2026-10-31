/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { Button } from "@/common/components/button";
import type { UserRegisterForm } from '@/features/register/types';
import { FormField } from '@/common/components/formField';
import { REGISTER_FIELDS, FIELDS } from '@/common/constants'; 
import registerUser from '@/features/register/services'

const RegisterForm = () => {
    const { control, handleSubmit, watch } = useForm<UserRegisterForm>();
    const passwordValue = watch("password");

    const onSubmit = (data: UserRegisterForm) => {
        const {password_validation, ...body} = data;
        registerUser(body);
    }; 

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
            <form 
                className="auth-card flex flex-col space-y-5 bg-white shadow-2xl" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Create Your Account
                    </h2>
                </div>

                {REGISTER_FIELDS.map((fieldKey) => {
                    // Buscamos la configuración mapeando de forma segura
                    const fieldConfig = Object.values(FIELDS).find(f => f.id === fieldKey);

                    if (!fieldConfig) return null;

                    return (
                        <FormField
                            key={fieldConfig.id}
                            name={fieldConfig.id}
                            control={control}
                            type={fieldConfig.type}
                            label={fieldConfig.label}
                            placeholder={fieldConfig.placeholder}
                            rules={fieldConfig.id === 'password_validation' ? { 
                                required: "Please confirm your password", 
                                validate: (value) => 
                                    value === passwordValue || "Passwords do not match"
                            } 
                            : fieldConfig.rules}
                        />
                    );
                })}

                <Button className="btn-primary w-full mt-2 cursor-pointer" type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    ); 
};

export default RegisterForm;