/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { UserRegisterForm } from '@/features/register/types';
import { FormField } from '@/components/ui/formField';
import { REGISTER_FIELDS, FIELDS } from '@/common/constants'; 
import registerUser from '@/features/register/services'

const RegisterForm = () => {
    const { control, handleSubmit, watch } = useForm<UserRegisterForm>();
    const passwordValue = watch("password");

    const onSubmit = (data: UserRegisterForm) => {
        console.log("1")
        const {password_validation, ...body} = data;
        registerUser(body);
        console.log("4")
        alert(`Form submitted with data: ${JSON.stringify(body)}`);
    }; 

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
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
                            name={fieldConfig.id} // <--- ¡Tipado 100% estricto sin 'any'!
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