import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { UserCredentials } from '@/features/login/types';
import { FormField } from '@/components/ui/formField';

const LoginForm = () => {
    const { control, handleSubmit } = useForm<UserCredentials>();

    // Form submission handler
    const onSubmit = (data: UserCredentials) => {
        alert(`Form submitted with data: ${JSON.stringify(data)}`);
    }; 

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
            <form 
                className="auth-card flex flex-col space-y-5 bg-white shadow-2xl" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Please sign in to your account to continue
                    </p>
                </div>
                <FormField
                    name="email"
                    control={control}
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    rules={{ 
                        required: "Email is required", 
                        pattern: { 
                            value: /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,4}$/,
                            message: "Please enter a valid email address ending in .com" 
                        } 
                    }}
                />
                <FormField
                    name="password"
                    control={control}
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    rules={{ 
                        required: "Password is required", 
                        pattern: { 
                            value: /^(?=.*[!@#$%^&*])/,
                            message: "Password must include a special character" 
                        } 
                    }}
                />

                <Button className="btn-primary w-full mt-2 cursor-pointer" type="submit">
                    Sign In
                </Button>
            </form>
        </div>
    ); 
};

export default LoginForm;